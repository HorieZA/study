import {useNavigate} from 'react-router'
import {useLocation} from 'react-router'

const Page2 = () => {
	// const data = {
	// 	"name": "스티븐",
	// 	"email": "jobs@shellfolder.com",
	// 	"pwd": "1",
	// 	"gender": true,
	// }

	// useLocation선언
	const location = useLocation();
	// 가져온 파라미터 값은 이름과 이메일에 저장
	const data = {
		"name": location.state.name,
		"email": location.state.email,
		"pwd": "1",
		"gender": true,
	}
	
	console.log(data);

	const navigators = useNavigate()
  const onclick = () => {
    // location.href = 'Select.html';
    // navigators("/")
		navigators(-1)
  }
	return (
		<div className="container mt-3">
			<h1 className="display-1 text-center">사용자 정보</h1>
			<form>
				<div className="mb-3 mt-3">
					<label htmlFor="name" className="form-label">이름:</label>
					<input type="text" className="form-control" id="name" placeholder="이름을 입력하세요." name="name" readOnly="readonly" defaultValue={data.name}/>
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="email" className="form-label">이메일:</label>
					<input type="email" className="form-control" id="email" placeholder="이메일를 입력하세요." name="email" readOnly="readonly" defaultValue={data.email}/>
				</div>
				<div className="mb-3">
					<label htmlFor="pwd" className="form-label">비밀번호:</label>
					<input type="password" className="form-control" id="pwd" placeholder="비밀번호를 입력하세요." name="pwd" readOnly="readonly" defaultValue={data.pwd}/>
				</div>
				<div className="d-flex">
					<div className="p-2 flex-fill">
						<div className="form-check">
							<input type="radio" className="form-check-input" id="radio1" name="optradio" value="1" checked={data.gender === true} readOnly="readonly" />남성
							<label className="form-check-label" htmlFor="radio1"></label>
						</div>
					</div>
					<div className="p-2 flex-fill">
						<div className="form-check">
							<input type="radio" className="form-check-input" id="radio2" name="optradio" value="2" checked={data.gender === false} readOnly="readonly" />여성
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