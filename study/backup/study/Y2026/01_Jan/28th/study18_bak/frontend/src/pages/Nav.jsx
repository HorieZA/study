const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
		<div className="container-fluid">
			<a className="navbar-brand" href="../index.html">TEAM3</a>
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link" href="/login">로그인</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/">로그아웃</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="./signup.html">회원가입</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="./user_view.html">회원정보</a>
					</li>
				</ul>
			</div>
		</div>
		</nav>
  )
}

export default Nav