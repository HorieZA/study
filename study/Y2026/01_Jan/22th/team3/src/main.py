import argparse
from method import empty, select, info, insert, update, delno, delyes

DESC = "CLI Program + DB Connect"
commands = [
  {"command":"list", "arguments": [], "method": select},
  {"command":"info", "arguments": ["no"], "method": info},
  {"command":"add", "arguments": ["name", "email", "password", "gender"], "method": insert},
  {"command":"edit", "arguments": ["no", "name", "email", "password", "gender"], "method": update},
  {"command":"reup", "arguments": ["no", "delYn"], "method": delno},
  {"command":"del", "arguments": ["no"], "method": delyes}
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