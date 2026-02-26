import { createServer } from 'node:http';
import { text } from './main.js';

// req => 요청(클라이언트가 요청하는 함수)
// res => 응답(클라이언트가 요청한 값을 응답해주는 함수)
const server = createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    console.log(req.url);

    // return을 이용한 URL 주소에 "/a"인 패스주소를 요청한 함수
    if (req.url === "/a") {
        res.end("<h2>A 주소 화면 입니다.</h2>");
        return;
    }
    const txt = text();
    res.end(txt);

    // else문을 이용한 URL 주소에 "/a"패스주소 요청한 함수
    // if (req.url === "/a") {
    //     res.end("<h2>A 주소 화면 입니다.</h2>");
    // } else {
    //     const txt = text();
    //     res.end(txt);
    // }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});