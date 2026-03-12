import streamlit as st
import pandas as pd
import plotly.express as px
import pydeck as pdk
from db import findAll

st.set_page_config(
    page_title="항공 지연 분석 BI Dashboard",
    page_icon="✈️",
    layout="wide"
)

# -------------------------------------------------
# 제목
# -------------------------------------------------

st.title("✈️ 항공 지연 분석 BI Dashboard")
st.caption("60분 이상 도착 지연 데이터 분석 포트폴리오 프로젝트")

st.divider()

# -------------------------------------------------
# Sidebar 필터
# -------------------------------------------------

st.sidebar.header("📊 분석 필터")

year_no = ["1987","1988","1989"]
year_opt = ["1987년","1988년","1989년"]

day_no = ["1","2","3","4","5","6","7"]
day_opt = ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"]

selected_year = st.sidebar.selectbox("년도 선택",year_opt)
selected_day = st.sidebar.selectbox("요일 선택",day_opt)

top_n = st.sidebar.selectbox(
    "TOP 공항 수",
    [10,20,50]
)

yearNo = year_no[year_opt.index(selected_year)]
dayNo = day_no[day_opt.index(selected_day)]

# -------------------------------------------------
# 데이터 조회
# -------------------------------------------------

@st.cache_data
def load_airport():

    sql = f"""
    SELECT
      CONCAT(출발지공항,' → ',도착지공항) AS 노선,
      도착지공항,
      SUM(도착지연시간) AS 지연
    FROM db_air.`60분이상_지연비행`
    WHERE 년도={yearNo}
    AND 요일={dayNo}
    GROUP BY 도착지공항
    ORDER BY 지연 DESC
    LIMIT {top_n}
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


df_airport = load_airport()
df_month = load_month()

# -------------------------------------------------
# KPI
# -------------------------------------------------

st.subheader("📊 주요 지표")

c1,c2,c3,c4 = st.columns(4)

total_delay = df_airport["지연"].sum()
avg_delay = int(df_airport["지연"].mean())
top_airport = df_airport.iloc[0]["도착지공항"]
top_delay = df_airport.iloc[0]["지연"]

c1.metric("총 지연시간",f"{total_delay:,}")
c2.metric("평균 지연시간",f"{avg_delay:,}")
c3.metric("지연 1위 공항",top_airport)
c4.metric("최대 지연시간",f"{top_delay:,}")

st.divider()

# -------------------------------------------------
# 자동 분석 문장
# -------------------------------------------------

st.subheader("📌 자동 분석 결과")

insight1 = f"{selected_year} {selected_day} 기준 가장 지연이 많은 공항은 **{top_airport}** 입니다."
insight2 = f"TOP {top_n} 공항의 총 지연시간은 **{total_delay:,}** 입니다."
insight3 = f"평균 지연시간은 **{avg_delay:,}** 입니다."

st.info(insight1)
st.info(insight2)
st.info(insight3)

st.divider()

# -------------------------------------------------
# 그래프
# -------------------------------------------------

col1,col2 = st.columns(2)

with col1:

    st.subheader("🛬 지연 공항 TOP 분석")

    fig = px.bar(
        df_airport,
        x="지연",
        y="도착지공항",
        orientation="h",
        color="지연",
        color_continuous_scale="Reds"
    )

    st.plotly_chart(fig,use_container_width=True)


with col2:

    st.subheader("📅 월별 지연 추이")

    fig2 = px.line(
        df_month,
        x="월",
        y="지연",
        markers=True
    )

    st.plotly_chart(fig2,use_container_width=True)

st.divider()

# -------------------------------------------------
# 지연 비율
# -------------------------------------------------

st.subheader("📊 지연 공항 비율")

fig3 = px.pie(
    df_airport,
    names="도착지공항",
    values="지연"
)

st.plotly_chart(fig3,use_container_width=True)

st.divider()

# -------------------------------------------------
# 지도 시각화
# -------------------------------------------------

st.subheader("🗺️ 지연 공항 지도")

# 예시 좌표 (실제 데이터 있으면 교체 가능)

map_data = pd.DataFrame({
    "공항":["Chicago","Atlanta","Denver","Dallas"],
    "lat":[41.97,33.64,39.85,32.90],
    "lon":[-87.90,-84.42,-104.67,-97.04],
    "지연":[50000,40000,30000,20000]
})

layer = pdk.Layer(
    "ScatterplotLayer",
    data=map_data,
    get_position="[lon, lat]",
    get_radius="지연/5",
    get_fill_color=[255,0,0],
)

view = pdk.ViewState(
    latitude=39,
    longitude=-98,
    zoom=3
)

st.pydeck_chart(pdk.Deck(
    layers=[layer],
    initial_view_state=view
))

st.divider()

# -------------------------------------------------
# 데이터 테이블
# -------------------------------------------------

st.subheader("📋 분석 데이터")

st.dataframe(df_airport,use_container_width=True)

st.caption("항공 지연 분석 BI Dashboard | 데이터 분석 포트폴리오 프로젝트")