import { useState } from "react"

const Page = () => {
  const [arrs, setArrs] = useState([{ key: "", content: "", check: false }])

  const checkBoolean = e => setArrs(e.target.value === key ? { ...arrs, check: true } : { ...arrs, check: false })

  const onChange = e => {
    const { name, value } = e.target
    setArrs({ ...arrs, [name]: value })
  }


  return (
    <div className="word-container">
      <h3 className="text-center mb-4">단어장</h3>

      {/* <!-- 입력 및 수정 영역 --> */}
      <form className="input-group mb-3">
        <input type="text" name="word" className="form-control" placeholder="단어를 입력하세요" required />
        <button type="submit" className="btn btn-primary">추가</button>
      </form>

      {/* <!-- 검색 영역 --> */}
      <input type="text" name="search" className="form-control mb-3" placeholder="검색어를 입력하세요" onKeyUp={() => { }} />

      {/* <!-- 목록 --> */}
      <ul className="list-group">
        {/* <!-- 단어를 여기에 추가됩니다 --> */}
        {/* {
          arrs.map((v, i) => {
            return (
              <li key={i} className="list-group-item d-flex justify-content-between align-items-center word-item">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={v.check} onChange={checkBoolean} />
                  <span className="ms-2" value={v.key}>{v.content}</span>
                </div>
                <button className="btn btn-sm btn-outline-danger" onClick={() => { }}>삭제</button>
              </li>
            )
          })
        } */}

        {
          arrs.map((v, i) => {
            return (
              arrs.length === 0 ?
                <li></li> :
                (
                  <li key={i} className="list-group-item d-flex justify-content-between align-items-center word-item">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" checked={v.check} onChange={checkBoolean} />
                      <span className="ms-2" value={v.key}>{v.content}</span>
                    </div>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => { }}>삭제</button>
                  </li>
                )
            )
          })
        }
        <li className="list-group-item d-flex justify-content-between align-items-center word-item">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" onChange={() => { }} />
            <span className="ms-2">반복문 정리하기</span>
          </div>
          <button className="btn btn-sm btn-outline-danger" onClick={() => { }}>삭제</button>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center word-item completed">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" onChange={() => { }} checked />
            <span className="ms-2">조건문 정리완료</span>
          </div>
          <button className="btn btn-sm btn-outline-danger" onClick={() => { }}>삭제</button>
        </li>
      </ul>
    </div>
  )
}

export default Page