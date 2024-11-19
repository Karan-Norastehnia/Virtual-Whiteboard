const http = require("http");
const fs = require("fs");
const path = require("path");

(async () => {
    const mime = await import("mime");

    const server = http.createServer((req, res) => {
        if (req.url === '/') {
            res.setHeader('Content-Type', 'text/html');

            fs.readFile(path.join(__dirname, '../frontend/build/index.html'), 'utf8', (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Server Error');
                } else {
                    res.statusCode = 200;
                    res.end(data);
                }
            });
        } else {
            const filePath = path.join(__dirname, '../frontend/build', req.url);

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.statusCode = 404;
                    res.end('File Not Found');
                } else {
                    const extname = path.extname(filePath);
                    const contentType = mime.default.getType(extname) || 'application/octet-stream';
                    
                    res.setHeader('Content-Type', contentType);
                    res.statusCode = 200;
                    res.end(data);
                }
            });
        }
    });

    server.listen(3000);
})();
