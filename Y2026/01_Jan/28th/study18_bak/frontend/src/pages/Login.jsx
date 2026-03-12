// import axios from 'acios'

const Login = () => {
  const submitEvent = e => {
    e.preveintDefault()
    console.log(e.target.email.vlaue)
    console.log(e.target.pwd.vlaue)
  }
  return (
    <div className="container mt-3">
			<h1 className="display-1 text-center">로그인</h1>
			<form onSubmit={submitEvent}>
				<div className="mb-3 mt-3">
					<label htlmfor="email" className="form-label">이메일</label>
					<input type="email" className="form-control" id="email" placeholder="이메일를 입력하세요."
            name="email" required onChange={e => (e.target.value)} />
				</div>
				<div className="mb-3">
					<label htlmfor="pwd" className="form-label">비밀번호</label>
					<input type="password" className="form-control" id="pwd" placeholder="비밀번호를 입력하세요."
            name="pwd" required onChange={e => (e.target.value)} />
				</div>
        <div className="d-flex">
          <div className="p-2 flex-fill d-grid">
            <button type="submit" className="btn btn-primary">로그인</button>
          </div>
          <div className="p-2 flex-fill d-grid">
            <a href="../index.html" className="btn btn-primary">취소</a>
          </div>
        </div>
			</form>
		</div>
  )
}

export default Login