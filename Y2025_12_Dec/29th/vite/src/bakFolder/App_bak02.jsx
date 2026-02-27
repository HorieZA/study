// import './App.css'

const Page1 = () => <h1>상단 화면</h1>;
const Page2 = () => <h1>하단 화면</h1>;

function Main() {
  const arr = ["01번", "02번", "03번"];

  return (
    <ul>
      {
        arr.map((v, i) => <li key={i}>{v}</li>)
      }
    </ul>
  )
}

function App() {
  return (
    <>
      <Page1 />

      <Main />

      <Page2 />
    </>
  )
}

export default App
