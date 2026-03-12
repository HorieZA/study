
const Page5 = () => {
  const arr = ["LeeNaRa", "Lee", "Na-Ra"]
  const pageN = (v, i) => <li key={i}>{v}</li>
  const list = []
  for(const i in arr) {
    list[list.length] = pageN(arr[i], i)
  }
  return (
    <ul>
      {list}
    </ul>
  )  
}
export default Page5