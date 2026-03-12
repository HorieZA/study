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