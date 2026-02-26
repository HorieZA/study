// 밖에서 가져오기("type": "module" 사용)
let cnt = 0;

function event01() {
    console.log("호출_" + cnt);
    cnt = cnt + 1;
    return cnt;
}

export function text() {

    return `<h1>방문자 : ${event01()}</h1>`;
}
