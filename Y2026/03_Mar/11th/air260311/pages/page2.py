import streamlit as st
import pandas as pd
import altair as alt
from db import findAll

st.set_page_config(
  page_title="DB 항공 데이터 분석",
  page_icon="✈️",
  layout="wide"
)

st.title("✈️ 항공 지연 데이터 분석 대시보드")
st.divider()

# ----------------------------
# session state
# ----------------------------
if 'year_no' not in st.session_state:
  st.session_state.year_no = 0

if 'day_no' not in st.session_state:
  st.session_state.day_no = 0

year_no = ["1987","1988","1989"]
year_opt = ["1987년","1988년","1989년"]

day_no = ["1","2","3","4","5","6","7"]
day_opt = ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"]

# ----------------------------
# 선택 UI
# ----------------------------
col1,col2,col3 = st.columns([1,1,1])

with col1:
  selected_year = st.selectbox("📅 년도 선택",year_opt,index=None)

with col2:
  if selected_year:
    selected_day = st.selectbox("📆 요일 선택",day_opt,index=None)
  else:
    selected_day = None

with col3:
  load_btn = st.button("📊 데이터 조회",use_container_width=True)

st.divider()

# ----------------------------
# 데이터 조회
# ----------------------------
def getData():

  yearNo = year_no[st.session_state.year_no]
  dayNo = day_no[st.session_state.day_no]

  sql1 = f"""
      SELECT 
        도착지공항코드,
        도착지공항,
        SUM(도착지연시간) AS 지연
      FROM db_air.`60분이상_지연비행`
      WHERE 년도={yearNo}
      AND 요일={dayNo}
      GROUP BY 도착지공항코드
      ORDER BY 지연 DESC
      LIMIT 10
    """

  result1 = findAll(sql1)
  df1 = pd.DataFrame(result1)

  if df1.empty:
    st.warning("데이터가 없습니다.")
    return

  # ----------------------------
  # KPI 영역
  # ----------------------------
  total_delay = df1["지연"].sum()
  max_airport = df1.iloc[0]["도착지공항"]
  max_delay = df1.iloc[0]["지연"]

  k1,k2,k3 = st.columns(3)

  k1.metric("총 지연시간",f"{total_delay:,}")
  k2.metric("최대 지연 공항",max_airport)
  k3.metric("최대 지연시간",f"{max_delay:,}")

  st.divider()

  # ----------------------------
  # 그래프
  # ----------------------------
  st.subheader(f"🛬 {selected_year} {selected_day} 도착지 지연 TOP10")

  chart = alt.Chart(df1).mark_bar(
    cornerRadiusTopLeft=5,
    cornerRadiusTopRight=5
  ).encode(
    x=alt.X("지연:Q",title="지연시간"),
    y=alt.Y("도착지공항:N",sort="-x",title="도착 공항"),
    color=alt.Color("도착지공항:N",legend=None),
    tooltip=["도착지공항","지연"]
  ).properties(
    height=450
  )

  st.altair_chart(chart,use_container_width=True)

  st.divider()

  # ----------------------------
  # TOP1 상세
  # ----------------------------
  sql2 = f"""
      SELECT
        년도,
        월,
        일,
        CONCAT(출발지공항,' → ',도착지공항) AS 운항노선,
        도착지연시간
      FROM db_air.`60분이상_지연비행`
      WHERE 도착지공항코드 = (
        SELECT 도착지공항코드
        FROM db_air.`60분이상_지연비행`
        WHERE 년도={yearNo}
        AND 요일={dayNo}
        GROUP BY 도착지공항코드
        ORDER BY SUM(도착지연시간) DESC
        LIMIT 1
      )
      AND 년도={yearNo}
      AND 요일={dayNo}
      ORDER BY 도착지연시간 DESC
    """

  result2 = findAll(sql2)
  df2 = pd.DataFrame(result2)

  st.subheader("🛫 가장 지연이 많은 노선 상세")

  st.dataframe(
    df2,
    use_container_width=True,
    height=300
  )


# ----------------------------
# 버튼 클릭
# ----------------------------
if load_btn and selected_year and selected_day:

  st.session_state.year_no = year_opt.index(selected_year)
  st.session_state.day_no = day_opt.index(selected_day)

  getData()