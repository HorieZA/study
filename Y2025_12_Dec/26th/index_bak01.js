// cmd에서 node **.js 입력하면 단일 해당 파일로만 로드하는 부분이므로 npm 사용시에는 사용 하면 안됨
// npm은 cmd에서 npm run ** 으로 입력하면 실행됨 
// **은 packagejson 파일의 "scripts"에 "실행어" : "불러올 파일명", 를 입력해두어야 함

// nodemon 설치 시 실행 명 => npm install nodemon or npm i nodemon
// 설치가 완료되면 해당 프로젝트 폴더안에 node_modules 폴더가 생성됨
// nodemon은 각 프로젝트 당 관리하기 위해서 설지한 관리 프로그램(?)
//  => nodemon 실행 시 해당 파일 저장하면 실시간으로 반영됨

// node_modules 폴더가 없을 경우 
// npm i 를 입하면 packagejson 파일의 "dependencies"을 읽어서 "dependencies"있는 프로그램을 전부 설치

// nodemon 종료하는 방법 =>^c(Ctrl+c) 

console.log("NPM 출력");
// 다른 파일에서 받아오겠다는 함수
// const a = require("./main.js");

// 덩어리채로 받아올 경우 { } 사용
// const { a } = require("./main.js");

// 다중함수로 받아오기
// const { a, b } = require("./main.js");
console.log(a);
console.log(b);

// 여기 까지가 "type": "commonjs", 로 사용한 경우