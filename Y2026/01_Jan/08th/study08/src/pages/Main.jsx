import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { list } from "@/data.js"

const Main = () => {
  const navigate = useNavigate()
  const close = () => navigate("/")
  const onClick = i => navigate(`/user/${i}`)
  const [arrs, setArrs] = useState([])

  useEffect(() => {
    setArrs([...list])
  }, [])


  return (
    <>
      <h1 className="text-center bg-success text-dark bg-opacity-50">MAIN</h1>
      <div className="btn-group">
        <a className="btn btn-warning" href="/signIn">SignIn</a>
        <button className="btn btn-primary" href="/signUp">SignUp</button>
      </div>
      <div className="row mt-2">
        {
          arrs.map((v, i) => {
            return (
            <div key={i} className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="card">
                <img className="card-img-top" src={v.img} alt="Card image" />
                <div className="card-body">
                  <h4 className="card-title">{v.name}</h4>
                  <p className="card-text">{v.job}</p>
                  <button className="btn btn-primary" onClick={e=>onClick(i)}>See Profile</button>
                </div>
              </div>
            </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Main