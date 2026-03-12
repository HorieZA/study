# Javascript (ECMAScript) 알아보기

### Javascript의 핵심 도입 목적

| `목적` | `설명` |
| :---: | :---: |
| 동적인 웹 페이지 구현 | HTML/CSS만으로는 인터랙션 부족 → 버튼 클릭, 폼 입력 검사 |
| 사용자 경험 향상 | 서버 요청을 최소화하고 즉각적인 반응 제공 |
| 웹 브라우저 환경 표준 제공 | 다양한 브라우저에서 실행되며 OS에 독립적 |

- 1997년 ECMA 국제 표준화 기구에 제출되어 `ECMAScript(ES)`라는 표준

---

### 개발 배경 및 발전 과정
| `시기` | `배경 및 특징` |
| :---: | :---: |
| 1990년 후반 | 웹 페이지가 단순 문서 → 상호작용 필요 증가 |
| 2005년 Ajax 등장 | 부분 페이지 갱신으로 UX 획기적 개선 |
| 2010년 HTML5 등장 | 멀티미디어, 캔버스 등 강력한 기능 지원 |
| Node.js 등장(2009) | JavaScript의 서버 측 진출 → Full Stack 시대 개막 |
| Front-End Framework 확산 | React, Vue, Angular로 SPA 개발 가속 |
| ES6(2015) 이후 | 모듈, 클래스, Promise 도입 → 엔터프라이즈 개발 가능 |

- JavaScript는 웹을 넘어 `데스크탑`, `모바일`, `IoT`까지 영역 확장

---

### 주요 적용 사례
> (1) 웹 프론트엔드 개발
- 모든 브라우저가 지원하는 표준 언어
- `SPA`(Single Page Application) 구현 → 빠른 UX 제공
- 주요 프레임워크/라이브러리:
    - `React`, Vue.js, Angular, Svelte 등

> (2) 서버 개발(`Node.js`)
- JavaScript로 서버 로직 개발 가능
- 확장성과 비동기 처리에 강점 (대규모 트래픽 처리)
- Express.js, NestJS, Fastify 등 프레임워크 사용

> (3) 모바일 앱 개발
- `React Native`, Ionic, NativeScript 등을 통해
- iOS & Android 앱을 한 번에 개발 가능

> (4) 데스크탑 애플리케이션
- Electron.js로 크로스 플랫폼 애플리케이션 제작
- 대표 사례:
    - `VS Code`, Slack, Discord, Figma 등

> (5) 게임 개발
- WebGL 기반 3D 그래픽
- Phaser, Three.js, Babylon.js 활용
- 브라우저에서 실행되는 웹 게임 제작

> (6) 데이터 시각화 / 머신러닝
- `D3.js`, `Chart.js`, `ECharts` 등을 통한 실시간 데이터 시각화
- `TensorFlow.js` → 브라우저 머신러닝 모델 실행 가능

---

### `ECMAScript`(ES6+) 주요 기능 정리
> (1) `let` / `const` 블록 범위 변수 선언
- 기존 `var`는 함수 스코프 → 예측 어려움
- `ES6`부터는 블록 단위 스코프 지원
```js
let a = 10;
const b = 20;

a = 30; // ✅ 가능
b = 40; // ❌ TypeError: const 값 변경 불가
```

> (2) 템플릿 문자열 (Template Literals)
- 문자열 연결을 `+` 대신 `` ` ``로 표현 + 변수 내삽
```js
const name = "Tom";
console.log(`Hello, ${name}!`); // Hello, Tom
```

> (3) 화살표 함수 (Arrow Function)
- 깔끔한 함수 표현 + `this` 바인딩 자동
```js
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5
```

> (4) 구조 분해 할당 (Destructuring)
- 배열/객체를 쉽게 분리
```js
const user = { id: 1, name: "Alice" };
const { id, name } = user;

const arr = [10, 20];
const [x, y] = arr;

