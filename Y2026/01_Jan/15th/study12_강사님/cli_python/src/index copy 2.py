import argparse

from words import list, insert, update, remove

parser = argparse.ArgumentParser(description="CLI프로그램")
subparsers = parser.add_subparsers(dest="command")

add_parser = subparsers.add_parser("list")
add_parser = subparsers.add_parser("insert")
add_parser.add_argument("word")
add_parser = subparsers.add_parser("update")
add_parser.add_argument("id")
add_parser.add_argument("word")
add_parser = subparsers.add_parser("delete")
add_parser.add_argument("id")

args = parser.parse_args()

if args.command == "list": list()
if args.command == "insert": insert(args.word)
if args.command == "update": update(args.id, args.word)
if args.command == "delete": remove(args.id)