import "@/list.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { list } from "@/data.js"

const List = () => {
  const navigate = useNavigate()
  const [arrs, setArrs] = useState([])
  const [state, setState] = useState(0)
  const [isHovered, setIsHovered] = useState(false);
  const onClick = i => navigate(`/detail/${i}`)

  useEffect(()=>{
    if(state === 1 || state === 2) {
      setArrs(list.filter(row => row.accept === state))
    } else {
      setArrs([...list])
    }
  },[state])

  //  const style = {
  //   cursor: "pointer",
  //   fontWeight: "bold",
  //   color: "#fff",
  //   backgroundColor: "#b2327d",
  //   boxShadow: "5px 5px 10px 5px rgba(77, 71, 71, 0.2)"
  // }

  return (
    <>
        <h1 className="text-center bg-success text-dark bg-opacity-50">LIST</h1>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-secondary"type="button" onClick={()=>setState(0)}>전체</button>
            <button className="btn btn-success" type="button" onClick={()=>setState(1)}>승인</button>
            <button className="btn btn-warning" type="button" onClick={()=>setState(2)}>미승인</button>
            <a href="/new" className="btn btn-primary">추가</a>
        </div>
        <div className="list-group mt-2 text-center">
          {
            arrs.map((v,i)=>
              <button key={i} className={`list-group-item m-1 display-6 ${v.accept === 1 ? "list-group-item-success" : "list-group-item-warning"}`} type="button"
                onClick={()=>onClick(i)}>{v.title}</button>
            )
          }
        </div>
    </>
  )
}

export default List