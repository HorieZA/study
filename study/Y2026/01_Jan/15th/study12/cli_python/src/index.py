print("파이썬")

import argparse
from cmd import add, list

parser = argparse.ArgumentParser(description="CLI 프로그램")
subparser = parser.add_subparsers(dest="command")

# 터미널등에서 불러올 항목에 관련된 이름을 선언해주는 부분
add_parser = subparser.add_parser("add", help="메모 추가")

# 터미널등에서 항목의 이름을 선언해주는 부분
# add_parser.add_argument("content", help="메모 내용")
add_parser.add_argument("a", help="첫번째 값")
add_parser.add_argument("b", help="두번째 값")

# 불러올 항목에 관련된 이름을 선언 시 add_argument 이후에 선언 필요, 
# 안그러면 위의 add도 불러와서 오류남
add_parser = subparser.add_parser("list", help="목록 추가")

args = parser.parse_args()

if args.command == "add":
  add(args.a, args.b)
elif args.command == "list":
  list()