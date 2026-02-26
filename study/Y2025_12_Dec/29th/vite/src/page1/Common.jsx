export const Page1 = () => <h1>상단 화면</h1>
export const Page2 = () => <h1>하단 화면</h1>

const Main = () => {
  const arr = ["01번", "02번", "03번"]
  const page3 = (v, i) => <li key={i}>{v}</li>
  const list = []
  for(const i in arr) {
    list[list.length] = page3(arr[i], i)
  }

  return (
    <ul>
      {/* arr.map(page3) <= 권장사항 */}
      {list}
    </ul>
  )  
}

export default Main