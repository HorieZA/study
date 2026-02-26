import { useState, useEffect } from "react"

const Page = () => {
  const [cont, setCont] = useState("")
  // 저장용과 보여주기용 2개를 선언
  const [display, setDisplay] = useState([])
  const [arrs, setArrs] = useState([])
  const [search, setSearch] = useState("")

  const checkBoolean = key => {
    // 불러오는 key 값 확인
    // console.log(key)
    const arrc = arrs.filter(row => row.key === key)
    if (arrc.length > 0) {
      // arrc[0].check 값 확인
      console.dir(arrc[0].check)
      // const setCheck = arrc[0].check===false ? arrs[key].push(...arrs[key], check[true]) : arrs[key].push(...arrs[key], check[false])
      // setCheck 바뀌는지 확인
      // console.dir(setCheck)
      // setArrs(setCheck)
      // setDisplay(setCheck)
      // const setCheck1 = arrc[0].check===false ? {...arrs[key], check:true} : {...arrs[key], check:false}
      // // setCheck1 바뀌는지 확인
      // console.dir(setCheck1)
      // setArrs(setCheck1)
      // setDisplay(setCheck1)
      // arrs[arrc[0]].push(setCheck)
      // const setCheck2 = arrc[0].check===false ? {check:true} : {check:false}
      // // setCheck2 바뀌는지 확인
      // console.dir(setCheck2)
      // display[arrc[0]].check.push(setCheck2)
      // arrs[arrc[0]].check.push(setCheck2)
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
    // 삭제할 객체 만 제외하여 배열 저장하는 의미
    const del = arrs.filter(row => row.key !== key)
    // 삭제할 객체 만 제외되었는지 확인
    console.dir(del)
    setArrs(del)
  }

  useEffect(() => {
    if (search === "") {
      // arrs 가져오는지 체크
      console.dir(arrs)
      // 보여주기용에만 set 설정을 한다.
      setDisplay([...arrs])
    } else {
      // 저장용 arrs 값이 전부 나오는지 체크
      console.dir(arrs)
      // 정말 입력한 값이 일치한 값만 가져옴
      // 원하는 값이 포함된 배열을 찾아 담는 방법을 찾아봐야함. 
      // setArrs(arrs.filter(row => row.cont === search))
      // JavaScript에서 사용하는 includes() 함수를 찾음...
      // includes() 함수는 주어진 배열의 특정 요소가 포함되어있는지 확인 하고 포함되어있으면 true, 그렇지 않으면 false를 반환한다.
      // 단, 문자열은 대소문자를 구분함. 
      console.dir(arrs.filter(row => row.cont.includes(search)))
      // 보여주기용에만 set 설정을 한다.
      setDisplay(arrs.filter(row => row.cont.includes(search)))
      // 아래는 대문자를 전부 소문자로 반환하여 검색하는 방법
      // 이녀석도 JavaScript 함수... toLowerCase() 함수는 대문자를 소문자로 변경해준다
      // console.dir(arrs.filter(row => row.cont.toLowerCase().includes(search.toLowerCase())))
      // setArrs(arrs.filter(row => row.cont.toLowerCase().includes(search.toLowerCase())))
    }
  }, [search, arrs])



  return (
    <div className="word-container">
      <h3 className="text-center mb-4">단어장</h3>

      {/* <!-- 입력 및 수정 영역 --> */}
      <form className="input-group mb-3" onSubmit={onSubmit}>
        <input type="text" name="word" className="form-control" placeholder="단어를 입력하세요" required value={cont} onChange={e => setCont(e.target.value)} />
        <button type="submit" className="btn btn-primary">추가</button>
      </form>

      {/* <!-- 검색 영역 --> */}
      <input type="text" name="search" className="form-control mb-3" placeholder="검색어를 입력하세요" value={search} onChange={e => setSearch(e.target.value)} />

      {/* <!-- 목록 --> */}
      <ul className="list-group">
        { //단어를 여기에 추가됩니다
          display?.map((v, i) => {
            return (
              <li key={i} className="list-group-item d-flex justify-content-between align-items-center word-item">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={v.check} onChange={() => checkBoolean(v.key)} />
                  <span className="ms-2" value={v.key}>{v.cont}</span>
                </div>
                <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => onDelete(v.key)}>삭제</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Page