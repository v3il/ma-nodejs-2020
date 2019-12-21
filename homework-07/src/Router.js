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

        console.log(parsedUrl);

        if (method === 'POST') {
            try {
                request.body = await this.getRequestBody(request);
            } catch (error) {
                console.error(error.message);
                response.sendJSON(400, {
                    message: 'Bad request',
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
            let processed = false;

            routeHandlers.forEach(handler => {
                if (!processed) {
                    processed = !!handler(request, response);
                }
            });
        } else if (method === 'GET') {
            response.redirect('/404');
        } else {
            response.sendJSON(404, {
                message: 'Not found',
            });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    getRequestBody(request) {
        return new Promise((resolve, reject) => {
            let body = '';

            request.on('data', data => {
                body += data;

                if (body.length > 1e6) {
                    reject();
                }
            });

            request.on('end', () => {
                resolve(JSON.parse(body));
            });
        });
    }
}

module.exports = new Router();