console.log(id, name, x, y); // 1 Alice 10 20
```

> (5) 스프레드/레스트 연산자 (`...`)

| 구분 | `Spread`| `REST` |
| :---: | :---: | :---: |
| 기능| 요소를 전개 ( 펼침 ) | 여러 요소를 압축 ( 묶음 ) |
| 주요 사용처 | 함수 호출, 배열/객체 복사 및 결합 | 함수 정의 시 매개변수 |
- 배열/객체 `복사` 및 `병합`에 활용 예시
```js
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1,2,3,4]

function sum(...nums) {
  return nums.reduce((a,b) => a + b);
}
console.log(sum(1,2,3)); // 6
```

> (6) 기본 매개변수(Default Params)
```js
function greet(name = "Guest") {
  return `Hello, ${name}`;
}
console.log(greet()); // Hello, Guest
```

> (7) 모듈 시스템 (Modules: import/export)
- 코드 분리와 재사용을 강화
```js
// calc.js
export const add = (a, b) => a + b;

// main.js
import { add } from "./calc.js";
```

> (8) 클래스(Class) 문법 도입
- `OOP`구현이 쉬워짐
```js
class Person {
  constructor(name) { // 생성자
    this.name = name;
  }
  hello() { // 함수
    console.log(`Hi, I'm ${this.name}`);
  }
}

