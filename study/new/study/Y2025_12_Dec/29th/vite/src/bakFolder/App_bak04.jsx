// import './App.css'

const Page1 = () => <h1>상단 화면</h1>
const Page2 = () => <h1>하단 화면</h1>

const Main = () => {
  const arr = ["01번", "02번", "03번"]

  const Html02 = () => {
    let html = ""

    for (let i = 1; i < 4; i++) {
      html += `<li>0${i}번</li>`
    }

    console.log("너 누구냐 : " + html)

    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
  }

  const Html03 = () => {
    let html = ""

    for (let k of arr) {
      html += `<li>${k}</li>`
    }
    console.log("너 어떻게 나오니? : " + html)

    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
  }

  const Html04 = () => {
    const html = [] //임의 배열추가

    for (let i = 1; i < 4; i++) {
      html.push(<li key={i}>{i}번</li>)
      //푸시를 이용해서 빈 배열에 추가
    }
    console.dir("너 멋지다 : " + html)

    // 처음부터 UL 태그를 입력하는 방식도 있음
    // return( <ul>{html}</ul> )
    return (<>{html}</>)
  }

  const Html05 = () => {
    const list = [];
    
    for (let num of arr) {
      list.push(<li key={num}>{num}</li>);
    }

    return (<>{list}</>)
  }

  return (
    <ul>
      <Html02 />
      <Html03 />
      <Html04 />
      <Html05 />
    </ul>
  )
}

// const Main = () => {
//   const arr = ["01번", "02번", "03번"]
//   const page3 = (v, i) => <li key={i}>{v}</li>
//   const Html01 = () => <li>01번</li>
//   const Html02 = () => `
//   <li>01번</li>
//   <li>02번</li>
//   <li>03번</li>`

//   return (
//     <ul>
//       { arr?.map(page3) }
//       <Html02 />
//     </ul>
//   )
// }

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