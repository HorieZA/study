// node test 파일 html에 사용 불가
var state = false;
let css = 0;
let z = 0;

console.log(state);
console.log(css);
console.log(z);


if (state===false) {
    const k = 25;
    var html = "";
    console.log("start state : "+state+`\n`);

    for (let i = 0; i < k; i++) {
        css = 1;
        if (i % 2 === 0) css = 2
        html += `<div class="bg${css}"></div>\n`;
        // node 줄바꿈 기호 "\n"
    }
    console.log(html);
    state = true;
    console.log("midpoint state : "+state);
}

if (state===true) {
    state = false;
    console.log("재수정 state : "+state);
}
console.log("end state : "+state);