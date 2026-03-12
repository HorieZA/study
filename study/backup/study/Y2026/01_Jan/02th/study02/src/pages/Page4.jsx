import { useState } from "react"

const Page4 = () => {
  const a = []
  a[0] = 1
  const b = a
  b[0] = 2

  const c = [...a]
  c[0] = 3
  const d = [a[0]]
  d[0] = 4

  console.log(a, b, c, d)


  return (
    <></>
  )
}
export default Page4