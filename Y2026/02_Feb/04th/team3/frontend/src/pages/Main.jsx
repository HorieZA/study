import { useEffect, useState } from "react"
import { useNavigate } from "react-router" 
import { api } from "../utils/network"
import { useAuth } from "../hooks/AuthProvider"

const Main = () => {
  const navigate = useNavigate()
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const { isLogin } = useAuth();

useEffect(() => {
    api.get("/board")
      .then(res => {
        // 백엔드에서 온 데이터가 배열인지 확인하고 바로 담습니다.
        if (Array.isArray(res.data)) {
          setBoards(res.data);
        } else if (res.data.data) {
          // 혹시 나중에 형식이 바뀌더라도 대응 가능하게 작성
          setBoards(res.data.data);
        }
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-5">로딩 중...</div>

  return (
    <div className="container mt-4">
      <h1 className="display-5 text-center mb-4">게시판</h1>

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={() => navigate("/boardAdd")}>
          게시글 작성
        </button>
      </div>

      <table className="table table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th style={{ width: "10%" }}>no</th>
            <th>게시글</th>
            <th style={{ width: "20%" }}>작성자</th>
          </tr>
        </thead>
        <tbody>
          {boards.map(board => (
                <tr 
                    key={board.no} 
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        // 3. 로그인 여부 확인
                        if (!isLogin) {
                            alert("로그인이 필요한 서비스입니다.");
                            navigate("/login");
                            return;
                        }
                        // 로그인된 경우에만 상세 페이지로 이동
                        navigate("/board_view", { state: { no: board.no } });
                    }} 
                >
                    <td>{board.no}</td>
                    <td>{board.title}</td>
                    <td>{board.name}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Main