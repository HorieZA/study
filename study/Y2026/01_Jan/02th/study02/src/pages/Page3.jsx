import { useState } from "react"

const Page3 = () => {
  const [array, setArray] = useState([])
  const [txt, setTxt] = useState('')

  const submitEvent = e => {
    e.preventDefault()
    if (txt === '') return
    setArray([txt, ...array])
    setTxt('')
  }
  console.log("text : ",txt)

  return (
    <form onSubmit={submitEvent}>
      <input type='text' placeholder='글을 작성하세요.'
        value={txt} onChange={e => setTxt(e.target.value)} />
      <button type='submit'>입력</button>
      <div>
        {
          array.toReversed().map((v, i) => <p key={i}>{v}</p>)
        }
      </div>
    </form>
  )
}
export default Page3