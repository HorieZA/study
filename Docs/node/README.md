<img src="./images/node.png" width="300">

# Node.js 알아보기

**Node.js**는 **Chrome V8 엔진**을 기반으로 만든 **서버 사이드 JavaScript 런타임(Runtime)** 입니다.

## Node.js의 핵심 개념

### 1. V8 엔진 기반

* Chrome이 사용하는 JavaScript 엔진인 **V8**을 내부적으로 탑재
* 매우 빠른 JS 실행 속도
* JIT(Just-In-Time) 컴파일을 통한 성능 최적화

### 2. 이벤트 기반(Event-driven)

Node.js는 **이벤트 루프(Event Loop)**를 중심으로 동작합니다.

* 요청이 들어오면 이벤트로 등록
* 해당 이벤트가 준비되면 콜백을 실행하는 구조

### 3. 논블로킹 I/O(Non-blocking I/O)

Node.js는 I/O 작업(파일 읽기, DB 요청 등)을 **비동기**로 처리합니다.

## Node.js 아키텍처 구조

Node.js는 대략 아래 구성으로 이루어져 있습니다:

```
┌──────────────────────┐
│     Application      │  ← 개발자가 작성한 JS 코드
└───────────┬──────────┘
            │
┌───────────▼──────────┐
│     Node.js API      │  (fs, http, net 등 built-in 모듈)
└───────────┬──────────┘
            │
┌───────────▼──────────┐
│    Libuv (Event Loop)│  ← 비동기 I/O 처리 핵심
└───────────┬──────────┘
            │
┌───────────▼──────────┐
│ C++ Bindings + OS    │  ← OS 자원 활용
└──────────────────────┘
```

### ✔ libuv

* 이벤트 루프 담당
* 스레드풀 관리
* DNS, 파일 I/O, TCP 등 처리
* Node.js의 비동기 동작의 핵심

## Node.js의 장점

### 1. 고성능 처리(특히 I/O 중심)

* 비동기 I/O 덕분에 동시 처리량(throughput)이 매우 높습니다.

웹 서버 같은 I/O가 많은 서비스에 최적화됨
예: 채팅 서버, REST API 서버, 스트리밍 서비스 등

### 2. 프론트엔드 & 백엔드 언어 통일

* JS 하나로 전체 스택 구성 가능 → **풀스택 개발 부담 감소**
* 리액트/뷰/앵귤러 개발자들이 쉽게 서버 개발에 입문 가능

### 3. 풍부한 패키지 생태계(NPM)

* **NPM(Node Package Manager)**는 세계에서 가장 큰 패키지 저장소
* 거의 모든 기능이 패키지로 존재

### 4. 마이크로서비스 및 서버리스에 적합

* 가볍고 빠른 프로세스 구동
* 함수형 모델과 궁합이 좋음

## Node.js의 단점

### 1. CPU-bound 연산에 취약

* 이벤트 루프가 단일 스레드라서
  CPU 연산이 오래 걸리면 전체 성능이 떨어짐
  → 해결법: Worker Threads 또는 별도 서버 사용

### 2. 콜백 지옥(이제는 거의 해소)

* 비동기 처리로 인해 콜백 중첩 문제가 있었지만
  현재는 **Promise, async/await** 사용으로 크게 완화됨

### 3. 타입 안전성 부족(Typescript로 해결 가능)

## Node.js 주요 내장 모듈

| 모듈         | 설명         |
| ---------- | ---------- |
| **http**   | 웹 서버 생성    |
| **fs**     | 파일 시스템     |
| **path**   | 경로 처리      |
| **events** | 이벤트 핸들러    |
| **crypto** | 암호화 유틸리티   |
| **net**    | 소켓(TCP) 서버 |

## NPM과 패키지 생태계

Node.js는 **NPM**을 통해 패키지를 설치합니다.

예: **Express** — 웹 프레임워크

```
npm install express
```

## 간단한 Node.js 웹 서버 예제

```js
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
```
