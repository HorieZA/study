import argparse
from method import empty, list, insert, update, remove

DESC = "CLI Program"
commands = [
  {"command":"t3_search", "arguments": [], "method": list},
  {"command":"t3_add", "arguments": ["text"], "method": insert},
  {"command":"t3_write", "arguments": ["key", "text"], "method": update},
  {"command":"t3_delete", "arguments": ["key"], "method": remove}
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