import streamlit as st
import pandas as pd
from vega_datasets import data
from numpy.random import default_rng as rng
import altair as alt

st.set_page_config(
    page_title="수집 프로젝트",
    page_icon="🚁",
    layout="wide",
    # initial_sidebar_state="collapsed"
)

st.title("3팀!! 가즈아아아악!!! 콜록콜록")


st.subheader("1. 항공 횟수와 지연 상관관계 데이터 분석 ")
st.markdown(
    '<p class="section-title">📌 1. — 출발지연횟수 데이터 분석</p>',
    unsafe_allow_html=True,
)
with st.expander("보기"):
  st.page_link(page="./pages/01_항공 출발 지연 데이터 분석 대시보드.py", label="[수집 보기]", icon="🔗")
  st.code("""
    ## 출발지연횟수 sql문
    CREATE TABLE db_air.`출발지연회수` AS
    SELECT  
      air.`도시`,
      COUNT(CASE WHEN t.`년도` = 1987 THEN 1 END) AS cnt_1987,
      ROUND(AVG(CASE WHEN t.`년도` = 1987 
            THEN CAST(t.`출발지연시간` AS SIGNED) END),1) AS delay_1987,
      COUNT(CASE WHEN t.`년도` = 1988 THEN 1 END) AS cnt_1988,
      ROUND(AVG(CASE WHEN t.`년도` = 1988 
            THEN CAST(t.`출발지연시간` AS SIGNED) END),1) AS delay_1988,
      COUNT(CASE WHEN t.`년도` = 1989 THEN 1 END) AS cnt_1989,
      ROUND(AVG(CASE WHEN t.`년도` = 1989 
            THEN CAST(t.`출발지연시간` AS SIGNED) END),1) AS delay_1989
    FROM db_air.`비행` AS t
    INNER JOIN db_air.`항공사` AS air
      ON t.`출발공항코드` = air.`항공사코드`
    WHERE air.`도시` 
      IN ('Newark','Atlanta','Chicago','Dallas-Fort Worth',
          'Denver','Houston','Los Angeles','New York',
          'Phoenix','San Francisco','St Louis')
    AND t.`출발지연시간` <> 'NA'
    GROUP BY air.`도시`;
    
          
    SELECT a.년도, air.도시 , COUNT(출발공항코드) AS 횟수
    FROM db_air.비행 AS a
    INNER join db_air.항공사 AS air
      ON (a.출발공항코드 = air.항공사코드)
    WHERE a.비행취소여부 = 0
    GROUP BY air.도시
    ORDER BY 횟수 desc;
    
          
    CREATE TABLE db_air.출발횟수지연율 (
      도시 VARCHAR(50),
      지연 FLOAT,
      년도 INT,
      횟수 INT
    );
    
          
    INSERT INTO db_air.출발횟수지연율 (도시, 지연, 년도, 횟수)
    SELECT 도시, 지연, 년도, 횟수
    FROM (
      SELECT 
        air.도시,
        round(AVG(a.출발지연시간), 1) AS 지연,
        a.년도,
        COUNT(a.출발공항코드) AS 횟수,
        ROW_NUMBER() OVER (
          PARTITION BY a.년도
          ORDER BY COUNT(a.출발공항코드) DESC
        ) AS 순위
      FROM db_air.비행 AS a
      INNER JOIN db_air.항공사 AS air
        ON a.출발공항코드 = air.항공사코드
      WHERE a.비행취소여부 = 0 and a.출발지연시간 <> 'NA'
      GROUP BY a.년도, air.도시
    ) AS t
    WHERE 순위 <= 10;            
  """)

st.markdown(
    '<p class="section-title">📌 2. — 도착지연횟수 데이터 분석</p>',
    unsafe_allow_html=True,
)
with st.expander("보기"):
  st.page_link(page="./pages/02_항공 도착 지연 데이터 분석 대시보드.py", label="[수집 보기]", icon="🔗")
  st.code("""
    ## 도착지연횟수 sql문
    CREATE TABLE db_air.`도착지연회수` AS
    SELECT  
      air.`도시`,
      COUNT(CASE WHEN t.`년도` = 1987 THEN 1 END) AS cnt_1987,
      ROUND(AVG(CASE WHEN t.`년도` = 1987 
            THEN CAST(t.`도착지연시간` AS SIGNED) END),1) AS delay_1987,
      COUNT(CASE WHEN t.`년도` = 1988 THEN 1 END) AS cnt_1988,
      ROUND(AVG(CASE WHEN t.`년도` = 1988 
            THEN CAST(t.`도착지연시간` AS SIGNED) END),1) AS delay_1988,
      COUNT(CASE WHEN t.`년도` = 1989 THEN 1 END) AS cnt_1989,
      ROUND(AVG(CASE WHEN t.`년도` = 1989 
            THEN CAST(t.`도착지연시간` AS SIGNED) END),1) AS delay_1989
    FROM db_air.`비행` AS t
    INNER JOIN db_air.`항공사` AS air
      ON t.`도착지공항코드` = air.`항공사코드`
    WHERE air.`도시` 
      IN ('Newark','Atlanta','Chicago','Dallas-Fort Worth',
          'Denver','Houston','Los Angeles','New York',
          'Phoenix','San Francisco','St Louis')
    AND t.`도착지연시간` <> 'NA'
    GROUP BY air.`도시`;

  """)

