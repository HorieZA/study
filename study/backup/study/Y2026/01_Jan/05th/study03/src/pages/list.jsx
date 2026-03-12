import { useState, useNavigate } from "react"

const List = () => {
  const navigate =  useNavigate()

  onclick = data => {
    navigate('page2', {state: data})
  }
  const arr = [
    { key:1, name:"스티븐", email:"jobs@shellfolder.com", regDate:"2023-02-28", pwd: "1", gender: true },
    { key:2, name:"에브릴", email:"lavigne@shellfolder.com", regDate:"2023-02-27", pwd: "2", gender: false },
    { key:3, name:"남영준", email:"wanyj2002@gmail.com", regDate:"2023-02-24", pwd: "3", gender: true },
  ]
  const styles = {
    "cursor":"pointer"
  }

  return (
    <div className="con">
    </div>
  )
}

export default List