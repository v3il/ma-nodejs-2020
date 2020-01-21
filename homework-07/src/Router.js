/* eslint-disable class-methods-use-this */
const http = require('http');

const readAsset = require('./util/readAsset');

module.exports = class Router {
    constructor() {
        this.routes = {
            get: {},
            post: {},
        };

        this.viewsDir = null;
        this.staticDir = null;
    }

    get(url, ...handlers) {
        this.routes.get[url] = handlers;
    }

    post(url, ...handlers) {
        this.routes.post[url] = handlers;
    }

    setViewsDir(viewsDir) {
        this.viewsDir = viewsDir;
    }

    setStaticDir(staticDir) {
        this.staticDir = staticDir;
    }

    async resolve(request, response) {
        const { method, url, headers } = request;
        const parsedUrl = new URL(`http://${headers.host}${url}`);

        request.parsedUrl = parsedUrl;

        response.viewsDir = this.viewsDir;
        response.staticDir = this.staticDir;

        const staticDirRegexp = new RegExp(`/${this.staticDir}/`, 'g');

        if (method === 'GET' && this.staticDir && staticDirRegexp.test(parsedUrl.pathname)) {
            await this.resolveStatic(request, response);
        } else {
            try {
                request.body = await this.getRequestBody(request);
                await this.resolveRoute(request, response);
            } catch (error) {
                console.error(error);

                response.sendJSON(500, {
                    message: error.message,
                });
            }
        }
    }

    getRequestBody(request) {
        return new Promise((resolve, reject) => {
            let body = '';

            request.on('data', data => {
                body += data;

                if (body.length > 1e6) {
                    reject(new Error(http.STATUS_CODES[413]));
                }
            });

            request.on('end', () => {
                if (body.length) {
                    try {
                        resolve(JSON.parse(body));
                    } catch (error) {
                        reject(new Error('Bad JSON'));
                    }
                } else {
                    resolve({});
                }
            });
        });
    }

    async resolveStatic(request, response) {
        const { parsedUrl } = request;

        try {
            const resourceContent = await readAsset(parsedUrl.pathname);
            const staticFileExt = parsedUrl.pathname.split('.').pop();

            response.setHeader('Content-Type', this.getContentTypeForExt(staticFileExt));
            response.writeHead(200).end(resourceContent);
        } catch (error) {
            console.error(error);
            response.writeHead(404).end();
        }
    }

    getContentTypeForExt(ext) {
        const contentTypesMap = {
            css: 'text/css',
            js: 'application/javascript',
        };

        return contentTypesMap[ext] || 'text/plain';
    }

    async resolveRoute(request, response) {
        const { method, parsedUrl } = request;

        const routesCollection = method === 'POST' ? this.routes.post : this.routes.get;
        const routeHandlers = routesCollection[parsedUrl.pathname];

        if (routeHandlers) {
            // eslint-disable-next-line no-restricted-syntax
            for (const handler of routeHandlers) {
                try {
                    // eslint-disable-next-line no-await-in-loop
                    const breakRouteHandlersExecution = await handler(request, response);

                    if (breakRouteHandlersExecution === true) {
                        break;
                    }
                } catch (error) {
                    console.error(error);

                    response.sendJSON(500, {
                        message: http.STATUS_CODES[500],
                        details: error.message,
                    });
                }
            }
        } else if (method === 'GET') {
            response.redirect('/404');
        } else {
            response.sendJSON(404, {
                url: parsedUrl.pathname,
                message: http.STATUS_CODES[404],
            });
        }
    }
};
