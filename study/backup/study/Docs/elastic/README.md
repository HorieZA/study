<img src="./images/elastic-0.svg" width="200">

## (1) Elasticsearch란?

| `항목` | `설명` |
| :---: | :---: |
| 종류 | 분산형 NoSQL 검색/분석 엔진 |
| 주된 역할 | 빠른 검색, 로그 분석, 모니터링, 추천 시스템 |
| 데이터 구조 | JSON 문서 기반 |
| 사용 분야 | 로그 수집(ELK), 상품 검색, IoT 모니터링 등 |

> `왜 빠를까?`
- 역색인(Inverted Index) 구조 사용
  → 단어 중심으로 색인해서 검색할 때 탐색이 매우 빠름
  (예: 책 페이지를 다 넘기는 대신 “용어집”을 바로 찾는 방식)

--- 

<img src="./images/elastic-1.png" width="600">

## (2) 기본 개념

| `용어` | `기존 DB와 비교` | `설명` | `비유` |
| :---: | :---: | :---: | :---: |
| Cluster | DBMS | Elasticsearch 전체 시스템 | 도서관 전체 |
| Node | Server | 클러스터에 속한 서버 | 도서관 지점 |
| Index | Database/Table | 문서 집합 | 책 종류(예: 소설 코너) |
| Document | Row | 검색되는 실제 데이터(JSON) | 한 권의 책 |
| Field | Column | 문서 속 키-값 | 책 속의 챕터 |

> 추가 구조
* Shard: 인덱스를 분산 저장 (수평 확장)
* Replica: 고가용성 / 검색 성능 향상

<img src="./images/elastic-2.png" width="600">

## (3) 분석(`Analyzing`) & 역색인(`Inverted Index`)

| `단계` | `과정` |
| :---: | :---: |
| 1. 분석 (Tokenizer, Filter) | 텍스트 → 단어(토큰) 분해, 소문자화, 형태소 분석 |
| 2. 색인 | 단어 중심 구조로 저장 (= 역색인) |
| 3. 검색 | 단어 기반으로 매우 빠르게 매칭 |

> 예시
```python
"안녕하세요 엘라스틱서치입니다"
→ ["안녕하세요", "엘라스틱서치", "입니다"]
```

## (4) 주요 API 표

> Index(인덱스) 관련 API

| `구분` | `HTTP` | `Endpoint` | `설명` | `예시` |
| :---: | :---: | :---: | :---: | :---: |
| 인덱스 생성 | PUT | /{index} | 빈 인덱스 생성 | `PUT my-index` |
| 인덱스 삭제 | DELETE | /{index} | 인덱스 삭제 | `DELETE my-index` |
| 인덱스 확인 | GET | /{index} | 존재 여부 및 설정 확인 | `GET my-index` |
| 인덱스 목록 조회 | GET | /_cat/indices | 전체 인덱스 리스트 | `GET _cat/indices?v` |
| 인덱스 설정 변경 | PUT | /{index}/_settings | 동적 설정 수정 | `PUT my-index/_settings` |
| 인덱스 매핑 조회 | GET | /{index}/_mapping | 필드 매핑 확인 | `GET my-index/_mapping` |
| 인덱스 매핑 설정 | PUT | /{index}/_mapping | 매핑 추가/수정 | `PUT my-index/_mapping` |

> Document(문서) 관련 API

| `구분` | `HTTP` | `Endpoint` | `설명` | `예시` |
| :---: | :---: | :---: | :---: | :---: |
| 문서 생성 | POST | /{index}/_doc | ID 랜덤 생성 | `POST my-index/_doc` |
| 문서 저장(업서트) | PUT | /{index}/_doc/{id} | 동일 ID 덮어쓰기 | `PUT my-index/_doc/1` |
| 문서 조회 | GET | /{index}/_doc/{id} | 단건 조회 | `GET my-index/_doc/1` |
| 문서 삭제 | DELETE | /{index}/_doc/{id} | 단건 삭제 | `DELETE my-index/_doc/1` |
| 문서 수정(Update) | POST | /{index}/_update/{id} | 특정 필드만 변경 | `POST my-index/_update/1` |
| Bulk 처리 | POST | /_bulk | 대량 처리 | `POST _bulk` |
| Multi Get | GET/POST | /_mget | 여러 문서 조회 | `POST _mget` |

