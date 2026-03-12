import { useState } from "react"
// useState 응용
// props를 알아야 한다. => 부모 컴포넌트가 자식 컴포넌트로 데이터를 전달하기 위해 사용하는 읽기 전용 객체
const Input = props => <input type="text" value={props.value} onChange={e => props.setValue(e.target.value)} />
const Button = props => <button type="button" onClick={props.event}>합치기</button>
const App = () => {
  const [name, setName] = useState("홍길동")
  const [desc, setDesc] = useState("전설의 도적")
  const event = () => {
    const data = { name, desc }
    console.log(data)
  }

  return (
    <>
      <Input value={name} setValue={setName} />
      <Input value={desc} setValue={setDesc} />
      <Button event={event} />
    </>
  )
}

// value, setValue를 이용한 방식
// const Input = ({ value, setValue }) => <input type="text" value={value} onChange={e => setValue(e.target.value)} />

// const App = () => {
//   const [name, setName] = useState("홍길동")
//   const [desc, setDesc] = useState("전설의 도적")
//   const event = () => {
//     const data = { name, desc }
//     console.log(data)
//   }

//   return (
//     <>
//       <Input value={name} setValue={setName} />
//       <Input value={desc} setValue={setDesc} />
//       <button type="button" onClick={event}>합치기</button>
//     </>
//   )
// }

// const Input = ({ v }) => {
//   const [input, setInput] = useState(v)
//   console.log("input : ", v, input)
//   v = input
//   // name을 바꾸면 바뀌는것이 확인됨
//   // console.log(v, input)
//   return (
//     <input type="text" value={input} onChange={e => setInput(e.target.value)} />
//   )
// }

// const App = () => {
//   let name = "홍길동"
//   let desc = "전설의 도적"
//   const event = () => {
//     // const data = {name, desc}
//     // console.log(data)
//     // 근데 버튼을 클릭하면 안바뀌고 있음
//     console.log(name, desc)
//   }

//   return (
//     <>
//       <Input v={name} />
//       <Input v={desc} />
//       <button type="button" onClick={event}>합치기</button>
//     </>
//   )
// }

export default App