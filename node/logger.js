const http = require('http');

http.createServer((req, res) => {
    console.log('ok');
}).listen(5000, () => console.log('Server is running'));