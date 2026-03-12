const Page3 = () => {
  const arr = ["Leechaehoon", "Lee", "chaehoon"]
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

export default Page3