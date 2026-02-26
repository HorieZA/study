// useState, useEffect는 같이 씀. 예외처리 용으로 사용
// useState : array같은 데이터를 담으면 감지해서 렌더링을 다시해줌 => Page1에서 데이터를 받고
// useEffect : 데이터에 값을 담거나 확인해주는 것 => 데이터를 채워줌
import { useEffect, useState } from 'react' // react 쓸때
// useLocation : 주소
import { useNavigate, useLocation } from 'react-router' // react-router 쓸때

const Select = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const close = () => navigate("/")
  const [data, setData] = useState({ name: "", email: "", pwd: "", gender: true })

  const onSubmit = e => {
    e.preventDefault()
    console.dir(data)
    navigate('/edit', {state: data})
  }

  // === 예외처리 (Page2 직접 입력해서 값이 없을 경우(null) page1으로 이동)
  useEffect(() => {
    if (location.state === null) return onclick()
    setData(location.state) // 전달한거 꺼내기
  }, [])
  // ===================== 예외처리 추가 설명 =====================
  // [] : 감지하기 위한 부분, 값이 변경되면 변경된 값 만큼 반복시킴
  // 최초 A에 값이 없는 상태에서 화면 전환
  // → A에 값이 추가 → 최초 값이 변경(A+값)되었기에 재감지되서 재실행
  // → 이후 A값이 추가 되었으나(A+값) 재실행 하기 직전과 동일한 값(A+값 = A+값)이기에 멈춤

  // (예시 코드 : 화면상 오류로 마무리 되지만 실시간으로 무한반복 실행 됨)
  // const [num, setNum] = useState(0)
  // useEffect(() => {
  //     if (location.state === null) return onclick()
  //     setNum(num++)
  // }, [num])
  // =============================================================

  return (
    <div className="container mt-3">
      <h1 className="display-1 text-center">사용자 정보</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">이름:</label>
          <input type="text" className="form-control" id="name" 
                placeholder="이름을 입력하세요." name="name" 
                readOnly="readonly" defaultValue={data.name} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">이메일:</label>
          <input type="email" className="form-control" id="email" 
                placeholder="이메일를 입력하세요." name="email" 
                readOnly="readonly" defaultValue={data.email} />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">비밀번호:</label>
          <input type="password" className="form-control" id="pwd" 
                placeholder="비밀번호를 입력하세요." name="pwd" 
                readOnly="readonly" defaultValue={data.pwd} />
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="radio1" 
                    name="gender" value="1" checked={data.gender} readOnly="readonly" />남성
              <label className="form-check-label" htmlFor="radio1"></label>
            </div>
          </div>
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="radio2" 
                    name="gender" value="2" checked={!data.gender} readOnly="readonly" />여성
              <label className="form-check-label" htmlFor="radio2"></label>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill d-grid">
            <button className="btn btn-primary" type="submit">수정</button>
          </div>
          <div className="p-2 flex-fill d-grid">
            <button className="btn btn-primary" type="button" onClick={close}>삭제</button>
          </div>
          <div className="p-2 flex-fill d-grid">
            <button className="btn btn-primary" type="button" onClick={close}>취소</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Select