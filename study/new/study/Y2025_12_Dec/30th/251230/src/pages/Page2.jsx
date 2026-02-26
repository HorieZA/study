const Page2 = () => {
    const arr = ["Lee", "Na", "Ra"]
    const PageN = (v,i) => <li key={i}>{v}</li>
    const list = []
    for (const i in arr) {
        list[list.length] = PageN(arr[i], i)
    }
    return (
        <>
            <h1>두번째 화면 입니다.</h1>
            <ul>
                {list}
            </ul>
        </>
    )
}

export default Page2