import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from "axios"


function Home() {
  const [selectedColor, setSelectedColor] = useState("primary")
  const [bgColor, setBgColor] = useState("primary")
  const [name, setName] = useState("")
  const [cookies, setCookie, removeCookie] = useCookies(['colorInfo'])

  const COLORS = [
    { label: "Primary", value: "bg-primary" },
    { label: "Secondary", value: "bg-secondary" },
    { label: "Success", value: "bg-success" },
    { label: "Danger", value: "bg-danger" },
    { label: "Warning", value: "bg-warning" },
    { label: "Info", value: "bg-info" },
    { label: "Dark", value: "bg-dark" },
    { label: "Light", value: "bg-light" },
  ];
  

  const saveColor = () => {
    const colorInfo = {
      user: name,
      bgColor: selectedColor,
    }
    // 쿠키 저장
    setCookie("colorInfo", window.btoa(encodeURI(JSON.stringify(colorInfo))), { path: "/" })
    
    // 서버에 저장 요청
    axios.post("http://localhost:8000/save",{}, { withCredentials: true } )
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
    
    // 저장 후 선택한 배경 변경
    setBgColor(selectedColor)
  }
  
  // 배경색을 불러오기 위해 이름을 입력하여 가져오기
  const loadColor = () => {
    axios.get(`http://localhost:8000/load/${name}`, { withCredentials: true })
      .then(res => {
        if (res.data.status) {
          setBgColor(res.data.bgColor)
        } else {
          alert(res.data.msg)
        }
      })
      .catch(err => console.error(err))
      .finally(() => console.log("완료"));
  }

  return (
    <div className={`${bgColor} min-vh-100 d-flex justify-content-center align-items-center`}>
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h5 className="mb-3 text-center">너의 배경색을 보고 싶어</h5>

        <div className="mb-3 mt-3">
					<input type="text" className="form-control" id="name" placeholder="이름을 입력하세요."
            name="name" value={name} onChange={e=>setName(e.target.value)}/>
				</div>

        <select className="form-select mb-3" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
          {COLORS.map((color) => (
            <option key={color.value} value={color.value}>
              {color.label}
            </option>
          ))}
        </select>
        <div className="btn-group">
          <button type="button" className="btn btn-primary mt-3" onClick={saveColor}>배경색 변경(저장)</button>
          <button type="button" className="btn btn-success mt-3" onClick={loadColor}>배경색 불러오기</button>
        </div>
      </div>
    </div>
  )
}

export default Home;
