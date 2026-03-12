import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider.jsx';

const Nav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // AuthProvider의 value={{ isLogin, login, logout }} 와 이름을 맞춰야 함!
    const { isLogin, logout } = useAuth(); 
    const [ userId, setUserId ] = useState(); 
    const [ email, setEmail ] = useState(); 

    const handleLogout = () => {
        logout();
        alert('로그아웃 되었습니다.');
        navigate('/');
    };

    const userView = () => {
        const params = { email, userId }
        navigate("/UserView", {state:params});
    };

    useEffect(()=>{
        const data = location.state;
        setUserId(data.userId);
        setUserId(data.email);
    }, [])

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">TEAM3</Link>
                {/* collapse를 빼고 d-flex를 넣어서 무조건 보이게 수정했습니다 */}
                <div className="d-flex" id="navbarNav">
                    <ul className="navbar-nav flex-row gap-3">
                        {!isLogin ? ( 
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/login">로그인</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/signup">회원가입</Link></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" style={{textDecoration:'none'}} onClick={handleLogout}>로그아웃</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" style={{textDecoration:'none'}} onClick={userView}>회원정보</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;