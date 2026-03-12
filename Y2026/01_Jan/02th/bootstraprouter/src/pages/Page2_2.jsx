import { useNavigate, useLocation } from 'react-router'

const Page2 = () => {
    // react에서 <input /> 반드시 닫아주기

    const navigate = useNavigate();
    const location = useLocation();
    const onclick = () => {
        navigate("/")
    }
    
    // ======= 스티븐, 에브릴 전체
    // const data = {
    //     "name":"스티븐",
    //     "email":"jobs@shellfolder.com",
    //     "pwd":"1234",
    //     // gender가 두 개만 있어서 논리형으로 진행
    //     "gender":true,
    // }

    // ======= 스티븐, 에브릴 각각 + 빈페이지(page2)일때 예외처리
    const data = location.state || {name: "", email: "", pwd: "", gender: true}
    console.log(data)

    if(data.name === "") {
        onclick()
    }
   

    return (
        <div className="container mt-3">
	        <h1 className="display-1 text-center">사용자 정보</h1>
		    <form>
                {/* value={}도 그냥 쓸 수 없음, 현재 readonly인 상황이라 defaltValue로 고정 */}
                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">이름:</label>
                    <input type="text" className="form-control" id="name" placeholder="이름을 입력하세요." name="name" readOnly="readonly" defaultValue={ data.name } />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">이메일:</label>
                    <input type="email" className="form-control" id="email" placeholder="이메일를 입력하세요." name="email" readOnly="readonly" defaultValue={ data.email } />
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">비밀번호:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="비밀번호를 입력하세요." name="pwd" readOnly="readonly" defaultValue={ data.pwd } />
                </div>
                <div className="d-flex">
                    <div className="p-2 flex-fill">
                        <div className="form-check">
                            {/* react cheked : 논리형, 선택이 되었다 or 안되었다 */}
                            {/* checked만 단독으로 사용 불가 -> 현재는 읽기전용 readOnly 같이 사용 */}
                            <input type="radio" className="form-check-input" id="radio1" name="gender" value="1" checked={ data.gender === true} readOnly="readonly" />남성
                            <label className="form-check-label" htmlFor="radio1"></label>
                        </div>
                    </div>
                    <div className="p-2 flex-fill">
                        <div className="form-check">
                            <input type="radio" className="form-check-input" id="radio2" name="gender" value="2" checked={ data.gender === false } readOnly="readonly" />여성
                            <label className="form-check-label" htmlFor="radio2"></label>
                        </div>
                    </div>
                </div>
		    </form>
		    <div className="d-flex">
                <div className="p-2 flex-fill d-grid">
                    <a href="Update.html" className="btn btn-primary">수정</a>
                </div>
                <div className="p-2 flex-fill d-grid">
                        <a href="List.html" className="btn btn-primary">삭제</a>
                </div>
                <div className="p-2 flex-fill d-grid">
                    <button className="btn btn-primary" onClick={onclick}>취소</button>
                </div>
		    </div>
	    </div>
    )
}

export default Page2