// 브라우저의 콘솔 사용 시 "document"를 사용
// getElementsByTagName => Elements의 TagName을 찾는다는 것
// document.getElementsByTagName("section")[0]; => 첫번째 section을 찾음
console.log("스터디01");
var state = false;
// 강사님 답안1
function load() {
    const k = 25;
    var html = "";

    for (let i = 0; i < k; i++) {
        html += `<div class="bg${i % 2 === 0 ? '2' : '1'}"></div>`;
    }

    document.getElementsByTagName("section")[0].innerHTML = html;
    state = true;
}
// 강사님 답안2
function load2() {
    const k = 25;
    var html = "";

    for (let i = 0; i < k; i++) {
        let css = 1;
        if (i % 2 === 0) css = 2
        html += `<div class="bg${css}"></div>`;
    }

    document.getElementsByTagName("section")[0].innerHTML = html;
    state = true;
}
// 내가 생각한 답안
function load3() {
    const k = 25;
    var html = "";

    for (let i = 0; i < k; i++) {
        if (i % 2 === 0) html += `<div class="bg2"></div>`;
        if (i % 2 !== 0) html += `<div class="bg1"></div>`;
    }

    document.getElementsByTagName("section")[0].innerHTML = html;
    state = true;
}
// 값 지우기
function clean() {
    document.getElementsByTagName("section")[0].innerHTML = "";
    state = false;
}
// 토글
function btnToggle() {
    if (!state) load();
    else clean();
}
// 테스트용
function f1() {
    for (let i = 0; i <= 10; i++) {
        console.log("인덱스 : " + i);
    }
}
// z라는 임의의 영역에 bg3을 넣는 방법1
// 삼항 연산자만 사용
function load4() {
    const k = 25;
    var html = "";
    const z = 6;

    for (let i = 0; i < k; i++) {
        html += `<div class="bg${i % 2 === 0 ? (i === z ? '3' : '2') : (i === z ? '3' : '1')}"></div>`;
    }

    document.getElementsByTagName("section")[0].innerHTML = html;
    state = true;
}
// z라는 임의의 영역에 bg3을 넣는 방법2
// bg3를 넣는 부분은 if문을 넣고 이후는 삼항 연산자만 사용
function load5() {
    const k = 25;
    var html = "";
    const z = 6;

    for (let i = 0; i < k; i++) {
        if(i === z) html += `<div class="bg3"></div>`;
        else html += `<div class="bg${i % 2 === 0 ? '2' : '1'}"></div>`;
    }

    document.getElementsByTagName("section")[0].innerHTML = html;
    state = true;
}
// z라는 임의의 영역에 bg3을 넣는 방법3
// if문만 사용
function load6() {
    const k = 25;
    var html = "";
    const z = 6;

    for (let i = 0; i < k; i++) {
        let css = 1;
        if (i % 2 === 0) css = 2
        if (i === z) css = 3
        html += `<div class="bg${css}"></div>`;
    }

    document.getElementsByTagName("section")[0].innerHTML = html;
    state = true;
}
// 3개의 색을 순차적으로 값 넣기1
function load7() {
    const k = 25;
    var html = "";
    let z = 1;

    for (let i = 0; i < k; i++) {
        html += `<div class="bg${z++}"></div>`;
        if (z === 4) z = 1;
        // console.log("인덱스 : " + z);
    }

    document.getElementsByTagName("section")[0].innerHTML = html;
    state = true;
}
// 3개의 색을 순차적으로 값 넣기2
function load8() {
    const k = 25;
    var html = "";
    let z = 1;

    for (let i = 0; i < k; i++) {
        html += `<div class="bg${z === 4 ? '1' : z++}""></div>`;
        if(z === 4) z = 1;
        console.log("인덱스 : " + z);
    }

    document.getElementsByTagName("section")[0].innerHTML = html;
    state = true;
}