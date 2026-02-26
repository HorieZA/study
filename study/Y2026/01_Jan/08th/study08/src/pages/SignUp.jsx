import { useState } from "react"
import { useNavigate } from "react-router"

const SignUp = () => {
  const navigate = useNavigate()
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

  return (
    <>
      <h1 className="text-center bg-success text-dark bg-opacity-50">SignUp</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" placeholder="Enter name" 
            name="name" required onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" 
            name="email" required onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd">Password:</label>
          <input type="password" className="form-control" id="pwd" placeholder="Enter password" 
            name="pswd" required onChange={e => setPwd(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="job">Job:</label>
          <input type="text" className="form-control" id="job" placeholder="Enter job" 
            name="job" onChange={e => setJob(e.target.value)} />
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="radio1" name="gender" value="1" 
                checked={gender} onChange={e => {setGender(true), setImg("/images/img_avatar1.png")}} />남성
              <label className="form-check-label" htmlFor="radio1"></label>
            </div>
          </div>
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="radio2" name="gender" value="2" 
                checked={!gender} onChange={e => {setGender(false),setImg("/images/img_avatar2.png")}} />여성
              <label className="form-check-label" htmlFor="radio2"></label>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill d-grid">
            <button type="submit" className="btn btn-primary">SignUp</button>
          </div>
          <div className="p-2 flex-fill d-grid">
            <button className="btn btn-danger" onClick={close}>Cancel</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default SignUp