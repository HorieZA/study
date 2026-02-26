function text() {
    let html = "";

    html += `<h1>최초 주소인 html 화면 입니다.</h1>`;
    html += `<p>음!!</p>`;

    return html;
}

export function controller(req) {
    let html = "";
    let url = req.url;

    const index = req.url.lastIndexOf("?");
    // const url = req.url.substring(0, index);

    // 예외처리 => index로 받아오는 "?"가 없을때 처리 해주기 위해서 예외처리
    if(index > 0) url = req.url.substring(0, index);
    // console.log(req.headers.host);
    const prameters = new URL(req.url, `http://${req.headers.host}`);
    // console.log(`typeof : ${typeof prameters.searchParams}`);

    if (url === "/a") {
        console.log(`A 주소 화면 입니다.`);
        html += `<h2>A 주소 화면 입니다.</h2>`;

        for (const [key, value] of prameters.searchParams) {
            console.log(`${key} : ${value}`);
            html += `<h2>${key} : ${value}</h2>`;
        }
        console.log(`node service...`);
        html += `<p>node service...</p>`;

    } else if (url === "/b") {
        console.log(`B 주소 화면 입니다.`);
        html += "<h2>B 주소 화면 입니다.</h2>";

        for (const [key, value] of prameters.searchParams) {
            console.log(`${key} : ${value}`);
            html += `<h2>${key} : ${value}</h2>`;
        }
        html += `<p>node service...</p>`;
        console.log(`node service...`);
    } else {
        html = text();
    }

    return html;
}