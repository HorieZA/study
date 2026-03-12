<img src="./images/openapi-0.png" width="300">

## (1) 개요

- **공식 명칭:** 공공데이터포털 ([https://www.data.go.kr](https://www.data.go.kr))
- **운영 기관:** 행정안전부 / 한국지능정보사회진흥원(NIA)
- **제공 형태:**

  * Open API (RESTful)
  * 파일 데이터 (CSV, XML, JSON 등)
  * 표준 데이터셋

## (2) Open API의 개념

> **Open API**란, 공공데이터를 HTTP 기반의 **API 엔드포인트**로 제공하여 개발자가 애플리케이션에서 직접 호출할 수 있도록 한 것입니다.

- 일반적으로 **REST API** 형식을 따릅니다.
- 요청(Request) 시 **Service Key(인증키)**를 헤더나 URL 파라미터에 포함해야 합니다.
- 응답(Response)은 **XML** 또는 **JSON** 형태로 받을 수 있습니다.

## (3) 기본 구조

> 예시: 전국 약국 정보 조회 API

```bash
GET https://apis.data.go.kr/B551182/pharmacyInfoService/getParmacyBasisList
    ?serviceKey=인증키
    &pageNo=1
    &numOfRows=10
    &sidoCd=11
    &sgguCd=110019
    &emdongNm=역삼동
    &_type=json
```

### 주요 파라미터

| `파라미터` | `설명` | `예시` |
| :---: | :---: | :---: |
| serviceKey | 공공데이터포털에서 발급받은 인증키 | `abcdef123456...` |
| pageNo | 페이지 번호 | 1 |
| numOfRows | 한 페이지 결과 수 | 10 |
| _type | 응답 포맷 | json / xml |

### 응답 예시 (JSON)

```json
{
  "response": {
    "header": {
      "resultCode": "00",
      "resultMsg": "NORMAL SERVICE."
    },
    "body": {
      "items": [
        {
          "yadmNm": "중앙약국",
          "addr": "서울특별시 강남구 역삼동 123-45",
          "telno": "02-123-4567"
        }
      ],
      "totalCount": 1023
    }
  }
}
```

## (4) 인증키 발급 절차

1. **회원가입 및 로그인** → [https://www.data.go.kr](https://www.data.go.kr)
2. **데이터셋 검색** (예: “약국 정보”, “기상청 단기예보”, “도로교통공단 교통사고” 등)
3. **활용신청** → “Open API 신청” 버튼 클릭
4. **승인 후 인증키 발급**
   → 마이페이지 > “활용신청 목록”에서 확인 가능
5. 인증키는 **개인용 / 기관용 / 서비스 구분**에 따라 여러 개 발급 가능

## (5) 활용 예시

### ▶ 프론트엔드 (React.js)

```javascript
fetch(
  `https://apis.data.go.kr/B551182/pharmacyInfoService/getParmacyBasisList?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&_type=json`
)
  .then(res => res.json())
  .then(data => console.log(data.response.body.items));
```

### ▶ 백엔드 (Spring Boot)

```java
@RestController
public class PharmacyController {

    @Value("${openapi.service.key}")
    private String serviceKey;

    @GetMapping("/api/pharmacy")
    public ResponseEntity<String> getPharmacyList() {
        String url = "https://apis.data.go.kr/B551182/pharmacyInfoService/getParmacyBasisList"
                   + "?serviceKey=" + serviceKey
                   + "&pageNo=1&numOfRows=10&_type=json";

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        return ResponseEntity.ok(response);
    }
}
```

## (6) 데이터 유형별 대표 기관 예시

| `분야` | `제공 기관` | `예시 API` |
| :---: | :---: | :---: |
| 교통 | 도로교통공단 | 교통사고 현황 API |
| 기상 | 기상청 | 단기예보, 중기예보, 생활기상지수 |
| 보건 | 건강보험심사평가원 | 병원/약국 정보 |
| 환경 | 환경부 | 대기오염 정보 |
| 농업 | 농림축산식품부 | 농산물 가격 동향 |
| 공공시설 | 행정안전부 | 전국 공공기관 위치 정보 |

## (7) 주의사항

- API별 **일일 호출 제한량**이 있습니다. (예: 10,000건/일)
- 일부 API는 **승인 대기 기간(1~3일)**이 있습니다.
- 서비스키는 노출 시 악용될 수 있으므로 **백엔드에서 관리**하는 것이 안전합니다.
- 응답 속도가 느린 경우가 많으므로 **캐싱**을 고려하는 것이 좋습니다.

## (8) 추가 참고

- **공공데이터포털 공식 문서:** [https://www.data.go.kr](https://www.data.go.kr)
- **Open API 가이드북:** [https://www.data.go.kr/bbs/dataset/notice/noticeDetailView.do?bbsId=NOTICE&boardSeq=345](https://www.data.go.kr/bbs/dataset/notice/noticeDetailView.do?bbsId=NOTICE&boardSeq=345)
