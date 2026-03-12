import { useState } from "react"

const Page1 = () => {
  const [data, setData] = useState(0)
  let 변수 =0;
  console.log(data, 변수)
  const event = () => {
    변수 = 변수 + 1
    setData(data+1)
  }
  
  return(
    <>
    <button type="button" onClick={event}>증가</button>
    </>
  )
}

// 카운트 예제 
// data, 변수, 변수2 3개 증가 시 변수와 data는 값이 증가되나,
// 변수2는 App 안에 선언이 되어있기 때문에 변수2는 초기화가 되서 0으로 뜨게된다.
// let 변수2 = 0
// const App = () =>{
//   const [data, setData] = useState(0)
//   let 변수 = 0
  
//   console.log(data, 변수, 변수2)
  
//   const event = (e) => {
//     setData(data + 1)
//     변수 += 1
//     변수2 += 1
//   }

//   return ( <><button type="button" onClick={event}>증가</button></> )
// }

export default Page1