import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  // html 관련 내용은 "/public/file.html" 파일의 주석 참조
  
  const [files, setFiles] = useState([])
  const config ={
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }

  // const event1 = e => {
  //   e.preventDefault()
  //   console.log("요청")
  //   const fileList = e.target.file.files
  //   console.log(fileList)
  //   const formData = new FormData();
  //   formData.append("txt", e.target.txt.value)
  //   for (let i = 0; i < fileList.length; i++) {
  //     console.log(fileList[i])
  //     formData.append("files", fileList[i])
  //   }
  //   axios.post("http://localhost:8000/upload", formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data"
  //       }
  //     }
  //   )
  //   .then(res => console.log(res))
  //   .catch(err => console.error(err))
  // }

  const event1 = e => {
    e.preventDefault()
    console.log("요청1")
    const fileList = e.target.file.files
    const formData = new FormData();
    formData.append("txt", e.target.txt.value)
    for (let i = 0; i < fileList.length; i++) {
      // backend의 files
      formData.append("files", fileList[i])
    }
    axios.post("http://localhost:8000/upload", formData, config)
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }
  
  // 전달 딜레이와 용량(?) 문제로 잘 사용하지 않으나, 
  // 아래처럼 예외인 경우 "Base64"를 사용
  // 1. "form 데이터"를 이용하지 않을때
  // 2. 백에서 메서드를 "PUT" 혹은 "PATCH"로 사용하여 "json"형식으로 받아야 할 경우
  // 3. 백이 전부 "json"형식으로 고정되어있을 경우
  
  // const event2 = e => {
  const event2 = async e => {
    // 만들어지기 전에 값을 던지기 때문에 "async"와 "await" 선언 
    // "async"가 없을 경우 "await" 사용 불가
    e.preventDefault()
    console.log("요청2")
    const fileList = e.target.file.files
    const txt = e.target.txt.value
    const files = []
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      // const base64File = fileToBase64(file)
      const base64File = await fileToBase64(file)
      // fileToBase64에서 return값을 줘야 선언이 가능
      files[i] = base64File
    }
    const params = { txt, files }
    // 만들어지기 전에 값을 던져서 재작성
    axios.post("http://localhost:8000/upload2", params)
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }

  const fileToBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      
      reader.onload = () => {
        const data = reader.result.split(",")[1]
        resolve(data)
      }
      
      reader.onerror = err => {
        console.log(err)
        reject(err)
      }
    })
  }

  // event1과 유사하나, 상단에 useState, config 선언 및 
  // 파일 불러오는 input에 onChange 선언하여 진행
  // event1과 evnet2 사용시 input 변경 필요
  const event3 = e => {
    e.preventDefault()
    console.log("요청3")
    const formData = new FormData();
    formData.append("txt", e.target.txt.value)
    files.forEach(file => formData.append("files", file))
    axios.post("http://localhost:8000/upload3", formData, config)
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }

  return (
    <>
      <header>
        <h1>File Upload</h1>
      </header>
      <main>
        <form onSubmit={event3}>
          <div className="form">
            <input type="text" name="txt" id="txt" />
          </div>
          <div className="form">
            {/* <input type="file" name="file" id="file" multiple accept="image/*" /> */}
            <input type="file" name="file" id="file" multiple accept="image/*" onChange={e=>setFiles(Array.from(e.target.files))}/>
          </div>
          <div className="form">
            <input type="submit" value="파일업로드" />
          </div>
        </form>
      </main>
    </>
  )
}

export default App
