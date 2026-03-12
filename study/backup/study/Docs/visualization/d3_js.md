<img src="./images/d3-0.png" width="100">

## (1) D3.js란

> **D3.js (Data-Driven Documents)** 는 데이터를 기반으로 **HTML, SVG, CSS**를 조작하여 동적인 시각화를 만드는 자바스크립트 라이브러리입니다.

- 공식 사이트: [https://d3js.org](https://d3js.org)
- 제작자: Mike Bostock (전 New York Times 데이터 시각화 팀)

## (2) D3.js의 핵심 개념

> 1. **데이터 바인딩 (Data Binding)**

- D3는 데이터를 HTML/SVG 요소에 직접 **바인딩(binding)** 합니다.

```js
d3.select("body")
  .selectAll("p")
  .data([10, 20, 30])
  .enter()
  .append("p")
  .text(d => `값: ${d}`);
```

- → 데이터 `[10, 20, 30]`을 `<p>` 요소에 연결해 자동으로 3개의 `<p>` 태그 생성.

> 2. **DOM 선택과 조작 (Selections & Manipulation)**

- `d3.select()` 와 `d3.selectAll()`로 HTML/SVG 요소를 선택해 스타일이나 속성을 바꿀 수 있습니다.

```js
d3.select("svg")
  .append("circle")
  .attr("cx", 50)
  .attr("cy", 50)
  .attr("r", 40)
  .style("fill", "steelblue");
```

> 3. **스케일(Scale)**

- 데이터 값 범위를 픽셀 좌표 등 시각적 범위로 변환하는 함수입니다.

```js
const xScale = d3.scaleLinear()
  .domain([0, 100]) // 입력 범위
  .range([0, 500]); // 출력 범위

console.log(xScale(50)); // 250
```

> 4. **축(Axis)**

- 스케일을 기반으로 SVG에 눈금(axis)을 자동 생성합니다.

```js
const xAxis = d3.axisBottom(xScale);

d3.select("svg")
  .append("g")
  .attr("transform", "translate(0, 300)")
  .call(xAxis);
```

> 5. **트랜지션(Transition)**

- 부드러운 애니메이션 효과를 쉽게 적용할 수 있습니다.

```js
d3.selectAll("circle")
  .transition()
  .duration(1000)
  .attr("r", 80)
  .style("fill", "orange");
```

> 6. **데이터 변환과 레이아웃 (Layouts)**

- D3는 단순한 그래프뿐 아니라, 구조화된 데이터도 시각화할 수 있도록 다양한 레이아웃을 제공합니다.

| `레이아웃` | `설명` |
| :---: | :---: |
| `d3.pie()` | 원형 차트 |
| `d3.stack()` | 누적 막대 차트 |
| `d3.tree()` | 트리(계층형 데이터) |
| `d3.forceSimulation()` | 네트워크(Force-directed graph) |

## (3) 예시: 간단한 막대 그래프

```html
<svg width="500" height="300"></svg>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script>
  const data = [80, 120, 60, 150, 200];
  const svg = d3.select("svg");

  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 60)
    .attr("y", d => 300 - d)
    .attr("width", 50)
    .attr("height", d => d)
    .attr("fill", "teal");
</script>
```

## (4) D3.js의 장단점

> 장점

- 완전한 커스터마이징 가능 (모든 픽셀 제어)
- SVG, Canvas, HTML 모두 활용 가능
- 복잡한 인터랙티브 시각화 구현 가능
- 대규모 데이터 처리 및 애니메이션 지원

> 단점

- 학습 곡선이 가파름 (DOM, SVG, 함수형 사고 필요)
- 기본적인 차트 제작이 복잡함 (Chart.js나 ECharts보다 설정 많음)
- 코드가 장황해질 수 있음

## (5) D3.js와 함께 자주 사용하는 라이브러리

| `라이브러리` | `설명` |
| :---: | :---: |
| **Plotly.js** | D3 기반의 인터랙티브 차트 |
| **Vega / Vega-Lite** | D3 위에 구축된 선언형 시각화 언어 |
| **NVD3** | D3 기반의 재사용 가능한 차트 컴포넌트 |
| **Observable** | Mike Bostock이 만든 D3 실험용 노트북 환경 |

## (6) D3.js로 할 수 있는 대표적인 시각화

- 막대그래프, 꺾은선그래프, 산점도
- 트리맵, 버블 차트, 히트맵
- 네트워크 그래프 (force-directed)
- 지도 시각화 (GeoJSON)
- 타임라인 및 동적 대시보드
