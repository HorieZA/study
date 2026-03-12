// 여기 부터는 "type": "module", 로 사용한 경우
// server.mjs
import { createServer } from 'node:http';
// import에서는 선언만 되며 선언과 동시에 요청은 불가
// 요청은 별도로 입력
import { text } from './main.js';

const server = createServer((req, res) => {   
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
 
    // 밖에서 값을 가져오기
    const txt = text();
    res.end(txt);
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
