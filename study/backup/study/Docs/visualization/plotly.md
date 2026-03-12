<img src="./images/plotly-0.png" width="200">

## (1) Plotly란

- **Plotly**는 원래 Plotly Inc.에서 개발한 **웹 기반 시각화 도구**입니다.
- Python, R, Julia, JavaScript 등 다양한 언어에서 사용할 수 있고,
- Python 버전은 보통 `plotly` 패키지를 통해 사용합니다.

> Python용 Plotly는 크게 두 가지 API 스타일로 나뉩니다:

| `API 스타일` | `설명` | `주요 모듈` |
| :---: | :---: | :---: |
| **Plotly Express** | 간단한 문법으로 빠르게 그래프를 만듦 | `plotly.express` |
| **Graph Objects** | 더 세밀한 제어가 가능 (레이아웃, 축, 색상 등) | `plotly.graph_objects` |

## (2) 설치 방법

```bash
pip install plotly
```

또는 Jupyter Notebook에서:

```bash
!pip install plotly
```

## (3) Plotly Express 기본 예제

```python
import plotly.express as px

# 내장 데이터셋: iris
df = px.data.iris()

fig = px.scatter(
    df,
    x="sepal_width",
    y="sepal_length",
    color="species",
    size="petal_length",
    hover_data=["petal_width"]
)

fig.show()
```

> **특징**:

- 마우스로 확대/축소 가능
- 범례 클릭으로 특정 데이터 숨김/표시
- 각 점에 마우스 올리면 데이터 표시

## (4) Graph Objects 방식

> 좀 더 세밀하게 제어할 때 사용합니다.

```python
import plotly.graph_objects as go

fig = go.Figure()

# 산점도 추가
fig.add_trace(go.Scatter(
    x=[1, 2, 3, 4],
    y=[10, 15, 13, 17],
    mode='markers+lines',
    name='샘플 데이터'
))

# 레이아웃 설정
fig.update_layout(
    title='Graph Objects 예제',
    xaxis_title='X축',
    yaxis_title='Y축',
    template='plotly_dark'
)

fig.show()
```

## (5) 대화형 기능

> Plotly는 웹 기술(`JavaScript`, `D3.js`)을 기반으로 하므로 다음과 같은 기능이 가능합니다:

- 마우스로 드래그하여 영역 확대
- 더블클릭으로 리셋
- 마우스오버 시 툴팁 표시
- 그래프를 `.html` 파일로 저장해서 웹에 공유

```python
fig.write_html("example_plot.html")
```

## (6) 지원하는 주요 차트 유형

> Plotly는 거의 모든 시각화를 지원합니다:

| `카테고리` | `예시 함수` | `설명` |
| :---: | :---: | :---: |
| 산점도 | `px.scatter()` | 기본적인 점 그래프 |
| 선 그래프 | `px.line()` | 시계열 데이터 시각화 |
| 막대 그래프 | `px.bar()` | 범주형 데이터 비교 |
| 히스토그램 | `px.histogram()` | 분포 표현 |
| 박스플롯 | `px.box()` | 이상치 및 분포 시각화 |
| 파이 차트 | `px.pie()` | 비율 표시 |
| 지리정보 | `px.choropleth()` | 지도 위 데이터 표현 |
| 3D 그래프 | `px.scatter_3d()` | 3차원 데이터 시각화 |
| 히트맵 | `px.imshow()` | 2D 데이터 시각화 |

## (7) Dash와의 관계

- Plotly는 **Dash**라는 웹 애플리케이션 프레임워크와도 통합되어 있습니다.
- Dash를 사용하면 Python 코드만으로 **데이터 대시보드(Web App)** 를 만들 수 있습니다.

> 예시:

```python
from dash import Dash, html, dcc
import plotly.express as px

app = Dash(__name__)
df = px.data.gapminder().query("year == 2007")

fig = px.scatter(df, x="gdpPercap", y="lifeExp", color="continent")

app.layout = html.Div([
    html.H1("Gapminder 데이터 대시보드"),
    dcc.Graph(figure=fig)
])

if __name__ == "__main__":
    app.run_server(debug=True)
```

> 이렇게 하면 **Flask + Plotly 기반 웹 시각화 앱**을 바로 실행할 수 있습니다.

## (8) Plotly의 장점 요약

- **대화형 그래프** — 웹 브라우저에서 바로 인터랙션 가능
- **간결한 문법 (Plotly Express)**
- **세밀한 커스터마이징 (Graph Objects)**
- **Dash와의 통합으로 대시보드 제작 가능**
- **다양한 데이터 포맷(CSV, pandas, JSON, NumPy 등) 지원**

## (9) 참고 자료

* 공식 문서: [https://plotly.com/python/](https://plotly.com/python/)
* Plotly Express API: [https://plotly.com/python-api-reference/plotly.express.html](https://plotly.com/python-api-reference/plotly.express.html)
* Graph Objects API: [https://plotly.com/python-api-reference/plotly.graph_objects.html](https://plotly.com/python-api-reference/plotly.graph_objects.html)
