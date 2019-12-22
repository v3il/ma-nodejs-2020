/* eslint-disable class-methods-use-this */
const http = require('http');

const { readAsset } = require('./util');

class Router {
    constructor() {
        this.routes = {
            get: {},
            post: {},
        };
    }

    get(url, ...handlers) {
        this.routes.get[url] = handlers;
    }

    post(url, ...handlers) {
        this.routes.post[url] = handlers;
    }

    async resolve(request, response) {
        const { method, url, headers } = request;

        response.sendJSON = function sendJSON(statusCode, data) {
            this.writeHead(statusCode, { 'Content-Type': 'application/json' }).end(
                JSON.stringify(data),
            );
        };

        response.redirect = function redirect(to) {
            this.writeHead(302, { Location: to }).end();
        };

        const parsedUrl = new URL(`http://${headers.host}${url}`);
        request.parsedUrl = parsedUrl;

        if (/.(css|js)$/.test(parsedUrl.pathname) && method === 'GET') {
            await this.resolveStatic(request, response);
        } else {
            try {
                request.body = await this.getRequestBody(request);
                await this.resolveRoute(request, response);
            } catch (error) {
                console.error(error);

                response.sendJSON(400, {
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

        console.log(parsedUrl.pathname);
        const resourceContent = await readAsset(parsedUrl.pathname.slice(1));

        if (parsedUrl.pathname.endsWith('.css')) {
            response.setHeader('Content-Type', 'text/css');
        }

        if (parsedUrl.pathname.endsWith('.js')) {
            response.setHeader('Content-Type', 'application/javascript');
        }

        response.write(resourceContent);
        return response.end();
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
}

module.exports = new Router();
