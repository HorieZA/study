import streamlit as st
import pandas as pd
import altair as alt
import plotly.express as px
from db import findAll

st.set_page_config(
  page_title="항공 지연 BI Dashboard",
  page_icon="✈️",
  layout="wide"
)

st.title("✈️ 항공 지연 분석 BI Dashboard")
st.caption("60분 이상 도착 지연 데이터 분석")

# ---------------------------
# Sidebar 필터
# ---------------------------

st.sidebar.header("📊 분석 필터")

year_no = ["1987","1988","1989"]
year_opt = ["1987년","1988년","1989년"]

day_no = ["1","2","3","4","5","6","7"]
day_opt = ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"]

selected_year = st.sidebar.selectbox("년도 선택",year_opt)
selected_day = st.sidebar.selectbox("요일 선택",day_opt)

yearNo = year_no[year_opt.index(selected_year)]
dayNo = day_no[day_opt.index(selected_day)]

# ---------------------------
# 데이터 캐싱
# ---------------------------

@st.cache_data
def load_top10():
  sql = f"""
    SELECT 
      CONCAT(출발지공항, ' → ', 도착지공항) AS 운항노선,
      도착지공항,
      SUM(도착지연시간) AS 지연
    FROM db_air.`60분이상_지연비행`
    WHERE 년도={yearNo}
    AND 요일={dayNo}
    GROUP BY 도착지공항
    ORDER BY 지연 DESC
    LIMIT 10
  """
  return pd.DataFrame(findAll(sql))


@st.cache_data
def load_month():
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


@st.cache_data
def load_day():
  sql = f"""
      SELECT
        요일,
        SUM(도착지연시간) AS 지연
      FROM db_air.`60분이상_지연비행`
      WHERE 년도={yearNo}
      GROUP BY 요일
      ORDER BY 요일
    """
  return pd.DataFrame(findAll(sql))


# ---------------------------
# 데이터 로드
# ---------------------------

df_top10 = load_top10()
df_month = load_month()
df_day = load_day()

# ---------------------------
# KPI 카드
# ---------------------------

st.subheader("📌 핵심 지표")

k1,k2,k3,k4 = st.columns(4)

k1.metric("총 지연시간",f"{df_top10['지연'].sum():,}")
k2.metric("평균 지연시간",f"{int(df_top10['지연'].mean()):,}")
k3.metric("최대 지연 공항",df_top10.iloc[0]["도착지공항"])
k4.metric("TOP 지연시간",f"{df_top10.iloc[0]['지연']:,}")

st.divider()

# ---------------------------
# 그래프 영역
# ---------------------------

c1,c2 = st.columns(2)

# TOP10 공항
with c1:
  st.subheader("🛬 TOP10 지연 공항")

  fig = px.bar(
    df_top10,
    x="지연",
    y="운항노선",
    orientation="h",
    color="지연",
    color_continuous_scale="Reds"
  )

  fig.update_layout(height=450)

  st.plotly_chart(fig,use_container_width=True)


# 월별 지연 추이
with c2:
  st.subheader("📅 월별 지연 추이")

  fig2 = px.line(
    df_month,
    x="월",
    y="지연",
    markers=True
  )

  fig2.update_layout(height=450)

  st.plotly_chart(fig2,use_container_width=True)

st.divider()

# ---------------------------
# 요일 분석
# ---------------------------

st.subheader("📊 요일별 지연 분석")

fig3 = px.bar(
  df_day,
  x="요일",
  y="지연",
  color="지연",
  color_continuous_scale="Blues"
)

st.plotly_chart(fig3,use_container_width=True)

st.divider()

# ---------------------------
# 데이터 테이블
# ---------------------------

st.subheader("📋 TOP10 데이터")

st.dataframe(
  df_top10,
  use_container_width=True
)