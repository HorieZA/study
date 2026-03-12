<img src="./images/beautifulsoup-0.png" width="200">

## (1) BeautifulSoup란

> **BeautifulSoup**은 HTML과 XML 문서를 **파싱(parse)**하여,
문서 구조를 **트리 형태로 변환**해주고 그 안에서 데이터를 **쉽게 탐색, 추출, 수정**할 수 있게 해주는 **파이썬 라이브러리**입니다.

- 공식 이름: `beautifulsoup4` (줄여서 `bs4`)
- 주요 역할: HTML/XML 문서를 **구조적으로 접근**하고, **데이터를 추출**하는 데 도움을 줌
- 일반적으로 `requests` 모듈과 함께 사용됩니다.

## (2) 설치 방법

```bash
pip install beautifulsoup4
pip install lxml  # 선택적으로 더 빠른 파서 사용 가능
```

## (3) 기본 사용 예제

```python
from bs4 import BeautifulSoup
import requests

# 1. 웹 페이지 가져오기
url = 'https://example.com'
response = requests.get(url)

# 2. BeautifulSoup 객체 생성
soup = BeautifulSoup(response.text, 'lxml')

# 3. HTML 구조 탐색
print(soup.title)          # <title>Example Domain</title>
print(soup.title.text)     # Example Domain
print(soup.find('h1'))     # <h1>Example Domain</h1>
print(soup.find('h1').text) # Example Domain
```

## (4) 주요 메서드 정리

| `메서드`| `설명` | `예시 |
| :---: | :---: | :---: |
| `find(tag_name, attrs={})` | 조건에 맞는 **첫 번째** 태그 찾기 | `soup.find('div', class_='content')` |
| `find_all(tag_name, attrs={})` | 조건에 맞는 **모든 태그** 리스트 반환 | `soup.find_all('a')` |
| `select(css_selector)` | **CSS 선택자**로 탐색 | `soup.select('div.article > h2')` |
| `select_one(css_selector)` | CSS 선택자로 **첫 번째 요소** 반환 | `soup.select_one('#main > p')` |
| `get_text(strip=True)` | 태그 내부의 **텍스트만 추출** | `element.get_text(strip=True)` |
| `get(attr_name)` | 속성 값 가져오기 | `link.get('href')` |

## (5) 탐색 방식 (Navigating the tree)

> BeautifulSoup은 HTML 문서를 **트리 구조**로 파싱하므로, 노드 간 탐색이 가능합니다.

```python
soup = BeautifulSoup(html, 'html.parser')
div = soup.find('div')

div.parent        # 부모 태그
div.children      # 자식 태그들 (generator)
div.next_sibling  # 다음 형제 태그
div.previous_sibling  # 이전 형제 태그
```

## (6) 실전 예제 — 뉴스 기사 제목 스크래핑

```python
from bs4 import BeautifulSoup
import requests

url = 'https://news.naver.com/'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'lxml')

# 모든 뉴스 제목 가져오기
titles = soup.select('a[href*="read.naver"]')

for t in titles:
    print(t.get_text(strip=True))
```

## (7) BeautifulSoup의 파서(parser) 종류

| `파서` | `특징` | `설치 필요 여부` |
| :---: | :---: | :---: |
| `html.parser` | 기본 내장 파서, 속도는 느림 | ❌ |
| `lxml` | 매우 빠르고 안정적 | ⭕ (`pip install lxml`) |
| `html5lib` | HTML5 표준 파싱, 가장 관대함 | ⭕ (`pip install html5lib`) |

> 예시:

```python
BeautifulSoup(html, 'html.parser')
BeautifulSoup(html, 'lxml')
BeautifulSoup(html, 'html5lib')
```

## (8) BeautifulSoup과 함께 자주 쓰는 라이브러리

| `라이브러리` | `역할` |
| :---: | :---: |
| `requests` | 웹 페이지 요청 (HTTP GET/POST) |
| `selenium` | 자바스크립트 렌더링된 페이지 크롤링 |
| `pandas` | 추출한 데이터를 표 형태로 정리 |
| `re` | 정규 표현식 기반 텍스트 필터링 |

## (9) 주의할 점

1. **robots.txt**를 확인하여 해당 사이트의 크롤링 정책을 준수해야 합니다.
2. 과도한 요청은 **서버에 부하**를 줄 수 있으므로, `time.sleep()`을 통해 딜레이를 두는 것이 좋습니다.
3. 자바스크립트로 동적으로 로드되는 데이터는 BeautifulSoup만으로는 접근이 어려워, **Selenium**이나 **API 요청 분석**이 필요할 수 있습니다.

## (10) 간단한 실습 예시

```python
from bs4 import BeautifulSoup

html = """
<html>
  <body>
    <div class="info">
      <h1 id="title">BeautifulSoup Tutorial</h1>
      <p class="description">웹 스크래핑을 위한 라이브러리입니다.</p>
      <a href="https://example.com">Example</a>
    </div>
  </body>
</html>
"""

soup = BeautifulSoup(html, 'html.parser')

title = soup.find('h1', id='title').get_text()
desc = soup.find('p', class_='description').get_text()
link = soup.find('a')['href']

print(title)  # BeautifulSoup Tutorial
print(desc)   # 웹 스크래핑을 위한 라이브러리입니다.
print(link)   # https://example.com
```
