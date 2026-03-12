import requests
import pprint
import json

serviceKey = "9d78135a0fd9695bc9d1aeae8c21da3339dbd99e4285dc0f3a29407567dfb47f"

url = f'https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2?serviceKey={serviceKey}&pageNo=1&numOfRows=10&_type=json'
# url = f'https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2?serviceKey={serviceKey}&pageNo=1&numOfRows=1000&_type=json'

# 개인인증키에는 본인이 부여받은 인증키를 입력하면 된다

# 일반인증키 Encoding과 Decoding 두 가지가 주어지는데 보통은 두번째 인증키인 Decoding이 구동되는 것같다

# 하나씩 넣어보면 될 듯!

# 또한  총 1000개의 행을 출력하기 위해서 numOfRows=1000으로 입력했다

response = requests.get(url)
contents = response.text

## 보다 예쁘게 출력하기 위해..
##  indent는 들여쓴다는 의미
pp = pprint.PrettyPrinter(indent=4)
# print(pp.pprint(contents))

# 문자열 json파일로 변환
# 출력된 문자열을 json파일로 변환해주자
# 사진과 같이 데이터 타입이 dict 형태로 변환된 것을 볼 수 있다!

json_ob = json.loads(contents)
# print(json_ob)
# print(type(json_ob))
 

# 필요한 값만 가져오기
# 출력된 값을 자세히 살펴보면 response -> body -> body 속 items에 원하는 정보가 모두 포함된 것을 볼 수 있다

# items의 내용만 출력해보자
# items에 있는 내용들만 추출되었다 !

body = json_ob['response']['body']['items']
print(body)

