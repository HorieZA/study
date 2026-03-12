import json
import os

FILE_PATH = "./data/storage.json"

def empty():
  print("함수 정의가 되어 있지 않습니다.")

def getData():
  if not os.path.exists(FILE_PATH):
    result = { "t3_storage": [] }
    f = open(FILE_PATH, "w", encoding="utf-8")
    json.dump(result, f, ensure_ascii=False)
    f.close()
  else :
    f = open(FILE_PATH, "r", encoding="utf-8")
    result = json.load(f)
    f.close()
  return result

def setData(data):
  if not os.path.exists(FILE_PATH):
    pass
  else :  
    f = open(FILE_PATH, "w", encoding="utf-8")
    json.dump(data, f, ensure_ascii=False)
    f.close()
  list(None)

#시작

def list(args):
	data = getData()
	line1 = "=" * 50
	line2 = "=" * 50
	print(line1)
	print(f"번호\t\t\t내용")
	if len(data["t3_storage"]) > 0:
		for i in range(len(data["t3_storage"])):
			if i < len(data["t3_storage"]): print(line2)
			print(f"{data["t3_storage"][i]["key"]}\t{data["t3_storage"][i]["text"]}")
		print(line1)
	else:
		print(line2)
		print("데이터가 없습니다.")
		print(line1)

def insert(args) :
	data = getData()
	text = args.text
	key = (max((text["key"] for text in data["t3_storage"]), default=0) + 1)
	row = {"key" : key, "text" : text}
	data["t3_storage"].append(row)
	setData(data)

def update(args):
	key = args.key
	text = args.text
	data = getData()
	for i in range(len(data["t3_storage"])):
		if data["t3_storage"][i]["key"] == int(key):
			data["t3_storage"][i]["text"] = text
			break
	setData(data)

def remove(args):
	key = args.key
	data = getData()
	for i in range(len(data["t3_storage"])) :
		if data["t3_storage"][i]["key"] == int(key):
			del data["t3_storage"][i]
			break
	setData(data)
