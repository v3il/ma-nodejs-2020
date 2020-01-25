const http = require('http');

const BaseManager = require('./base');

class NodeManager extends BaseManager {
    async get(url, config = {}) {
        const parsedURL = new URL(url);

        return this.asyncRequest({
            url,
            path: parsedURL.pathname,
            hostname: parsedURL.hostname,
            port: parsedURL.port,
            method: 'GET',
            ...config,
        });
    }

    async post(url, body = {}, config = {}) {
        const parsedURL = new URL(url);

        return this.asyncRequest({
            url,
            path: parsedURL.pathname,
            hostname: parsedURL.hostname,
            port: parsedURL.port,
            method: 'POST',
            data: body,
            ...config,
        });
    }

    fetch(options) {
        return new Promise((resolve, reject) => {
            const request = http.request(options, async response => {
                response.setEncoding('utf8');

                try {
                    const responseData = await this.getResponseData(response);
                    response.data = JSON.parse(responseData);
                } catch (error) {
                    response.data = {};
                }

                if (response.statusCode >= 200 && response.statusCode < 300) {
                    resolve(response);
                } else {
                    reject(new Error(`Server responded with status ${response.statusCode}`));
                }
            });

            request.on('error', error => {
                reject(error);
            });

            if (options.method === 'POST') {
                request.write(JSON.stringify(options.data || {}));
            }

            request.end();
        });
    }

    getResponseData(rawResponse) {
        return new Promise(resolve => {
            let rawData = '';

            rawResponse.on('data', chunk => {
                rawData += chunk;
            });

            rawResponse.on('end', () => {
                resolve(rawData);
            });
        });
    }
}

module.exports = new NodeManager();
