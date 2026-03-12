import streamlit as st
import pandas as pd
import altair as alt
from db import findAll

st.set_page_config(
  page_title="항공 지연 분석 대시보드",
  page_icon="✈️",
  layout="wide"
)

# -------------------------------------------------
# 제목
# -------------------------------------------------
st.title("✈️ 항공 지연 데이터 분석 Dashboard")
st.caption("60분 이상 도착 지연 데이터 분석")

# -------------------------------------------------
# Sidebar 필터
# -------------------------------------------------
st.sidebar.header("📊 필터")

year_no = ["1987","1988","1989"]
year_opt = ["1987년","1988년","1989년"]

day_no = ["1","2","3","4","5","6","7"]
day_opt = ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"]

selected_year = st.sidebar.selectbox("년도 선택",year_opt)
selected_day = st.sidebar.selectbox("요일 선택",day_opt)

yearNo = year_no[year_opt.index(selected_year)]
dayNo = day_no[day_opt.index(selected_day)]

# -------------------------------------------------
# 데이터 조회
# -------------------------------------------------
def load_top10():
  sql = f"""
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

  return pd.DataFrame(findAll(sql))


def load_top1_detail():
  sql = f"""
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

  return pd.DataFrame(findAll(sql))


def load_monthly():

  sql = f"""
      SELECT
        월,
        SUM(도착지연시간) AS 지연
      FROM db_air.`60분이상_지연비행`
      WHERE 년도={yearNo}
      GROUP BY 월
      ORDER BY 월
    """

  return pd.DataFrame(findAll(sql))


# -------------------------------------------------
# 데이터 로드
# -------------------------------------------------
df_top10 = load_top10()
df_detail = load_top1_detail()
df_month = load_monthly()

# -------------------------------------------------
# KPI 카드
# -------------------------------------------------
st.subheader("📌 주요 지표")

col1,col2,col3 = st.columns(3)

total_delay = df_top10["지연"].sum()
top_airport = df_top10.iloc[0]["도착지공항"]
top_delay = df_top10.iloc[0]["지연"]

col1.metric("총 지연시간",f"{total_delay:,}")
col2.metric("최대 지연 공항",top_airport)
col3.metric("최대 지연시간",f"{top_delay:,}")

st.divider()

# -------------------------------------------------
# 그래프 영역
# -------------------------------------------------
c1,c2 = st.columns(2)

# TOP10 지연 공항
with c1:

  st.subheader("🛬 TOP10 지연 공항")

  chart = alt.Chart(df_top10).mark_bar(
    cornerRadiusTopLeft=5,
    cornerRadiusTopRight=5
  ).encode(
    x=alt.X("지연:Q",title="지연시간"),
    y=alt.Y("도착지공항:N",sort="-x"),
    color="도착지공항:N",
    tooltip=["도착지공항","지연"]
  ).properties(
    height=400
  )

  st.altair_chart(chart,use_container_width=True)

# 월별 지연 추이
with c2:

  st.subheader("📅 월별 지연 추이")

  chart2 = alt.Chart(df_month).mark_line(point=True).encode(
    x=alt.X("월:O"),
    y=alt.Y("지연:Q"),
    tooltip=["월","지연"]
  ).properties(
    height=400
  )

  st.altair_chart(chart2,use_container_width=True)

st.divider()

# -------------------------------------------------
# 상세 데이터
# -------------------------------------------------
st.subheader("🛫 가장 지연이 많은 노선 상세")

st.dataframe(
  df_detail,
  use_container_width=True,
  height=350
)