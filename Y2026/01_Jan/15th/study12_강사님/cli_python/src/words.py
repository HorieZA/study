import json

FILE_PATH = "./data/memo.json"

def getData():
  f = open(FILE_PATH, "r", encoding="utf-8")
  result = json.load(f)
  f.close()
  return result

def setData(data):
  f = open(FILE_PATH, "w", encoding="utf-8")
  json.dump(data, f, ensure_ascii=False)
  f.close()
  list(0)

def empty(args):
  print("정의된 함수가 없습니다.")

def list(args):
  data = getData()
  line1 = "=" * 50
  line2 = "=" * 50
  print(line1)
  print(f"번호\t\t\t내용")
  if len(data["words"]) > 0:
     for i in range(len(data["words"])):
      if i < len(data["words"]): print(line2)
      print(f"{data["words"][i]["id"]}\t{data["words"][i]["word"]}")
  else:
    print("데이터가 없습니다.")
    print(line1)

def insert(args):
  word = args.word
  data = getData()
  id = (max((word["id"] for word in data["words"]), default = 0) +1)
  row = {"id": id, "word": word}
  data["words"].append(row)
  setData(data)

def update(args):
  data = getData()
  id = args.id
  word = args.word
  for i in range(len(data["words"])):
    if data["words"][i]["id"] == int(id):
      data["words"][i]["word"] = word
      break
  setData(data)

def remove(args):
  data = getData()
  id = args.id
  for i in range(len(data["words"])):
    if data["words"][i]["id"] == int(id):
      del data["words"][i]
      break
  setData(data)