- `_doc` 는 최신 버전에서 권장하는 type 이름 (ES 7.x 이상 → Types 제거됨)

> Analyze(분석) 관련 API

| 구분 | HTTP | Endpoint | 설명 |
| :---: | :---: | :---: | :---: |
| 텍스트 분석 결과 확인 | GET/POST | /_analyze | Analyzer Tokenizer 테스트 |
| 인덱스 기준 분석 | GET/POST | /{index}/_analyze | 인덱스 설정 적용 분석 |

- 예시
```bash
POST _analyze
{
  "analyzer": "standard",
  "text": "Elasticsearch 분석!"
}
```

> Aggregation 관련 API

| Endpoint | 설명 |
| :---: | :---: |
| /{index}/_search | 검색과 함께 집계 실행 |

- Aggregation 예시
```bash
GET product-index/_search
{
  "size": 0,
  "aggs": {
    "avg_price": { "avg": { "field": "price" } }
  }
}
```

> 스크롤 / 페이징 API

| 구분 | HTTP | Endpoint | 설명 |
| :---: | :---: | :---: | :---: |
| 검색 스크롤 생성 | GET/POST | /{index}/_search?scroll | 대량 데이터 페이징 |
| 스크롤 계속 조회 | GET/POST | /_search/scroll | 이후 페이지 조회 |
| 스크롤 종료 | DELETE | /_search/scroll | 자원 회수 |

---

> CRUD 실습

- Index 생성
```bash
PUT my-first-index
```

- 문서 저장
```bash
POST my-first-index/_doc/1
{
  "title": "Elasticsearch 시작",
  "views": 10
}
```

- 검색
```bash
GET my-first-index/_search
```

- 삭제
```bash
DELETE my-first-index/_doc/1
```

---

## (5) 검색 기능의 핵심 — Query DSL

| `종류` | `설명` | `예제` |
| :---: | :---: | :---: |
| Match Query | 분석기 사용한 텍스트 검색 | 상품명 검색 |
| Term Query | 정확 일치 검색 | 상태값, 태그 |
| Bool Query | AND/OR/NOT 조합 | 다중 조건 |
| Aggregation | 통계 분석 | 합계, 평균, 그룹화 |

> `Match Query` 예시
```bash
GET product-index/_search
{
  "query": {
    "match": { "name": "아이폰" }
  }
}
```

## 6️(6) 구조 설계 — Mapping & Type

| `타입` | `설명` | `예` |
| :---: | :---: | :---: |
| text | 분석 적용 → 풀텍스트 검색용 | 상품명, 설명 |
| keyword | 분석 미적용 → 정렬/필터 | 카테고리, ID |
| numeric/date | 정렬/범위 조건용 | 가격, 등록일 |

> Mapping 예시:
```bash
PUT product-index
{
  "mappings": {
    "properties": {
      "name": { "type": "text" },
      "category": { "type": "keyword" },
      "price": { "type": "integer" }
    }
  }
}
```

<img src="./images/elastic-6.png" width="500">

## (7) 확장성과 고가용성 — Shard & Replica

| `기능` | `효과` |
| :---: | :---: |
| Primary Shard | 데이터 분산 저장 |
| Replica Shard | 장애 대비 + 검색 성능 증가 |

> 실습 예시
```bash
PUT logs-index
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1
  }
}
```

<img src="./images/elastic-7.png" width="600">

## (8) Log 분석 — ELK/Elastic Stack

| `구성요소` | `역할` |
| :---: | :---: |
| Beats | 경량 데이터 수집기 |
| Logstash | 로그 정제/변환 파이프라인 |
| Kibana | 시각화/대시보드 |

<img src="./images/elastic-8.png" width="600">