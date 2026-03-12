<img src="./images/rss-0.png" width="200">

## (1) RSS란

- `RSS`는 “Really Simple Syndication” 또는 “Rich Site Summary”의 약자입니다.
- XML(eXtensible Markup Language) 기반으로 작성된 `데이터 피드(Feed)` 형식입니다.
- 웹사이트가 새로운 콘텐츠를 등록할 때마다 RSS 피드를 갱신하면, 사용자는 RSS 구독기를 통해 실시간으로 그 내용을 확인할 수 있습니다.

> RSS는 `웹 콘텐츠를 구독하는 기술` 입니다.

## (2) RSS의 구조

> RSS 피드는 기본적으로 XML 문서로 구성되며, 대표적인 구조는 다음과 같습니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>ChatGPT 기술 블로그</title>
    <link>https://tech.example.com</link>
    <description>AI와 소프트웨어 기술 관련 최신 글</description>
    <language>ko</language>

    <item>
      <title>OpenAPI란 무엇인가?</title>
      <link>https://tech.example.com/posts/openapi</link>
      <description>OpenAPI의 개념과 구조에 대해 알아봅니다.</description>
      <pubDate>Mon, 10 Nov 2025 10:00:00 +0900</pubDate>
    </item>

    <item>
      <title>Spring Cloud Gateway로 React 연동하기</title>
      <link>https://tech.example.com/posts/spring-cloud-gateway</link>
      <description>Gateway와 프론트엔드 연결 구조를 설명합니다.</description>
      <pubDate>Sun, 09 Nov 2025 09:00:00 +0900</pubDate>
    </item>
  </channel>
</rss>
```

### 주요 태그 설명

| `태그` | `설명` |
| :---: | :---: |
| `<rss>` | RSS 버전 명시 (주로 2.0 사용) |
| `<channel>` | RSS 전체 채널(피드) 정보를 담는 루트 요소 |
| `<title>` | 사이트나 채널의 이름 |
| `<link>` | 원본 사이트의 주소 |
| `<description>` | 피드의 요약 설명 |
| `<item>` | 실제 콘텐츠 항목 (기사, 블로그 글 등) |
| `<pubDate>` | 게시 일시 |

## (3) RSS 동작 원리

1. **RSS 피드 제공자(Producer)** — 웹사이트나 블로그는 콘텐츠를 XML 기반으로 자동 생성하여 `/rss` 또는 `/feed` 경로로 제공
2. **RSS 리더(Consumer)** — 사용자는 RSS 구독 도구를 통해 여러 피드를 한 번에 구독
3. **자동 갱신** — RSS 리더는 일정 주기로 피드를 새로 고침하여 최신 콘텐츠를 자동 수집

## (4) RSS의 장점

| `항목` | `설명` |
| :---: | :---: |
| **자동화된 구독** | 여러 사이트를 방문하지 않아도 새 글을 자동으로 받아볼 수 있음 |
| **표준화된 데이터** | XML 구조 덕분에 어떤 서비스에서도 동일한 형식으로 처리 가능 |
| **빠른 정보 수집** | 실시간 뉴스나 공공데이터 알림에 유용 |
| **API 없이도 활용 가능** | 단순한 URL 요청으로 데이터 수집 가능 |

## (5) RSS의 활용 예시

1. **뉴스 포털** – 연합뉴스, BBC, CNN 등에서 최신 뉴스 피드 제공
2. **블로그 플랫폼** – WordPress, Tistory, Medium 등에서 자동 생성 RSS
3. **공공데이터 포털** – 특정 주제(예: 날씨, 정책 공고)의 변경 사항을 RSS로 배포
4. **개발용 크롤러** – Python, Java 등으로 RSS를 주기적으로 파싱해 데이터 자동 수집

## (6) RSS와 Atom의 차이

| `구분` | `RSS` | `Atom` |
| :---: | :---: | :---: |
| 표준화 주체 | 다양한 비공식 버전 존재 (2.0이 사실상 표준) | IETF 공식 표준 (RFC 4287) |
| 포맷 | XML | XML |
| 확장성 | 낮음 | 높음 |
| 사용성 | 여전히 널리 사용됨 | 기술적으로 우수하지만 사용률 낮음 |

## (7) RSS 관련 실무 활용

* **Spring Boot + RSS**
  → Spring MVC에서 `@RestController`로 XML 응답을 구성하여 RSS 피드 API 제공 가능.
* **React.js 프론트엔드**
  → RSS 데이터를 JSON으로 변환한 뒤 렌더링 가능.
* **공공데이터 연계**
  → 공공데이터포털의 RSS 피드를 자동 구독하여 행정 공지사항이나 정책 업데이트 모니터링 가능.

## (8) RSS 피드로 `기상청 날씨`를 수집

[<img src="./images/rss-1.png" width="700">](https://www.weather.go.kr/w/pop/rss-guide.do)
- [1개월전망 RSS정의](https://www.weather.go.kr/w/resources/pdf/onemonth_forecast_v1.pdf) 접속
- [3개월전망 RSS정의](https://www.weather.go.kr/w/resources/pdf/threemonth_forecast_v1.pdf) 접속
- [2025년 11월 데이터](https://www.kma.go.kr/repositary/xml/fct/mon/img/fct_mon1rss_108_20251106.xml) 접속

> 필요한 라이브러리 설치

```bash
pip install requests beautifulsoup4 
```

> Python 코드 예제

```python
import requests
from bs4 import BeautifulSoup
import pandas as pd
import json

# 기상청 1개월 예보 RSS(XML) URL
url = "https://www.kma.go.kr/repositary/xml/fct/mon/img/fct_mon1rss_108_20251106.xml"

# XML 데이터 요청
response = requests.get(url)
response.encoding = "utf-8"
print("response =", response)
print("response.text =", response.text)

if response.status_code != 200:
    raise Exception(f"요청 실패: {response.status_code}")

# BeautifulSoup으로 XML 파싱
soup = BeautifulSoup(response.text, "xml")
print("soup = ", soup)
```
