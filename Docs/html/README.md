<img src="./images/html-0.png" width="300">

## (1) HTML이란

- HTML(`HyperText Markup Language`) 웹 페이지의 `구조와 의미(semantic)`를 정의하는 마크업 언어입니다.
- 브라우저는 HTML을 읽어 문서 구조(제목, 문단, 리스트, 링크 등)를 해석하고, CSS로 스타일을 적용하고, JavaScript로 동작을 추가합니다.
- HTML은 `프로그래밍` 언어가 아니라 `표시(마크업)` 언어입니다.

## (2) 간단한 역사·버전

- 초기 HTML → 점차 발전하며 많은 요소와 API가 추가되었고, 현대 웹의 표준은 `HTML5` (사실상 현재의 HTML 표준)입니다.
- HTML5는 멀티미디어, 시맨틱 태그, 폼 타입, API(DOM, Canvas, WebStorage 등)를 공식적으로 포함합니다.

## (3) 문서의 기본 구조 (예시와 라인별 설명)

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>예제 페이지</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>
      <h1>사이트 제목</h1>
      <nav>
        <ul>
          <li><a href="/">홈</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <article>
        <h2>글 제목</h2>
        <p>본문 내용...</p>
      </article>
      <aside>사이드바 내용</aside>
    </main>

    <footer>
      <p>&copy; 2025</p>
    </footer>

    <script src="app.js"></script>
  </body>
</html>
```

- `<!doctype html>`: 문서형식(HTML5) 선언 — 브라우저가 표준 모드로 렌더링하도록 함.
- `<html lang="ko">`: 문서 루트, `lang`은 접근성·검색·번역에 중요.
- `<meta charset="utf-8">`: 문자 인코딩. 항상 명시.
- `<meta name="viewport"...>`: 모바일 반응형을 위해 필수.
- `<head>`: 메타데이터(문서 제목, 스타일, 외부 리소스 등).
- `<body>`: 실제 화면에 보여질 콘텐츠.
- 시맨틱 태그들: `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>` — 구조와 의미를 명확히 정의

## (4) 주요 태그 분류

- **텍스트**: `<h1>`~`<h6>`, `<p>`, `<span>`, `<strong>`, `<em>`, `<blockquote>`, `<code>`
- **목록**: `<ul>`, `<ol>`, `<li>`, `<dl>`, `<dt>`, `<dd>`
- **링크·이미지**: `<a href="">`, `<img src="" alt="">` — `alt` 속성은 접근성에서 중요.
- **폼**: `<form>`, `<input>`, `<label>`, `<textarea>`, `<select>` 등 — `label` 연결로 접근성 및 UX 향상.
- **미디어**: `<audio>`, `<video>`, `<picture>`, `<source>`
- **시맨틱 레이아웃**: `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<nav>`, `<aside>`
- **임베디드 / 스크립트**: `<script>`, `<noscript>`, `<iframe>`
- **메타/메타데이터**: `<meta>`, `<link>`, `<title>`, `<base>`

## (5) 속성(attribute)과 전역 속성

- 대부분의 요소는 속성을 가질 수 있음: 예) `id`, `class`, `style`, `title`, `data-*`(커스텀 데이터).
- **전역 속성**: 거의 모든 요소에 쓸 수 있는 속성들(예: `id`, `class`, `hidden`, `tabindex`, `contenteditable`)


## (6) 접근성(Accessibility, a11y)

- 의미 있는 마크업(시맨틱 태그)과 올바른 `alt`, `<label for>`, `role`, `aria-*`를 사용하세요.
- 키보드 네비게이션(탭 순서), 색 대비, 폼 오류 안내 등도 고려해야 함.
- 스크린리더 사용자를 위한 문맥 제공이 중요합니다.

## (7) 반응형 웹과 메타

- `meta viewport`와 CSS 미디어쿼리(`@media`)로 다양한 화면 크기에 대응.
- 레이아웃은 유연한 단위(%, rem, vw)와 그리드/flexbox를 활용하세요.

## (8) HTML과 CSS·JS의 역할 분리

- HTML: 문서 구조와 의미(semantic).
- CSS: 시각적 스타일(레이아웃, 색상).
- JavaScript: 동적 동작(이벤트 처리, DOM 조작).
- **중요**: 내용(HTML)과 스타일(CSS), 동작(JS)을 가능한 분리하세요 — 유지보수·접근성·성능에 유리합니다.

## (9) 폼 처리 및 보안 포인트

- 입력값 검증: 클라이언트(HTML5 폼 속성 및 JS) + 서버(필수).
- CSRF, XSS 방지: 서버 측에서 입력값을 검증/이스케이프, 적절한 콘텐츠 보안 정책 적용.
- `autocomplete`, `required`, `type="email"` 등 HTML5 속성으로 UX 개선 가능.

## (10) 멀티미디어 & 현대 API

- `<picture>`와 `srcset`으로 반응형 이미지 제공.
- `<video>`/`<audio>`로 기본 재생 제공.
- Canvas API, Web Storage(LocalStorage/SessionStorage), Fetch API, Service Worker, WebSockets 등은 HTML 문서와 같이 사용되는 브라우저 API들입니다.

## (11) SEO(검색엔진 최적화)와 메타

- 의미있는 `<h1>`~ 태그 사용, 정돈된 콘텐츠 구조.
- `meta description`, `title`은 검색 결과에서 중요.
- `rel="canonical"`, 구조화된 데이터(JSON-LD)로 검색 엔진에 문서 의미 전달 가능.

## (12) 유효성 검사·도구

- HTML 문법 검사기(validator)를 통해 문법 오류와 접근성 문제를 확인하세요.
- 브라우저 개발자 도구로 DOM·네트워크 성능·접근성 검사 가능.

## (13) 흔한 실수

- `alt` 없는 이미지 — 접근성 문제.
- 인라인 스타일 과다 사용 — 유지보수 어려움.
- 시맨틱 대신 `div`/`span`만 사용 — 의미 상실.
- `<h1>`을 페이지마다 적절히 사용하지 않음 — SEO와 구조에 부정적.
- 폼에 레이블을 연결하지 않음 — 스크린리더 문제.

> 간단한 체크리스트:

- lang, charset, viewport가 설정되어 있는가?
- 시맨틱 태그로 구조화했는가?
- 이미지에 적절한 alt가 있는가?
- 폼에 label과 유효성 검사를 적용했는가?
- 외부 리소스는 지연 로딩/최적화했는가?

## (14) 접근성 좋은 버튼

```html
<button type="button" aria-pressed="false" id="likeBtn">좋아요</button>
```

> `aria-pressed`는 토글 상태를 스크린리더에 전달

- `true`: 요소가 눌려 있는 상태
- `false`: 요소가 눌려 있지 않은 상태
- `mixed`: 요소의 상태가 부분적으로 눌려 있는 경우 사용
