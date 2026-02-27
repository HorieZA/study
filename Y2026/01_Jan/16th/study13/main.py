import argparse

def 목록(s):
  print("호출 완료")

def 입력(a):
  print(f"입력 : {a}")

DESC = "CLI Program"
commands = [
  {"command": "v", "arguments": [], "method" : 목록},
  {"command": "a", "arguments": ["t"], "method" : 입력},
  {"command": "u", "arguments": ["k", "t"], "method" : None},
  {"command": "d", "arguments": ["k"], "method" : None}
]

parser = argparse.ArgumentParser(DESC)
subparsers = parser.add_subparsers(dest="command")

for cmd in commands:
  add_parser = subparsers.add_parser(cmd["command"])
  for arg in cmd["arguments"]:
    add_parser.add_argument(arg)

args = parser.parse_args()
for cmd in commands:
  if args.command == cmd["command"]:
    if cmd["method"] == None:
      print("정의되어 있지 않습니다.")
    else:
      cmd["method"](args)
      break