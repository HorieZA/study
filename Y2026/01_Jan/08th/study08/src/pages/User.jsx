import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { list } from "@/data.js"

const User = () => {
  const navigate = useNavigate()
  const params = useParams()
  const close = () => navigate("/")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [job, setJob] = useState("")
  const [gender, setGender] = useState(true)
  const [img, setImg] = useState("")

  const onSubmit = e => {
    e.preventDefault()
    const data = { name, email, pwd, job, gender, img }
    console.log(data)
  }

  useEffect(() => {
    // 선언된 data.js 파일의 list 배열 N번째 인덱스의 객체를 data에 저장하여, 값이 없으면 목록으로 이동하고, 있으면 각 값에 각각 저장 
    const data = list[params.id]
    if (data === undefined) return close()
    setImg(data?.img)
    setName(data?.name)
    setEmail(data?.email)
    setPwd(data?.pwd)
    setJob(data?.job)
    setGender(data?.gender)
  }, [])

  return (
    <>
      <h1 className="text-center bg-success text-dark bg-opacity-50">User</h1>
      <img src={!gender ? "/images/img_avatar2.png" : "/images/img_avatar1.png"} className="d-block mx-auto mt-3 profile-image"/>
      <form onSubmit={onSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" placeholder="Enter name" 
            name="name" required readOnly="readonly" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" 
            name="email" required readOnly="readonly" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd">Password:</label>
          <input type="password" className="form-control" id="pwd" placeholder="Enter password" 
            name="pswd" required readOnly="readonly" value={pwd} onChange={e => setPwd(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="job">Job:</label>
          <input type="text" className="form-control" id="job" placeholder="Enter job" 
            name="job" value={job} onChange={e => setJob(e.target.value)} />
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="gender1" name="gender" value="1" 
                checked={gender} onChange={e => {setGender(true), setImg("/images/img_avatar1.png")}} />남성
              <label className="form-check-label" htmlFor="gender1"></label>
            </div>
          </div>
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="gender2" name="gender" value="2" 
                checked={!gender} onChange={e => {setGender(false),setImg("/images/img_avatar2.png")}} />여성
              <label className="form-check-label" htmlFor="gender2"></label>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill d-grid">
            <button type="submit" className="btn btn-success">Edit</button>
          </div>
          <div className="p-2 flex-fill d-grid">
            <button className="btn btn-danger" onClick={close}>Cancel</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default User