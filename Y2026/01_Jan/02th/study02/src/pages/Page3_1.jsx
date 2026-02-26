import { useState } from "react"

const Page3 = () => {
  const [array, setArray] = useState([])
  const [data, setData] = useState({"name": "", "email": "", "pwd": "", "gender": true})
  const onChange = (e) => { }

  const submitEvent = e => {
    e.preventDefault()
    if (txt === '') return
    setArray([txt, ...array])
    setTxt('')
  }
  console.log("text : ",txt)

  return (
    // <form onSubmit={submitEvent}>
    //   <input type='text' placeholder='글을 작성하세요.'
    //     defaultValue={txt} onChange={(e) => {
    //       console.log("input : ",e.target.value)
    //       setTxt(e.target.value)}}
    //     // value={txt} onChange={e => setTxt(e.target.value)}
    //   />
    //   <button type='submit'>입력</button>
    //   <div>
    //     {
    //       array.toReversed().map((v, i) => <p key={i}>{v}</p>)
    //     }
    //   </div>
    // </form>
    <div className="container mt-3">
	  <h1 className="display-1 text-center">사용자 등록</h1>
		<form>
		  <div className="mb-3 mt-3">
		    <label for="name" className="form-label">이름:</label>
		    <input type="text" className="form-control" id="name" placeholder="이름을 입력하세요." name="name" onChange={onChange}/>
		  </div>
		  <div className="mb-3 mt-3">
		    <label for="email" className="form-label">이메일:</label>
		    <input type="email" className="form-control" id="email" placeholder="이메일를 입력하세요." name="email" onChange={onChange}/>
		  </div>
		  <div className="mb-3">
		    <label for="pwd" className="form-label">비밀번호:</label>
		    <input type="password" className="form-control" id="pwd" placeholder="비밀번호를 입력하세요." name="pwd" onChange={onChange}/>
		  </div>
			<div className="d-flex">
			  <div className="p-2 flex-fill">
			  	<div className="form-check">
					<input type="radio" className="form-check-input" id="radio1" name="optradio" value="1" checked={data.gender === true} />남성
					<label className="form-check-label" for="radio1"></label>
				</div>
			  </div>
			  <div className="p-2 flex-fill">
			  	<div className="form-check">
					<input type="radio" className="form-check-input" id="radio2" name="optradio" value="2" checked={data.gender === false} />여성
					<label className="form-check-label" for="radio2"></label>
				</div>
			  </div>
			</div>
		</form>
		<div className="d-flex">
		  <div className="p-2 flex-fill d-grid">
				<a href="Select.html" className="btn btn-primary">생성</a>
		  </div>
		  <div className="p-2 flex-fill d-grid">
				<a href="List.html" className="btn btn-primary">취소</a>
		  </div>
		</div>
	</div>
  )
}
export default Page3