import argparse

from words import list, insert, update, remove, empty

DESC = "CLI Program"
commands = [
  {"command": None, "arguments": [], "method" : empty},
  {"command": "v", "arguments": [], "method" : list},
  {"command": "a", "arguments": ["word"], "method" : insert},
  {"command": "u", "arguments": ["id", "word"], "method" : update},
  {"command": "d", "arguments": ["id"], "method" : remove}
]

parser = argparse.ArgumentParser(description=DESC)
subparsers = parser.add_subparsers(dest="command")

for cmd in commands:
  add_parser = subparsers.add_parser(cmd["command"])
  for arg in cmd["arguments"]:
    add_parser.add_argument(arg)

args = parser.parse_args()
for cmd in commands:
  if args.command == cmd["command"]:
    if cmd["method"] == None:
      pass
    else:
      cmd["method"](args)
    break