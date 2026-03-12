// import './App.css'

const Page1 = () => <h1>상단 화면</h1>
const Page2 = () => <h1>하단 화면</h1>

const Main = () => {
  const arr = ["01번", "02번", "03번"]
  
  const Html02 = () => {
    var html = "" // 임의 값 추가
    html += "<li>for문을 이용한 문자열(String)을 HTML로 렌더링</li>"

    for (let i = 0; i < 3; i++) {
      html += `<li>${arr[i]}</li>`
      // for문를 이용해서 값 추가
    }

    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
  }

  const Html03 = () => {
    var html = "" // 임의 값 추가
    html += "<li>for of문을 이용한 문자열(String)을 HTML로 렌더링</li>"

    for (let k of arr) {
      html += `<li>${k}</li>`
      // for of문를 이용해서 값 추가

    }

    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
  }

  // for문에 배열을 이용
  const Html04 = () => {
    const html = [] //임의 배열추가
    
    for (let i = 1; i < 4; i++) {
      html.push(<li key={i}>0{i}번</li>)
      //푸시를 이용해서 빈 배열에 추가
    }

    // 처음부터 UL 태그를 입력하는 방식도 있음
    // return( <ul>{html}</ul> )
    return (<>{html}</>)
  }

  // for of문에 배열을 이용
  const Html05 = () => {
    const list = [] //임의 배열추가
    
    for (let num of arr) {
      list.push(<li key={num}>{num}</li>)
      //푸시를 이용해서 빈 배열에 추가
    }

    return (<>{list}</>)
  }

  return (
    <ul>
      <Html03_1 />
      <Html02 />
      <Html03 />
      <Html04 />
      <Html05 />
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