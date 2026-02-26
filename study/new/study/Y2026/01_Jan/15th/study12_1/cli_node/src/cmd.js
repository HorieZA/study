import fs from "fs";

const getData = () => {
  const f = fs.readFileSync('./data/memo.json', 'utf-8')
  return JSON.parse(f)
}

const setData = (data) => {
    fs.writeFileSync('./data/memo.json', JSON.stringify(data), 'utf-8');
}

export const add = (cont, check) => {
  const data = getData()
  const key = (data.list.length === 0 ? 1 : data.list.at(-1).key + 1)
  data.list.push({ key, cont, check })
  console.log("단어장 등록", key, cont, check, data)
  setData(data)
}

export const mody = (key, cont, check) => {
    const data = getData();
    data.list = data.list.filter(v => {
        if(v.key == key) {
          v.cont = cont
          v.check = check
        }
        return v
    })
    console.log("단어장 수정", key, cont, check, data)
    setData(data)
}

export const ret = (key) => {
    const data = getData(); 
    data.list = data.list.filter( v => v.key != key )
    console.log("단어장 삭제", key)
    setData(data)
}

export const list = () => {
  console.log("list() 호출됨")
  const arr = getData().list
  for (const v of arr) console.log(v)
}