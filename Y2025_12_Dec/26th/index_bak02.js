// 여기 부터는 "type": "module", 로 사용한 경우
// server.mjs
import { createServer } from 'node:http';

let cnt = 0;

function event01(){
    console.log("호출_"+cnt);
    cnt=cnt+1;
    return cnt;
}
const server = createServer((req, res) => {
    // 한글이 깨지지 않게 utf-8 인코딩 선언
    // text/html을 사용하여 html 테그를 불러올수 있음
    // text/plain은 텍스트 형태로 불러온다는 내용
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    // res.end('<h1>안녕</h1>');
    
    // 방문자 카운트
    // console.log("호출"+cnt);
    // cnt = cnt + 1;
    // res.end(`<h1>방문자 : ${cnt}</h1>`);

    // function을 이용한 방문자 카운트 실험
    res.end(`<h1>방문자 : ${event01()}</h1>`);
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
