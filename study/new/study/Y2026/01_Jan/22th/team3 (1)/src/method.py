from db import findOne, findAll, save

def empty():
  print("함수 정의가 되어 있지 않습니다.")

def userList(args):
  sql = f"""
        select 
          `no`, `name`, `email`, `pwd`,`regDate`
        from team3.user
        where `delYn` = 0
        """
  list = findAll(sql)
  print("번호\t이름\t이메일\t비밀번호\t성별\t회원등록일")
  print("-"*80)
  for row in list:
    print(f"{args.no}\t{args.name}\t{args.eamil}\t{args.pwd}\t{args.gender}\t{args.regDate}")
    
def userAdd(args):
  sql = f"""
        insert into team3.user
          (`name`, `email`, `pwd`, `gender`)
        value
          ('{args.name}', '{args.email}', '{args.pwd}', '{args.gender}')
        """
  save(sql)
  userList(None)

def userDetail(args):
  sql = f"select * FROM team3.user where `no` = {args.no}"
  row = findOne(sql)
  print("="*30)
  print(f"회원정보 | 회원정보 내역")
  print("-"*30)
  print(f"회원번호 | {row["no"]}")
  print(f"회원이름 | {row["name"]}")
  print(f" 이메일  | {row["email"]}")
  print(f"비밀번호 | {row["pwd"]}")
  if row["gender"] == 0: print(f"회원성별 | 여성")
  else: print(f"회원성별 | 남성")
  if row["delYn"] == 0: print(f"탈퇴여부 | 회원")
  else: print(f"탈퇴여부 | 탈퇴")
  print(f"가입일자 | {row["regDate"]}")
  print(f"수정일자 | {row["modDate"]}")
  print("="*30)

def userEdit(args):
  pass

def userDelete(args):
  pass

def boardList(args):
  pass

def boardDetail(args):
  sql = f"select b.*, u.`name` FROM team3.board AS b INNER JOIN team3.user AS u on(b.`user_no` = u.`no`) WHERE b.`no` = {args.no}"
  row = findOne(sql)
  print("="*30)
  print(f"게시판 정보 | 게시판 내용")
  print("-"*30)
  print(f"게시판 번호 | {row["no"]}")
  print(f"게시판 제목 | {row["name"]}")
  print(f"작성자 이름 | {row["email"]}")
  print(f"게시판 내용 | {row["name"]}")
  print(f"비밀번호 | {row["pwd"]}")
  if row["delYn"] == 0: print(f"삭제 여부 | 미삭제")
  else: print(f"삭제 여부 | 삭제")
  print(f" 등록일자  | {row["regDate"]}")
  print(f" 수정일자  | {row["modDate"]}")
  print("="*30)

def boardAdd(args):
  pass

def boardEdit(args):
  pass

def boardDelete(args):
  pass