const contentList = [
  { 'Content-Type': 'text/plain; charset=utf-8' },
  { 'Content-Type': 'text/html; charset=utf-8' },
  { 'Content-Type': 'application/json; charset=utf-8' }
];

function page1() {
  return "html 입니다.";
}

function page2(req) {
  return getParams1(req);
}

function page3(req) {
  return getParams2(req);
}

function getUrl(req) {
  let url = req.url;
  const index = req.url.lastIndexOf("?");
  if (index > 0) url = req.url.substring(0, index);
  return url;
}

function getParams1(req) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let html = "";

  for (const [key, value] of url.searchParams) {
    html += `<h2>${value}</h2>`;
  }
  return html;
}

function getParams2(req) {
  const index = req.url.lastIndexOf("?");
  const obj = {};

  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(url?.searchParams);
  
  if (index > 0) {
    for (const [key, value] of url.searchParams) {
      obj[key] = value;
    }
  }
  // Content-Type을 application/json으로 사용 시
  // return값을 JSON 문자열 형식으로 변환 필수
  // 변환 하지 않으면 res.end()에서 오류 발생
  return JSON.stringify(obj);

}

export default function Main(req, res) {
  let url = getUrl(req);
  let html = "";
  let contents = {};

  if (url === "/a") {
    html = page2(req);
    contents = contentList[1];

  } else if (url === "/b") {
    html = page3(req);
    contents = contentList[2];

  } else {
    html = page1();
    contents = contentList[0];
  }
  res.writeHead(200, contents);
  res.end(html);
}
