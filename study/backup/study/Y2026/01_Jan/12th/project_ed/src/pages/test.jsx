import { useState, useEffect } from "react"

const Page = () => {
  const [cont, setCont] = useState("")
  // 저장용과 보여주기용 2개를 선언
  const [display, setDisplay] = useState([])
  const [arrs, setArrs] = useState([])
  const [search, setSearch] = useState("")

  const checkBoolean = key => {
    // 불러오는 key 값 확인
    const arrc = arrs.filter(row => row.key === key)
    if (arrc.length > 0) {
      // arrc[0].check 값 확인
      console.dir(`체크 전 값 : ${arrc[0].check}`)

      // 최종적으로 변경된 값을 담기위해 
      // 맵을 이용하여 단어장에 입력된 값을 전부 체크하여 해당 값만 true로 바꾸고
      // 나머지는 그대로 유지하여 전부 맵에arrc[0]. 작업
      const arrchk = arrs.map(row => {
        if (row.key === key) {
          return arrc[0].check === false ? { ...row, check: true } : { ...row, check: false }
        } else {
          return row
        }
      })
      // 모두 저장...
      setArrs(arrchk)
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    const key = (arrs.length === 0 ? 1 : arrs.at(-1).key + 1)
    const data = { key, cont, check: false }
    // console.log(data)
    // 입력한 데이터 저장
    setArrs([...arrs, data])
    // 마지막으로 초기화 하여 입력한 값이 빈값이 되도록 설정
    setCont("")
  }

  const onDelete = key => {
    // 삭제할 객체 만 제외하여 배열 저장
    const del = arrs.filter(row => row.key !== key)
    // 삭제할 객체 만 제외되었는지 확인
    // console.dir(del)
    setArrs(del)
  }

  useEffect(() => {
    if (search === "") {
      // arrs 가져오는지 체크
      // console.dir(arrs)
      // 보여주기용에만 set 설정을 한다.
      setDisplay([...arrs])
    } else {
      // 저장용 arrs 값이 전부 나오는지 체크
      // console.dir(arrs)
      // JavaScript에서 사용하는 includes() 함수를 찾음...
      // includes() 함수는 주어진 배열의 특정 요소가 포함되어있는지 확인 하고 포함되어있으면 true, 그렇지 않으면 false를 반환한다.
      // 단, 문자열은 대소문자를 구분함. 
      // console.dir(arrs.filter(row => row.cont.includes(search)))
      // 보여주기용에만 set 설정을 한다.
      setDisplay(arrs.filter(row => row.cont.includes(search)))
    }
  }, [search, arrs])

  return (
    <div className="word-container">
      <h3 className="text-center mb-4">단어장</h3>

      {/* <!-- 입력 및 수정 영역 --> */}
      <form className="input-group mb-3" onSubmit={onSubmit}>
        <input type="text" name="word" className="form-control"
          placeholder="단어를 입력하세요" required value={cont}
          onChange={e => setCont(e.target.value)} />
        <button type="submit" className="btn btn-primary">추가</button>
      </form>

      {/* <!-- 검색 영역 --> */}
      <input type="text" name="search" className="form-control mb-3"
        placeholder="검색어를 입력하세요" 
        value={search} onChange={e => setSearch(e.target.value)} />

      {/* <!-- 목록 --> */}
      <ul className="list-group">
        { //단어를 여기에 추가됩니다
          display?.map((v, i) => {
            return (
              <li key={i} className={`list-group-item d-flex justify-content-between align-items-center word-item ${(v.check === true) ? "completed" : ""}`}>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox"
                    checked={v.check} onChange={() => checkBoolean(v.key)} />
                  <span className="ms-2" value={v.key}>{v.cont}</span>
                </div>
                <button className="btn btn-sm btn-outline-danger" type="button"
                  onClick={() => onDelete(v.key)}>삭제</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Page