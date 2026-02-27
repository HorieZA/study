import React, { useState } from 'react';
import { api } from '../utils/network.js';
import axios from 'axios';
import { useAuth } from '../hooks/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    // const [userId, setUserId] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await api.post("/login", { email, pwd });
            
            // 백엔드에서 status: true를 보내주면
            if (response.data.status) {
                const { access_token, user_id, name } = response.data; // user_id도 받아오기
                login(access_token);
                console.log("불러온 유저 UUID:", user_id); // 잘 불러왔는지 확인 가능!
                alert(`${name}님, 환영합니다!`);
                // navigate("/");
                const params = { email, user_id }
                console.log(params)
                navigate("/", {state:params})
            }
        } catch (error) {
            // 백엔드에서 raise HTTPException 한 내용이 여기 뜹니다
            const errorMsg = error.response?.data?.detail || "로그인에 실패했습니다.";
            alert(errorMsg);
        }
    };

    return (
        <div className="container mt-3">
            <h1 className="display-1 text-center">로그인</h1>
            <div className="mb-3 mt-3">
                <label className="form-label">이메일</label>
                <input type="email" className="form-control" 
                       value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일을 입력하세요."/>
            </div>
            <div className="mb-3">
                <label className="form-label">비밀번호</label>
                <input type="password" className="form-control" 
                       value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="비밀번호를 입력하세요."/>
            </div>
            <div className="d-flex">
                <div className="p-2 flex-fill d-grid">
                    <button onClick={handleLogin} className="btn btn-primary">로그인</button>
                </div>
                <div className="p-2 flex-fill d-grid">
                    <button onClick={() => navigate('/')} className="btn btn-secondary">취소</button>
                </div>
            </div>
        </div>
    );
};

export default Login