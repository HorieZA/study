import { api } from '../utils/network.js';
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from "@hooks/AuthProvider.jsx"
import axios from 'axios'

const SignUp = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [gender, setGender] = useState("1")

  const submitBtn = async (e) => {
    e.preventDefault()
    
    const params = {
      name: name, 
      email: email, 
      pwd: pwd, 
      gender: gender
    }

    try {
            const res = await api.post("/signup", params); 
            
            if(res.data.status) {
                alert("회원가입이 완료되었습니다!");
                login(res.data.access_token); 
                navigate("/");
            } else {
                alert(res.data.message || "가입 실패");
                setName(""); setEmail(""); setPwd("");
            }
        } catch (err) {
            console.error("회원가입 에러:", err);
            alert("서버와 통신 중 오류가 발생했습니다.");
        } finally {
            console.log("회원가입 종료");
        }
      };
      
  return (
    <div className="container mt-3">
			<h1 className="display-1 text-center">회원가입</h1>
			<form onSubmit={submitBtn}>
				<div className="mb-3 mt-3">
					<label htmlFor="name" className="form-label">이름:</label>
					<input 
            type="text" 
            className="form-control" 
            id="name" 
            placeholder="이름을 입력하세요." 
            name="name" 
            value={name}
            onChange={e=>setName(e.target.value)}
            autoComplete="off" />
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="email" className="form-label">이메일:</label>
					<input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="이메일를 입력하세요." 
            name="email" 
            value={email}
            onChange={e=>setEmail(e.target.value)}
            autoComplete="off" />
				</div>
				<div className="mb-3">
					<label htmlFor="pwd" className="form-label">비밀번호:</label>
					<input 
            type="password" 
            className="form-control" 
            id="pwd" placeholder="비밀번호를 입력하세요." 
            name="pwd" 
            value={pwd}
            onChange={e=>setPwd(e.target.value)}
            autoComplete="off"/>
				</div>
				<div className="d-flex">
					<div className="p-2 flex-fill">
						<div className="form-check">
							<input type="radio" 
                className="form-check-input" 
                id="radio1" 
                name="gender" 
                value="1" 
                checked={gender === "1"}
                onChange={e=>setGender(e.target.value)} />남성
							<label className="form-check-label" htmlFor="radio1"></label>
						</div>
					</div>
					<div className="p-2 flex-fill">
						<div className="form-check">
							<input 
                type="radio" 
                className="form-check-input" 
                id="radio2" 
                name="gender" 
                value="0" 
                checked={gender === "0"}
                onChange={e=>setGender(e.target.value)}/>여성
							<label className="form-check-label" htmlFor="radio2"></label>
						</div>
					</div>
				</div>
        <div className="d-flex">
          <div className="p-2 flex-fill d-grid">
            <button type="submit" className="btn btn-primary">가입</button>
          </div>
          <div className="p-2 flex-fill d-grid">
            <button type="button" className="btn btn-primary" onClick={() => navigate("/")}>취소</button>
          </div>
        </div>
			</form>
		</div>
  )
}

export default SignUp