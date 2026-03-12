// import './App.css'

const Page1 = () => <h1>상단 화면</h1>
const Page2 = () => <h1>하단 화면</h1>

const Main = () => {
  const arr = ["01번", "02번", "03번"]
  const page3 = (v, i) => <li key={i}>{v}</li>
  // 콘솔로그로 값 확인 시 {}를 이용하여 콘솔로그 사용
  // const page3 = (v, i) => {
  //   console.log(v, i)
  //   return <li key={i}>{v}</li>
  // }

  return (
    <ul>
      {
        arr?.map(page3)
      }
    </ul>
  )
}

const App = () => {
  return (
    <>
      <Page1 />

      <Main />

      <Page2 />
    </>
  )
}

export default App
