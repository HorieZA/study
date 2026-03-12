import streamlit as st
import pandas as pd
from vega_datasets import data
from numpy.random import default_rng as rng
import altair as alt
from db import findAll

st.set_page_config(
    page_title="DB 항공 데이터 분석",
    page_icon="🚁",
    layout="wide",
    # initial_sidebar_state="collapsed"
)

st.title("DB 항공 데이터 분석")

if 'year_no' not in st.session_state:
	st.session_state.year_no = 0

year_no = [ "1987", "1988", "1989" ]

year_opt = [ "1987년", "1988년", "1989년" ]

if 'day_no' not in st.session_state:
	st.session_state.day_no = 0

day_no = [ "1", "2", "3", "4", "5", "6", "7" ]

day_opt = [ "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일" ]


yearNo = year_no[st.session_state.year_no]
dayNo = day_no[st.session_state.day_no]

def getData():
  try:
    sql1 = f"""
      SELECT 
    	`도착지공항코드`,
        `도착지공항`,
        SUM(`도착지연시간`) AS `지연`
      FROM db_air.`60분이상_지연비행`
      WHERE `년도` = {yearNo}
      AND `요일` = {dayNo}
      GROUP BY `도착지공항코드`
      ORDER BY `지연` DESC
      LIMIT 10
    """
    result1 = findAll(sql1)
    result2 = []
    if len(result1) > 0:
      sql2 = f"""
        SELECT
            `년도`,
            `월`,
            `일`,
            CONCAT(`출발지공항`, ' → ', `도착지공항`) AS `운항노선`,
            `도착지연시간`
        FROM db_air.`60분이상_지연비행`
        WHERE 
            `도착지공항코드` = (
                SELECT 
                `도착지공항코드`
                FROM db_air.`60분이상_지연비행`
                WHERE `년도` = {yearNo}
                AND `요일` = {dayNo}
                GROUP BY `도착지공항코드`
                ORDER BY SUM(`도착지연시간`) DESC
                LIMIT 1
            )
        AND `년도` = {yearNo}
        AND `요일` = {dayNo}
        ORDER BY `도착지연시간` DESC
        """
      result2 = findAll(sql2)
    st.header(f"{selected_year} {selected_day}의 60분 이상 도착 지연된 도착지항공 TOP_10")
    data1, data2 = st.tabs(["TOP_10", "TOP_1 지연 일자"])
    with data1:
      st.header("🛬 지연 시간 TOP_10")
      df1 = pd.DataFrame(result1)

      chart = alt.Chart(df1).mark_bar().encode(
        x="지연:Q",
        y=alt.Y("도착지공항:N", sort="-x"),
        color="도착지공항"
      )
      st.altair_chart(chart, use_container_width=True)
    
    with data2:
      st.header("🛫 TOP_1 지연 일자")
      st.dataframe(pd.DataFrame(result2))
  except Exception as e:
    return 0
  return 1


selected_year = st.selectbox( "년도 선택", year_opt, index=None )

if selected_year:
  selected_day = st.selectbox( f"{selected_year} 년 TOP 10", day_opt, index=None )

  if selected_day:
    st.session_state.year_no = year_opt.index(selected_year)
    st.session_state.day_no = day_opt.index(selected_day)

    if st.button("불러오기"):
      if getData() == 0:
        st.text("수집된 데이터가 없습니다.")