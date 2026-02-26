const a = 1
const b = "아룡하세요"
const c = true
const d = null

console.log(a, typeof(a))
console.log(b, typeof(b))
console.log(c, typeof(c))
console.log(d, typeof(d))
console.log("()", typeof((_)))
console.log({}, typeof({}))
console.log([], typeof([]))
console.log(`${a}`, typeof(`${a}`))

function fn1() {
  const k = 1
  return console.log(k+"냠1")
}
fn1()

const fn2 = function() {
  const k = 1
  return console.log(k+"냠2")
}
fn2()

fn3 = () => {
  const k = 1
  return console.log(k+"냠3")
}
fn3()

if (5 > 1) {
  console.log("5가 크다")
  console.log("5가 크다")
  console.log("5가 크다")
} else if ( 5 < 1) {

} else {}

// 반복 안되는 방법
for ( ;false; ) {
  console.log("반복")
}

for (const a in []) { // 인덱스
  console.log("반복")
}

for (const a of []) { // 값
  console.log("반복")
}

console.log("\narr")
const arr = [[1,2],[1],[2],[1,2,3]]
// 인덱스와 값 구하는 방법
for (const y in arr) { // 인덱스
  for (const x in arr[y]) { // 인덱스, 값
    console.log(y, x, arr[y][x])
  }
}
console.log("\narr1")
// 응용 왕 된당
const arr1 = [[[1,2],[1],[2],[1,2,3]],[[1,2],[1],[2],[1,2,3]]]
for (const z in arr1) {
  for (const y in arr1[z]) {
    for (const x in arr1[z][y]) {
      console.log(z, y, x, arr1[z][y][x])
    }
  }
}
console.log("\narrK")
// 응용2
const arrK = [
  [[[1,2],[1],[2],[1,2,3]],[[1,2,4],[1,5],[2,4],[1,2,3]]],
  [[[1,2,6],[1],[2],[1,2,3,4]],[[1,2,1,2],[1],[2,3,4],[1,2,3,5,6,7]]]
]
for (const z in arrK) {
  for (const y in arrK[z]) {
    for (const x in arrK[z][y]) {
      for (const w in arrK[z][y][x]){
        console.log(z, y, x, w, arrK[z][y][x][w])
      }
    }
  }
}

let 문자열 = "나는 한국인일까?"
console.log(문자열[3])

console.log(문자열.at(-3))

const arr2 = {}
// 오브젝트를 객체화 하여 사용하는 방식
const arr3 = new Object() //{}

console.log(typeof arr2, typeof arr3)

console.log(10 == "10")  // 참
console.log(10 === "10") // 거짓

obj = {}
obj["key"] = 10

console.log(obj, typeof obj)

const arr4 = []
arr4[0] = 10
console.log(arr4, typeof arr4)

const t = new Array()
t.push(10)
console.log(t, typeof t)
t[0] = 20
console.log(t, typeof t)