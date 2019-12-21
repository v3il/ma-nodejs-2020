const http = require('http');

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

        if (method === 'POST') {
            try {
                request.body = await this.getRequestBody(request);
            } catch (error) {
                console.error(123, error.message);
                return response.sendJSON(400, {
                    message: error.message,
                });
            }
        }

        let routesCollection;

        if (method === 'POST') {
            routesCollection = this.routes.post;
        } else {
            routesCollection = this.routes.get;
        }

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

        return true;
    }

    // eslint-disable-next-line class-methods-use-this
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
}

module.exports = new Router();
