import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// 1. 컨텍스트 생성
export const AuthContext = createContext(null);

// 2. Provider 컴포넌트
export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // 페이지 로드 시 토큰이 있는지 확인
        const token = Cookies.get("accessToken");
        if (token) setIsLogin(true);
    }, []);

    const login = (token) => {
        Cookies.set("accessToken", token, { expires: 1 }); 
        setIsLogin(true);
        navigate("/");
    };

    const logout = () => {
        Cookies.remove("accessToken"); 
        setIsLogin(false);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ isLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. 커스텀 훅
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;