new Person("Bob").hello(); // Hi, I'm Bob
```

> (9) `Promise` / `async & await` (비동기 처리)
```js
const fetchData = async () => {
  try {
    const url = "http://localhost:8080";
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};
```

> (10) `Map` / `Set` 자료구조 도입
```js
const map = new Map();
map.set("key", "value");

const set = new Set([1,2,2,3]); // 중복 제거!
console.log(set); // Set {1,2,3}
```

---

### `ES6+`의 변화 요약
| `변화` | `의미` |
| :---: | :---: |
| 최신 문법 도입 | 코드 가독성 향상 |
| 비동기 처리 개선 | 서버 통신 시 효율↑ |
| 모듈화 지원 | 규모가 큰 앱 구조화 |
| 네이티브 API 확장 | 프레임워크 없이도 강력한 개발 가능 |

---

### `비동기 통신`(Ajax / Fetch / Axios) 알아보기

> (1) Ajax란?
- `A`synchronous
- `J`avaScript
- `A`nd
- `X`ML
- 페이지 전체를 새로고침하지 않고 서버에 데이터를 요청하는 기술을 의미합니다.

> (2) 비동기 통신이 왜 필요할까?

| `기존 방식` | `Ajax 방식` |
| :---: | :---: |
| 버튼 클릭 → 전체 페이지 새로고침 | 필요한 데이터만 서버로 요청 |
| UX 안 좋음 | UX 향상 |
| 서버 부하 큼 | 경량 통신 |

> (3) `Fetch` 사용법 (현대 표준 API)
- `GET` 요청
```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
- `async/await` 방식
```js
async function getPost() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}
getPost();
```
- `POST` 요청
```js
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Hello",
    body: "This is post!",
    userId: 1,
  }),
})
  .then(res => res.json())
  .then(data => console.log(data));
```

> (4) `Axios` 사용법
- Axios는 Fetch를 더 쉽게 사용하기 위한 `외부 라이브러리`
    - 에러 처리 간단
    - JSON 자동 변환
    - 인터셉터 등 기능 풍부
    - 설치 명령어 : `npm install axios`

- `GET` 요청
```js
import axios from "axios";

axios.get("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

- `POST` 요청
```js
axios.post("https://jsonplaceholder.typicode.com/posts", {
  title: "Axios Test",
  body: "Posting with Axios",
  userId: 1,
})
  .then(res => console.log(res.data));
```

---

> (5) 실습: 버튼 클릭하면 데이터 표시하기
- HTML 파일 내용
```html
<button id="btn">데이터 가져오기</button>
<div id="result"></div>
```

- JavaScript 파일 내용
```js
document.getElementById("btn").addEventListener("click", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await res.json();
  document.getElementById("result").innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.body}</p>
  `;
});
```

--- 

### Fetch VS Axios 비교
| 비교 항목   | `Fetch` | `Axios` |
| :---: | :---: | :---: |
| 기본 지원 | 브라우저 내장 | 설치 필요 |
| JSON 변환 | res.json() 직접 호출 | 자동 변환 |
| 에러 처리 | 복잡 | 간단 |
| 요청 취소 | 어려움 | 쉽게 가능 |
| 사용성 | 표준이지만 추가 작업 많음 | 개발자 친화적 |

---

### JavaScript 비동기 처리 알아보기

- JavaScript는 `싱글 스레드(single-thread)` 기반 언어입니다.
    - 한 번에 하나의 작업만 처리할 수 있음
    - 오래 걸리는 작업(예: 서버 요청, 타이머 등)은 `비동기 처리` 필요

> (1) 콜백 함수 (`Callback`)
```js
setTimeout(() => {
  console.log("1초 후 실행");
  setTimeout(() => {
    console.log("또 1초 후 실행");
  }, 1000);
}, 1000);
```

> (2) Promise
- 콜백에 비해 `가독성 향상`

| `상태` | `의미` |
| :---: | :---: |
| pending | 실행 중 |
| fulfilled | 성공(resolve) |
| rejected | 실패(reject) |

- Promise 선언 예제
```js
const work = new Promise((resolve, reject) => {
  setTimeout(() => resolve("작업 완료 ✅"), 1000);
});

work.then(result => console.log(result));
```

- 성공 & 실패 처리
```js
const getUser = (ok) => {
  return new Promise((resolve, reject) => {
    ok ? resolve("유저 데이터 받음 🧑‍💻") : reject("오류 발생 ❌");
  });
};

getUser(true)
  .then(console.log)
  .catch(console.error)
  .finally(() => console.log("항상 실행"));
```

- Promise chaining (순차 실행)
```js
function step1() {
  return new Promise(resolve => {
    console.log("Step 1");
    resolve(1);
  });
}

function step2(value) {
  return new Promise(resolve => {
    console.log("Step 2");
    resolve(value + 1);
  });
}

function step3(value) {
  return new Promise(resolve => {
    console.log("Step 3");
    resolve(value + 1);
  });
}

step1()
  .then(result => step2(result))
  .then(result => step3(result))
  .then(result => console.log("최종 결과:", result))
  .catch(error => console.error(error));
```

> (3) `async` / `await` (Promise를 더 쉽게 사용)
- ES8(2017) 등장
- Promise 기반 코드를 더 직관적으로 작성
- `async` 함수는 자동으로 Promise 반환
```js
async function test() {
  return "완료!";
}
test().then(console.log);
```
- `await`: Promise가 처리될 때까지 기다림
```js
const fetchData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await res.json();
  console.log(data);
};

fetchData();
```
- 순서대로 동작하므로 동기 코드처럼 실행

> (4) async/await 에러 처리
- `try/catch`로 에러 핸들링
```js
async function load() {
  try {
    const res = await fetch("https://wrong.url");
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error("문제가 발생! ❌", e);
  }
}
load();
```

> (5) async/await 병렬 실행

- `비효율적인 코드` :(순차로 요청 → 총 시간 증가)
```js
const a = await taskA();
const b = await taskB();
```
- 병렬로 실행
```js
const [a, b] = await Promise.all([taskA(), taskB()]);
```

### 요약 비교
| 방식 | `장점` | `단점` |
| :---: | :---: | :---: |
| 콜백 | 가장 기본 | 콜백 지옥 |
| Promise | 가독성 개선, 체이닝 | then() 반복될 수 있음 |
| async/await | 가장 직관적, 동기 코드처럼 | 예외 처리 주의 |

