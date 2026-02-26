a = 1
b = "아룡하세요"
c = True
d = None

print(a, type(a))
print(b, type(b))
print(c, type(c))
print(d, type(d))
print("()", type(()))
print({}, type({}))
print([], type([]))
print(f'{a}', type(f'{a}'))

def fn1() : 
  k=1
  print(f'{k}+냠')

fn1()

class Aclass:
  def _init_(self):
    pass
  def add(self, a ,b):
    return a + b

ac = Aclass()
print(ac.add(2,5))



if 5 > 1: 
  print("5가 크다")
  print("5가 크다")
  print("5가 크다")
elif 5 < 1: 
  pass
else:
  pass

# 반복 안되는 방법
for i in ():
  print(i)

for i in "":
  print(i)

for i in []:
  print(i)

for i in range(0):
  print(i)

# False는 불가
# TypeError: 'bool' object is not iterable
# for i in False:
#   print(i)

for i in "":
  # 값
  print(i)

arr = [1,2,3,4,5]
for i in range(len(arr)): # 인덱스, 값
  print(f'인덱스 : {i}', f'값 : {arr[i]}', sep=", ")

arr = [[1,2],[1],[2],[1,2,3]]
# 값만 구하는 방법
for y in arr: # 값
  for x in y: # 값
    print(x)

# 인덱스와 값 구하는 방법
for y in range(len(arr)): # 인덱스
  for x in range(len(arr[y])): # 인덱스, 값
    print(y, x, arr[y][x])

# 응용
arr1 = [[[1,2],[1],[2],[1,2,3]],[[1,2],[1],[2],[1,2,3]]]
for z in range(len(arr1)): # 인덱스
  for y in range(len(arr1[z])):
    for x in range(len(arr1[z][y])):
      print(z, y, x, arr1[z][y][x])

# 응용
arr = [
  [[[1,2],[1],[2],[1,2,3]],[[1,2,4],[1,5],[2,4],[1,2,3]]],
  [[[1,2,6],[1],[2],[1,2,3,4]],[[1,2,1,2],[1],[2,3,4],[1,2,3,5,6,7]]]
]
for z in range(len(arr)): # 인덱스
  for y in range(len(arr[z])):
    for x in range(len(arr[z][y])):
      for w in range(len(arr[z][y][x])):
        print(z, y, x, w, arr[z][y][x][w])


# 인덱싱
문자열 = "나는 한국인일까?"
print(문자열[3])
print(문자열[-3])

# 슬라이싱
# [시작번호:끝번호]
print(문자열[3:5])
print(문자열[:]) # 모두 불러온다 print(문자열)과 동일
print(문자열[:3]) # [:끝번호]
print(문자열[:1]+'는'+문자열[2:]) # 응용

arr2 = {}
arr3 = dict() # 형변환 함수 
#js 에서 const arr3 = new Object() 선언한 것과는 다름
print(type(arr2), type(arr3))

# 응용
arr2 = []
arr3 = list()
print(type(arr2), type(arr3))

arr2 = ()
arr3 = tuple()
print(type(arr2), type(arr3))

print(10 == "10")      # 거짓
print(10 == int("10")) # 참

# 이것은 가능함
obj = {}
obj["key"] = 10
print(obj, type(obj))

# 0이 없어서 인덱스가 없다고 에러발생 
# => list assignment index out of range
# arr4 = []

# 빈값인 경우 실행이 불가능하여 
# '0' 까지 입력해야 오류가 발생하지 않음
arr4 = [0]
arr4[0] = 10
print(arr4, type(arr4))

t = (1)
print(t, type(t))

# 값이 2개가 선언되면 'tuple'(튜플)로 변경
t = (1,2)
print(t, type(t))

# 'tuple'(튜플)은 리스트 처럼 사용이 가능하나 리스트처럼 변경은 불가
# 'tuple' object does not support item assignment
# t = (1,2)
# t[0] = 10
# print(t, type(t))

# 'tuple'(튜플)을 리스트 처럼 사용하기위해서는 
# 튜플을 리스트로 변경 후 변경된 리스트를 튜플로 바꿔야함
t = (1,2)
print(t, type(t))
arr = list(t)
arr.append(10)
print(arr, type(arr))
t = tuple(arr)
print(t, type(t))

arr.append(20)
arr2 = set(t)
arr3 = set(arr)
print(arr2, type(arr2))
print(arr3, type(arr3))
print(arr2 | arr3) # 합치면서 중복 값 제거 (집합)

# 문제1 다음 문자열의 값을 배열에 순서대로 넣으시오, 단 배열 사용시 함수를 사용하시오.
문자열 = "동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세"

# > 출력 결과
# ["동해","물과","백두산이","마르고","닳도록","하느님이","보우하사","우리나라","만세"]
print("split() 함수 사용")
print(문자열.split())

print('"" 추가')
변경 = 문자열.split()
수정 = str()
for i in range(len(변경)):
  # i 만큼 돌려서 변겸이란 변수의 마지막 값과 동일하면 ',' 없이 등록
  if (변경[i] == 변경[-1]) : 수정 += f'"{변경[i]}"'
  else: 수정 += f'"{변경[i]}", '
print(수정)

# 문제2 다음 문자열의 값에서 특정 문자의 인덱스를 찾으시오, 단 반복문를 이용하시오.
문자열 = "남산 위의 저 소나무 철갑을 두른 듯 바람 서리 불변함은 우리 기상일세"
찾을문자열 = "바람"

print("find() 함수 사용")
print(f'"{찾을문자열[0]}"', 문자열.find(찾을문자열[0]))
print(f'"{찾을문자열[1]}"', 문자열.find(찾을문자열[1]))

print("index() 함수 사용")
arr = list(문자열)
print(f'"{찾을문자열[0]}"', arr.index(찾을문자열[0]))
print(f'"{찾을문자열[1]}"', arr.index(찾을문자열[1]))

# > 출력 결과
# "바", 21
# "람", 22

for i in range(len(문자열)): 
  if (문자열[i] == 찾을문자열[0]): 
    print(f'"{찾을문자열[0]}"', i)
  elif (문자열[i] == 찾을문자열[1]): 
    print(f'"{찾을문자열[1]}"', i)
  else: pass