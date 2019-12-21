const http = require('http');

const dispatcher = require('./controller');

const PORT = 3000;

http.createServer(dispatcher).listen(PORT, () =>
    console.log(`Server is listening at port ${PORT}`),
);
