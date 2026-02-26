import { createServer } from 'node:http';
import { controller } from './main_bak03.js';

const server = createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    const html = controller(req);
    res.end(html);
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});