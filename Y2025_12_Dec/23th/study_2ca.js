// javascript 2차원 배수 열의합 구하기
// 아래 2차원 배수의 값이 다음과 같다.
// arr2D = [ [ 1, 2, 3, 4 ], 
//           [ 5, 6, 7, 8 ], 
//           [ 9, 10, 11, 12 ] ]
// for문을 이용하여 arr2D와 동일하게 2차원 배수를 구한뒤, 
// for문을 이용하여 2번째와 4번째 열 합의 최종합을 구하여라
const rows = 3;
const cols = 4;
const arr2D = new Array(rows); // 3개의 빈 요소를 가진 배열 생성

for (let i = 0; i < rows; i++) {
    arr2D[i] = new Array(cols); // 각 행에 4개의 빈 요소를 가진 새 배열 할당
    for (let j = 0; j < cols; j++) {
        arr2D[i][j] = i * cols + j + 1; // 값 입력 (예시: 1부터 순서대로)
    }
}
console.log(arr2D);

// javascript 2차원 배수 열의합 구하기
// 9) 2차원 배열을 이용하여 2, 4번째 열의 합의 값을 구하시오.
// arr2D = [ [ 1,  2,  3,  4 ], 
//           [ 5,  6,  7,  8 ], 
//           [ 9, 10, 11, 12 ] ]
// 2번째 열의 합 : (2 + 6 + 10) > 18
// 4번째 열의 합 : (4 + 8 + 12) > 24
// 최종 합 : 42
let arr1 = 0;
let arr2 = 0;
let sum = 0;

for(let k = 0; k < arr2D.length; k++) {
    // 2번째 열의 인덱스는 1에 해당
    // 4번째 열의 인덱스는 3에 해당
    if(arr2D[k].length > 1) arr1+=arr2D[k][1];
    if(arr2D[k].length >= 3) arr2+=arr2D[k][3];
}
sum = arr1 + arr2;

console.log(`2번째 열의 합 : ${arr1}`);
console.log(`4번째 열의 합 : ${arr2}`);
console.log(`최종 합: ${sum}`);