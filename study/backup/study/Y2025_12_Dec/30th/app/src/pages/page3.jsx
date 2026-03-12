const Page3 = () => {
  const arr = ["KimKyungMin", "Kim", "Kyung-min"]
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

export default Page3