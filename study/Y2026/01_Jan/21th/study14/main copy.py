import mariadb
from dotenv import load_dotenv
load_dotenv()
import os

# 하나의 루트~
try:
  # 해당 정보는 아래 참조
  # [Windows 설정] - [시스템] - [정보] - [고급 시스템 설정] - [고급] - [환경 변수] - [시스템 변수] - [Path]
  # 개인적으로 하려면 .env 파일에 등록하는 것을 추천
  conn = mariadb.connect(
    user=os.getenv("USER"),
    password=os.getenv("PASSWORD"),
    host=os.getenv("HOST"),
    port=int(os.getenv("PORT")),
    database=os.getenv("DATABASE")
  )
  print(conn, type(conn))
  cur = conn.cursor()
  sql = "select 1 as no"
  cur.execute(sql)
  # row = cur.fetchone() # 하나의 행을 받을때 쓰는 함수
  rows = cur.fetchall() # 전체의 행을 받을때 쓰는 함수
  # print(row, type(row), columns)
  
  # tuple로 관리하려면 소괄로로 변경
  columns = [desc[0] for desc in cur.description]
  # 하나의 행일때 하나로 묶어주는 작업
  # result = dict(zip(columns, row)) if row else None

  # 전체의 행일때 하나로 묶어주는 작업
  result = [dict(zip(columns, row)) for row in rows]

  print(result)

  # 사번이 10001인 직원의 사번과 이름 조회
  # sql = [
  #   {"sql":"SELECT emp_no, first_name FROM employees WHERE emp_no = 10001 ORDER BY 1;"},
  #   {"sql":"SELECT emp_no, dept_no FROM dept_manager WHERE dept_no = 'd005' ORDER BY 1;"},
  #   {"sql":"SELECT emp_no, dept_no FROM dept_manager WHERE dept_no != 'd003' ORDER BY 1;"},
  #   {"sql":"SELECT emp_no, salary FROM salaries WHERE salary >= 150000 ORDER BY 1;"},
  #   {"sql":"select emp_no, hire_date, first_name from employees WHERE SUBSTR(hire_date, 1, 4) >= 1986 ORDER BY 1;"},
  #   {"sql":"SELECT emp_no, dept_no, from_date FROM dept_manager WHERE SUBSTR(from_date, 1, 4) >= 1990 ORDER BY 1;"},
  #   {"sql":"SELECT emp_no, hire_date FROM employees WHERE SUBSTR(hire_date, 1, 4) <= 1990 AND hire_date NOT LIKE '20%' ORDER BY 1;"},
  #   {"sql":"SELECT emp_no, gender, hire_date FROM employees WHERE SUBSTR(hire_date, 1, 4) >= 1990 AND gender = 'M' ORDER BY 1;"},
  #   {"sql":"SELECT emp_no, salary, from_date FROM salaries WHERE SUBSTR(from_date, 1, 4) >= 1990 AND salary >= 60000 ORDER BY 1;"},
  #   {"sql":"SELECT emp_no, dept_no FROM dept_manager WHERE dept_no LIKE 'd001' OR dept_no LIKE 'd002' ORDER BY 1;"},
  #   {"sql":"SELECT emp_no, title FROM titles WHERE title LIKE 'staff' OR title LIKE 'engineer' ORDER BY 1;"},
  #   {"sql":"SELECT emp_no, dept_no FROM dept_manager WHERE dept_no NOT LIKE 'd003' ORDER BY 2;"},
  #   {"sql":"SELECT emp_no, salary FROM salaries WHERE salary >= 60000 AND salary <= 70000 ORDER BY 1;"},
  #   {"sql":"SELECT emp_no, dept_no FROM dept_manager WHERE dept_no = 'd001' OR dept_no = 'd002' ORDER BY 2;"},
  #   {"sql":"SELECT emp_no, dept_no from dept_manager WHERE dept_no != 'd001' AND dept_no != 'd002' ORDER BY 2;"},
  #   {"sql":"SELECT emp_no, first_name FROM employees WHERE first_name LIKE 'b%' ORDER BY 1;"},
  #   {"sql":"SELECT emp_no, first_name FROM employees WHERE first_name LIKE '_r%' ORDER BY 1;"},
  #   {"sql":"SELECT emp_no, first_name FROM employees WHERE first_name LIKE '%i' ORDER BY 1;"},
  #   {"sql":"SELECT emp_no, first_name FROM employees WHERE first_name NOT LIKE 'b%' ORDER BY 1;"},
  # ]
  # for i in range(len(sql)):
  #   cur.execute(sql[i]["sql"])
  #   # row = cur.fetchone()
  #   rows = cur.fetchall()
  #   columns = [desc[0] for desc in cur.description]
  #   # result = dict(zip(columns, row)) if row else None
  #   result = [dict(zip(columns, row)) for row in rows]
  #   print(row)
  #   print(f"문제[{i}]")
  #   print(result)

  # 종료할때는 역순으로 종료시켜야함
  cur.close()
  conn.close()
except mariadb.Error as e:
  print(f"MariaDB Error : {e}")