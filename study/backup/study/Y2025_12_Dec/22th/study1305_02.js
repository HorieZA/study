console.log(`\nstudy1305_02`);

console.log(`\n최초 변수 초기값 선언 필수`);
var a=1;
var b="일";
var c=true;
console.log(`a : ${a}, b : ${b}, c : ${c}`);
console.log(`b_typeof : ${typeof b}`);
console.log(`a+b+c_typeof : ${typeof (a+b+c)}`);
console.log(`글 : ${a}_`+c);

// for문
console.log(`\nfor문`);
for(let i=1;i<10;i=i+2) {
    console.log(`i값 홀수 : ${i}`);
}
// if문
console.log(`\nif문`);
console.log(`\ntrue or false 앞에 !가 있으면 부정`);
if(!false) {
    console.log("참");
} else {
    console.log("거짓");
}
// 1===0 값은 거짓
console.log(`\n1===0`);
if(1===0) {
    console.log("참");
} else {
    console.log("거짓");
}
// 1=="1" 값은 참
console.log(`\n1=="1"`);
if(1=="1") {
    console.log("참");
} else {
    console.log("거짓");
}
// a>0 값은 참
// >, >=, <, <=, %
console.log(`\na>0`);
var a=10;
if(a>0) {
    console.log("참");
} else {
    console.log("거짓");
}
// a%2===0 값은 참
console.log(`\na%2===0`);
if(a%2===0) {
    console.log("참");
} else {
    console.log("거짓");
}
// a%2!==0 값은 거짓
console.log(`\na%2!==0`);
if(a%2!==0) {
    console.log("참");
} else {
    console.log("거짓");
}

// for문 > if문
// || => or문, && => and문
console.log(`\n&&문을 이용한 if문`);
for(let i=0;i<10;i++) {
    if(i%2===0 && i!==0) {
        console.log(`i값 : ${i}`);
    }
}
// continue를 이용한 if문
console.log(`\ncontinue를 이용한 if문`);
for(let i=0;i<10;i++) {
    if(i===0){
        continue;
    }
    if(i%2===0) {
        console.log(`i값 : ${i}`);
    }
}
console.log(`\ncontinue를 이용한 중괄호 없는 if문`);
for(let i=0;i<10;i++) {
    if(i===0) continue;
    if(i%2===0) console.log(`i값 : ${i}`);
}

console.log("\n네번째 문제 결과");
const key1 = "O";
const key2 = "X";
let an = "";
for(let i = 0; i < 9; i++){
    // if(i%2!==0) {
    //     an1=an1+key2;
    // } else {
    //     an1=an1+key1;
    // }
    // if(i%2===0) {
    //     an1=an1+key1;
    // } else {
    //     an1=an1+key2;
    // }
    if(i%2===0) an=an+key1;
    if(i%2!==0) an=an+key2;
    console.log(`an : ${an}`);
}
console.log(`최종 an : ${an}`);

console.log("\n네번째 문제 결과(삼항 연산자)");
const sb1 = "☆";
const sb2 = "★";
let val = "";
for(let i = 0; i < 9; i++){
    // ans=(i%2!==0)?ans+sb2:ans+sb1;
    val+=(i%2!==0)?sb2:sb1;
    console.log(`val : ${val}`);
}
console.log(`최종 val : ${val}`);

console.log(`continue를 이용한 다번째 문제 결과`);
const st = 1;
const ed1 = 10;
const ed2 = 20;
const str = "javascript";
const kyd = "a";
console.log(`\n문제1) 1부터 10까지 숫자 중 홀수만 출력하세요.`);
for(let i=0;i<ed1;i++) {
    if(i%2===0) continue;
    console.log(`i 홀수값 : ${i}`);
}
console.log(`\n문제2) 1부터 20까지 숫자 중 3의 배수를 출력에 제외하세요.`);
for(let i=0;i<ed2;i++) {
    if(i%3===0) continue;
    console.log(`3의 배수를 제외한 i값 : ${i}`);
}
console.log(`\n문제3) 문자열 "javascript"의 각 문자를 한 줄씩 출력 중 'a'만 제외하세요.1`);
for(let i=0;i<str.length;i++) {
    if(str[i]===kyd) continue;
    console.log(`'a'를 제외한 str값 : ${str[i]}`);
}
console.log(`\n문제3) 문자열 "javascript"의 각 문자를 한 줄씩 출력 중 'a'만 제외하세요.2`);
for(const s of str) {
    if(s===kyd) continue;
    console.log(`'a'를 제외한 s값 : ${s}`);
}

// console.log(`\ncontinue를 사용하지 않는 다번째 문제 결과`);
// const st = 1;
// const ed1 = 10;
// const ed2 = 20;
// const str = "javascript";
// const kyd = "a";
// console.log(`\n문제1) 1부터 10까지 숫자 중 홀수만 출력하세요.`);
// for(let i=0;i<ed1;i++) {
//     if(i%2!==0) console.log(`i 홀수값 : ${i}`);
// }
// console.log(`\n문제2) 1부터 20까지 숫자 중 3의 배수를 출력에 제외하세요.`);
// for(let i=0;i<ed2;i++) {
//     if(i%3!==0) console.log(`3의 배수를 제외한 i값 : ${i}`);
// }
// console.log(`\n문제3) 문자열 "javascript"의 각 문자를 한 줄씩 출력 중 'a'만 제외하세요.`);
// for(let i=0;i<str.length;i++) {
//     if(str[i]!==kyd) console.log(`'a'를 제외한 str값 : ${str[i]}`);
// }
// console.log(`\n문제3) 문자열 "javascript"의 각 문자를 한 줄씩 출력 중 'a'만 제외하세요.2`);
// for(const s of str) {
//     if(s!==kyd) console.log(`'a'를 제외한 s값 : ${s}`);
// }