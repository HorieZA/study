const Page4 = () => {
  const arr = ["NamYoungJun", "Nam", "Young-jun"]
  const page = (v, i) => <li key={i}>{v}</li>
  const list = []
  for(const i in arr) {
    list[list.length] = page(arr[i], i)
  }
  return (
    <ul>
      {list}
    </ul>
  )  
}
export default Page4