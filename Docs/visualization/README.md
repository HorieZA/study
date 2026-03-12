## Data Visualization Tool

- [D3.js (Data-Driven Documents)](./d3_js.md) 알아보기
- [Plotly (Python)](./plotly.md) 알아보기

| 구분 | `D3.js` | `Plotly (Python)` |
| :---: | :---: | :---: |
| **언어 기반** | JavaScript | Python |
| **라이브러리 수준** | 저수준(Low-level) | 고수준(High-level) |
| **렌더링 방식** | DOM/SVG/Canvas 조작 | Plotly.js (JavaScript) 기반 WebGL 렌더링 |
| **주요 목적** | 완전한 커스터마이징, 비표준 시각화 | 인터랙티브 데이터 시각화, 대시보드용 |
| **대표 철학** | 데이터를 직접 DOM에 매핑 | “간결한 코드로 인터랙티브 차트” |

## (1) 작동 구조 비교

| 항목 | `D3.js` | `Plotly (Python)` |
| :---: | :---: | :---: |
| **기반 기술** | 순수 JS → 브라우저에서 SVG 조작 | Python 코드 → JSON 변환 → Plotly.js 렌더링 |
| **실행 환경** | 브라우저 내 (HTML/JS) | Jupyter Notebook, VSCode, Dash 앱 등 |
| **결과물 표시** | HTML/SVG 문서 내 | Notebook 내 HTML 렌더링 또는 웹페이지 내 div 삽입 |
| **인터랙션 처리** | 직접 JS 이벤트 구현 | Plotly.js가 자동 제공 (줌, 팬, 툴팁 등) |

## (2) 코드 예시 비교

> D3.js (JavaScript)

```html
<svg width="400" height="200"></svg>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script>
const data = [10, 20, 30, 40, 50];
const svg = d3.select("svg");
svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 60)
  .attr("y", d => 200 - d * 4)
  .attr("width", 50)
  .attr("height", d => d * 4)
  .attr("fill", "steelblue");
</script>
```

- **특징:**

    - 데이터와 DOM을 직접 연결 (`data()`, `enter()`, `append()`).
    - 완전히 커스터마이징 가능하지만 코드가 장황함.

> Plotly (Python)

```python
import plotly.express as px

data = {"x": ["A", "B", "C", "D", "E"], "y": [10, 20, 30, 40, 50]}
fig = px.bar(data, x="x", y="y", title="간단한 막대그래프")
fig.show()
```

- **특징:**

    - 몇 줄의 Python 코드로 인터랙티브 그래프 완성.
    - 자동으로 HTML/JS로 변환되어 렌더링.

## (3) 기능 및 인터랙션 비교

| 기능 | `D3.js` | `Plotly (Python)` |
| :---: | :---: | :---: |
| **줌 / 팬 / 툴팁** | 직접 코드로 구현 | 기본 제공 |
| **3D 그래프** | 직접 구현 필요 (어려움) | `plotly.graph_objects`로 지원 |
| **지도 시각화** | GeoJSON + D3.geo 직접 구현 | `px.scatter_mapbox`, `choropleth` 등 내장 |
| **애니메이션** | 전환(transition) 직접 구현 | `animation_frame` 파라미터로 간단 구현 |
| **대시보드 연동** | HTML/CSS/JS 기반 직접 구성 | `Dash` 프레임워크로 쉽게 구현 가능 |

## (4) 확장성 및 생태계

| 항목 | `D3.js` | `Plotly (Python)` |
| :---: | :---: | :---: |
| **언어 생태계** | 웹 프론트엔드 중심 (React, Vue 등) | 데이터 과학 생태계 중심 (Pandas, NumPy, Jupyter 등) |
| **대시보드 확장** | 직접 JS로 구현 | Dash, Streamlit 등과 연동 쉬움 |
| **출력 형식** | SVG, Canvas, HTML | HTML, PNG, PDF, JSON 등 |
| **성능 (대규모 데이터)** | SVG 기반 → 데이터 많으면 느림 | WebGL 기반 → 빠름 |
| **협업/공유** | 웹사이트에 직접 삽입 | 노트북, 웹 대시보드, HTML 파일로 쉽게 공유 |

## (5) 학습 곡선 비교

| 항목 | `D3.js` | `Plotly (Python)` |
| :---: | :---: | :---: |
| **학습 난이도** | 높음 (DOM, SVG, JS 개념 필수) | 낮음 (Python 데이터프레임 중심) |
| **생산성** | 낮음 (코드 많음) | 높음 (짧은 코드로 인터랙티브 시각화) |
| **커스터마이징** | 매우 자유로움 | 일정 한계 있음 (layout, trace 조정으로 가능) |

## (6) 어떤 상황에 어떤 도구가 좋은가?

| `상황` | `추천 도구` | `이유` |
| :---: | :---: | :---: |
| **데이터 과학/분석 결과 시각화** | **Plotly (Python)** | Jupyter, Pandas와 자연스럽게 통합 |
| **웹 기반 맞춤형 시각화** | **D3.js** | 프론트엔드 환경에서 정교한 제어 가능 |
| **대시보드 제작** | **Plotly + Dash** | Python만으로 웹 앱 구축 가능 |
| **데이터 아트, 복잡한 트리 구조, 네트워크 그래프** | **D3.js** | SVG 기반 비표준 시각화에 유리 |
| **간단한 분석용 시각화 (EDA)** | **Plotly Express** | 한 줄로 결과 시각화 가능 |
