import argparse
from method import empty, userList, userDetail, userAdd, userEdit, userDelete, boardList, boardDetail, boardAdd, boardEdit, boardDelete

DESC = "CLI Program"
commands = [
  {"command":"empty", "arguments": [], "method": empty},
  {"command":"userList", "arguments": [], "method": userList},
  {"command":"userDetail", "arguments": ["no"], "method": userDetail},
  {"command":"userAdd", "arguments": ["name","email","pwd","gender"], "method": userAdd},
  {"command":"userEdit", "arguments": ["no","name","email","pwd","gender"], "method": userEdit},
  {"command":"userDelete", "arguments": ["no","delYn"], "method": userDelete},
  {"command":"boardList", "arguments": [], "method": boardList},
  {"command":"boardDetail", "arguments": ["no"], "method": boardDetail},
  {"command":"boardAdd", "arguments": ["title","content",], "method": boardAdd},
  {"command":"boardEdit", "arguments": ["no","title","cont", "user_no"], "method": boardEdit},
  {"command":"boardDelete", "arguments": ["no","delYn"], "method": boardDelete}
]

def checkCLI(args):
  for cmd in commands:
    if args.command == cmd["command"]:
      if cmd["method"] == None:
        empty()
      else:
        cmd["method"](args)
      break
  print("종료")

def run():
  parser = argparse.ArgumentParser(description=DESC)
  subparsers = parser.add_subparsers(dest="command")

  for cmd in commands:
    name = cmd["command"]
    arguments = cmd["arguments"]
    add_parser = subparsers.add_parser(name)
    for arg in arguments:
      add_parser.add_argument(arg)

  checkCLI(parser.parse_args())

if __name__ == "__main__":
  run()
