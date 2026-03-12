import { useState } from "react"

const App = () =>{
  const[name, setName] = useState("")
  const[desc, setDesc] = useState("")

  console.log("App() 호출됨")

  const event = (e) => {
    const data = {name, desc}
    console.log(data)
  }

  return (
    <>
      <input type="text" value={name}
        name="name" onChange={e=>setName(e.target.value)} />
      <input type="text" value={desc}
        name="desc" onChange={e=>setDesc(e.target.value)} />
      <button type="button" onClick={event}>호출</button>
    </>
  )
}

// const App = () =>{
//   const[c, setC] = useState({"name":"", "desc":""})

//   const event = (e) => {
//     console.log(e.target)
//     console.log(e.target.name)
//     console.log(e.target.desc)
//     setC({...c, [e.target.name]:e.target.value})
//   }


//   return (
//     <>
//       <input type="text" value={c.name}
//         name="name" onChange={event} />
//       <input type="text" value={c.desc}
//         name="desc" onChange={event} />
//     </>
//   )
// }

// const App = () =>{
//   const[c, setC] = useState({"name":"", "desc":""})

// const event = (e) => {

// }


//   return (
//     <>
//       <input type="text" value={c.name} name="name" 
//         onChange={e=>setC({...c, [e.target.name]:e.target.value})} />
//       <input type="text" value={c.desc} name="desc" 
//         onChange={e=>setC({...c, [e.target.desc]:e.target.value})} />
//       <button type="button" onClick={event}>호출</button>
//     </>
//   )
// }


// const App = () =>{
//   var[a, setA] = useState("A")
//   let[b, setB] = useState("B")
//   const[c, setC] = useState("C")

//   // console.log("App 호출 됨")

//   const fn1 = () => console.log("fn1")
//   const fn2 = () => console.log("fn2")

//   if(a === "AA") console.log(`값이 ${a}로 변경되었습니다.`)

//   const event = () => {
//     console.log(1)
//     setA("AA")
//     if(a === "AA") return
//     console.log(2)
//     fn1()
//     console.log(3)
//     fn2()

//   }


//   return (
//     <>
//       <button type="button" onClick={event}>호출</button>
//       <p>{a}</p>
//       <p>{b}</p>
//       <p>{c}</p>
//     </>
//   )
// }

export default App
