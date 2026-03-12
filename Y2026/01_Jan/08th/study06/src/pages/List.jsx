import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { list } from "@/data.js"

const List = () => {
  const navigate = useNavigate()
  const close = () => navigate("/")
  const [arrs, setArrs] = useState([])
  const [state, setState] = useState(0)

  useEffect(()=>{
    if(state === 1 ||state === 2) {
      setArrs(list.filter(row=>row.accept === state))
    } else {
      setArrs([...list])
    }
  },[])

  return (
    <div className="container mt-3">
        <h1 className="text-center bg-success text-dark bg-opacity-50">LIST</h1>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" className="btn btn-secondary" onClick={()=>setState(0)}>전체</button>
            <button type="button" className="btn btn-success" onClick={()=>setState(1)}>승인</button>
            <button type="button" className="btn btn-warning" onClick={()=>setState(2)}>미승인</button>
            <a href="/new" className="btn btn-primary">추가</a>
        </div>
        <div className="list-group mt-2 text-center">
          	{/* <button type="button" className={`list-group-item m-1 display-6 ${v.accept===1 ? "list-group-item-success" : "list-group-item-warning"}'}>아이템1</button> */}
          	<button className="list-group-item m-1 display-6 list-group-item-warning" type="button">아이템2</button>
        </div>
    </div>
  )
}

export default List