import logo from './logo.svg';
import './App.css';

const Page1 = () => <h1>상단 화면</h1>;
const Page2 = () => <h1>하단 화면</h1>;

function Main({arr, list}) {
  console.log("Main()", arr, list);
  return (
    <main>
        {
          list?.map((v, i) => <section key={i}>{v}</section>)
        }
    </main>
  )
}

function App() {
  // 조건 & 반복문
  const arr = ["내용", "설명", "보조 내용"];
  
  return (
    <>
      <Page1 />
      
      <Main list={arr} /> {/* 실재로 돌아가는 함수 => Main({ list.arr }) */}
      
      <Page2 />
    </>
  );
}

export default App;
