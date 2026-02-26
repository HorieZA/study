from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse

# --port 777 => 원하는 포트로 바꿀수 있다.

# 0.0.0.0 => 모든 것을 허용하겠다는 뜻.
# => 서비스 모드시 해당 포트가 표시되며, 서비스가 실행된 PC의 IP를 알려주면 다른 PC에서 접속 가능
# => 아래와 같이 실행하면 됨
# => uv run fastapi run

app = FastAPI()

arr = [] # 전역 변수로 올리면 메모리를 쌓을 수 있음 -> 언제까지? 서버가 꺼질 때 까지 (껐다 키면 초기화)

@app.get("/")
# 쿼리스트링 형식으로 진행
def root(txt: str = ""):
  return{"status":True, "txt": txt}

# Form은 Class이므로 다음과 같이 선언이 필요함 
# from fastapi import FastAPI, Form
# Form("") => 초기값 선언
# Form() => 무조건 값을 받아와야함
# @app.post("/{var}") => 이렇게 선언하여 def root에 var을 넣을 수 있다.
# 단, 요청하는 HTML <form> 코드의 action값에 값을 추가 해야 가능함 
# ex)form action="/2" >> 받아오는 var에 2가 추가됨 
# 최종 예시는 아래 참조
@app.post("/{var}")
# def root(txt: str = Form()): => post는 폼으로 보내야함
def root(
  id: str = Form(""),
  pwd: str = Form(""),
  var: str = ""
):
  return{"status":True, "id": id, "pwd": pwd, "var": var}


@app.get("/view", response_class = HTMLResponse)
def view():
  return"""
      <body>
        <form action="/2" method="post">
          <input type="text" name ="id" />
          <input type="password" name ="pwd" />
          <button type="submit">요청</button>
        </form>
      </body>
      """

# 사용자가 입력 데이터를 전달하는 방법중의 하나로, 
# url 주소에 미리 협의된 데이터를 파라미터를 통해 넘기는 것을 말함
# 파라미터가 여러개일 경우 &를 붙여 여러개의 파라미터를 넘길 수 있음
# ?는 쿼리스트링의 시작을 알리는 구분자이며,
# 선언한 조건/데이터를 바탕으로 데이터를 보여달라는 구체적인 정보를 전달하는 역할을 하는데
# 요약하면 서버에게 
# "여기서부터는 내가 전달하는 파라미터(데이터)를 해석해서 맞춤형 페이지를 보여줘"
# 라고 말하는 신호
# @app.get("/", response_class = HTMLResponse)
# def root(txt: str = ""): # "txt:" 키, "str = ' '" 키의 값에 빈값으로 준다는 의미
#   arr.append(1) # => 서버가 꺼질때까지 1이 추가됨
#   print(f"전역 배열 : {arr}")
#   print(f"전달 받은 변수 : {txt}")
#   if txt == "":
#     return """
#         <body>
#           <form>
#             <input type="text" name ="txt" />
#             <button type="submit">전송</button>
#           </form>
#         </body>
#         """
#   else:
#     arr.append(txt)
#     html = ""
#     for v in arr:
#       html += f"<li>{v}</li>"
#       return f"""
#           <body>
#             <ul>{html}<ul>
#             <a href="/">돌아가기</a>
#           </body>
#           """