st.subheader("2.연월별 인기노선 구분 및 분석")
st.markdown(
    '<p class="section-title">📌 월별 인기 항공 노선 분석 대시보드 데이터 분석</p>',
    unsafe_allow_html=True,
)
with st.expander("보기"):
  st.page_link(page="./pages/03_월별 인기 항공 노선 분석 대시보드.py", label="[수집 보기]", icon="🔗")
  st.code("""
    ## 월별 인기 노선 sql문
    CREATE TABLE db_air.`인기항공노선` AS
    SELECT t.`년도`, t.`월`, t.`노선`, t.cnt
    FROM (
      SELECT 
        a.`년도`,
        a.`월`,
        CONCAT(air.`도시`, '→', air2.`도시`) AS 노선,
        COUNT(*) AS cnt,
        ROW_NUMBER() OVER (
          PARTITION BY a.`년도`, a.`월`
          ORDER BY COUNT(*) DESC
        ) AS 순위
      FROM `비행` AS a
      INNER JOIN db_air.`항공사` AS air
        ON a.`출발공항코드` = air.`항공사코드`
      INNER JOIN db_air.`항공사` AS air2
        ON a.`도착지공항코드` = air2.`항공사코드`
      GROUP BY a.`년도`, a.`월`, air.`도시`, air2.`도시`
    ) AS t
    WHERE 순위 <= 5
    ORDER BY t.`년도`, t.`월` ASC;
  """)


st.subheader("3. 장거리노선")
st.markdown(
    '<p class="section-title">📌 1. — 장거리 노선 데이터</p>',
    unsafe_allow_html=True,
)
with st.expander("보기"):
  st.page_link(page="./pages/05_장거리노선 종합 분석 대시보드.py", label="[수집 보기]", icon="🔗")
  st.code("""
    ## 장거리 노선 데이터
    SELECT
      CONCAT(`출발지`, '→', `도착지`) AS `운항노선`,
      `출발지`,
      `도착지`,
      `년도`,
      `평균도착지연시간`,
      CAST(`비행거리` AS SIGNED) AS `비행거리`
    FROM db_air.`장거리노선`
    ORDER BY `년도` ASC, `비행거리` DESC
  """)

st.markdown(
'<p class="section-title">📌 2. — 장거리 년도별 요약 데이터</p>',
unsafe_allow_html=True,
)
with st.expander("보기"):
  st.page_link(page="./pages/05_장거리노선 종합 분석 대시보드.py", label="[수집 보기]", icon="🔗")
  st.code("""
    ## 장거리 년도별 요약 데이터
    SELECT
      `년도`,
      COUNT(*) AS `노선수`,
      ROUND(AVG(`평균도착지연시간`), 1) AS `평균지연시간`,
      ROUND(MAX(`평균도착지연시간`), 1) AS `최대지연시간`,
      MAX(CAST(`비행거리` AS SIGNED)) AS `최대비행거리`
    FROM db_air.`장거리노선`
    GROUP BY `년도`
    ORDER BY `년도` ASC
  """)

st.markdown(
'<p class="section-title">📌 3. — 장거리TOP10 데이터</p>',
unsafe_allow_html=True,
)
with st.expander("보기"):
  st.page_link(page="./pages/05_장거리노선 종합 분석 대시보드.py", label="[수집 보기]", icon="🔗")
  st.code("""
    ## 장거리 TOP10 데이터
    SELECT * FROM 장거리TOP10
  """)

st.subheader("4. 항공 지연분석 대시보드")
st.markdown(
    '<p class="section-title">📌 `60분이상_지연비행`용 테이블 정재 SQL</p>',
    unsafe_allow_html=True,
)
with st.expander("보기"):
  st.page_link(page="./pages/06_항공 지연분석 대시보드.py", label="[수집 보기]", icon="🔗")
  st.code("""
    CREATE TABLE db_air.`60분이상_지연비행` AS
    SELECT 
      a.`년도`, a.`월`, a.`일`, a.`요일`,
      air.`항공사명` AS `출발항공사`, a.`항공편번호`, a.`도착지공항코드`, 
      air.`도시` AS `출발지공항`, airs.`도시` AS `도착지공항`,
      c.`설명` AS `운반대설명`,
      CAST(a.`도착지연시간` AS SIGNED) AS `도착지연시간`
    FROM db_air.`비행` AS a
    INNER JOIN db_air.`항공사` AS air
      ON (a.`출발공항코드` = air.`항공사코드`)
    INNER JOIN db_air.`항공사` AS airs
      ON (a.`도착지공항코드` = airs.`항공사코드`)
    INNER JOIN db_air.`운반대` AS c
      ON (a.`출발공항코드` = c.`코드`)
    WHERE a.`도착지연시간` REGEXP '^[0-9]+'
    AND CAST(a.`도착지연시간` AS SIGNED) >= 60
    AND a.`비행취소여부` = 0
  """)