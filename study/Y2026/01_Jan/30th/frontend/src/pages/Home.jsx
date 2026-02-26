import { useState, useEffect } from "react"
import { useNavigate } from 'react-router'
import { list } from "@/data.js"
import { useCookies } from 'react-cookie'

const Home = () => {
	const navigate =  useNavigate()

  // const onClick = i => navigate(`/board_view/${i}`)
	const [cookies, setCookie] = useCookies(['id'])
	const onClick = i => {
		setCookie( i.id, { path: '/board_view' })
		// console.log(cookies)
		// navigate(`/board_view`)
	}
  const [arrs, setArrs] = useState([])
	useEffect(() => {  
		setArrs([...list])
  }, [])

  return (
    <div className="container mt-3">
			<h1 className="display-1 text-center">게시판</h1>
			<div className="d-flex justify-content-between align-items-center mt-4">
				<div className="btn-group">
					<a href="./board_add" className="btn btn-primary">게시글 작성</a>
				</div>
				{/* <form className="d-flex" style="max-width: 300px;">
					<input className="form-control me-2" type="search" placeholder="검색어를 입력하세요" />
					<button className="btn btn-outline-dark" type="submit">Search</button>
				</form> */}
			</div>
			<table className="table table-hover mt-3 text-center">
				<thead className="table-dark">
					<tr>
						<th>no</th>
						<th>게시글</th>
						<th>작성자</th>
					</tr>
				</thead>
				<tbody>
          {
            arrs.map((v, i) => {
              return (
                <tr key={i} className="cursor-pointer" onClick={()=>onClick(i)}>
                  <td>{v.no}</td>
                  <td>{v.title}</td>
                  <td>{v.name}</td>
                </tr>
              )
            })
          }
				</tbody>
			</table>
		</div>
  )
}

export default Home