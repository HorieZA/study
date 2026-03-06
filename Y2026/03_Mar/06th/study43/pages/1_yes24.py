from bs4 import BeautifulSoup as bs
from requests import get
import pandas as pd
import streamlit as st
import json
from db import saveMany
import datetime
import calendar

st.set_page_config(
  page_title="yes24 수집",
  page_icon="💗",
  layout="wide",
)

if 'category_nm' not in st.session_state:
	st.session_state.category_nm = 0

category_nm = [ "001", "002", "017&eBookTp=0", "003", "004", "006" ]

category_opt = [ "국내도서", "외국도서", "eBook", "CD/LP", "DVD/BD", "문구/GIFT" ]

if 'week_no' not in st.session_state:
	st.session_state.week_no = 0

week_no = [ "1157", "1156", "1155", "1154", "1153", "1152", "1151", "1151", "1150", "1149" ]

week_opt = [
  "02월 23일 ~ 03월 01일",
  "02월 16일 ~ 02월 22일",
  "02월 09일 ~ 02월 15일",
  "02월 02일 ~ 02월 08일",
  "01월 26일 ~ 02월 01일",
  "01월 19일 ~ 01월 25일",
  "01월 12일 ~ 01월 18일",
  "01월 05일 ~ 01월 11일",
  "12월 29일 ~ 01월 04일"
]

today = datetime.date.today()

col1, col2, col3 = st.columns(3)

# 년도
with col1:
    year_list = list(range(2020, today.year + 1))
    year = st.selectbox("년도", year_list, index=len(year_list) - 1)

# 월 (미래 월 제한)
with col2:
    if year == today.year:
        month_list = list(range(1, today.month + 1))
        month_index = today.month - 1
    else:
        month_list = list(range(1, 13))
        month_index = 0

    month = st.selectbox("월", month_list, index=min(month_index, len(month_list) - 1))

# 일 (월별 마지막날 + 미래 날짜 제한)
with col3:

    # 월의 마지막 날
    last_day = calendar.monthrange(year, month)[1]

    if year == today.year and month == today.month:
        day_list = list(range(1, today.day + 1))
        day_index = today.day - 1
    else:
        day_list = list(range(1, last_day + 1))
        day_index = 0

    day = st.selectbox("일", day_list, index=min(day_index, len(day_list) - 1))

# 날짜 문자열
saleDts = f"{year}-{month:02d}-{day:02d}"


# Yes24 베스트셀러 URL 예시
yes24 = "https://www.yes24.com/product/category"
categoryNumber = category_nm[st.session_state.category_nm]
category_db = categoryNumber.split("&")[0] if categoryNumber else None
pageNumber = 1
pageSize = 40
type = "week"
saleYear = 2026
# dayNo = day_no[st.session_state.day_no]
weekNo = week_no[st.session_state.week_no]
# saleMonth = moth_no[st.session_state.moth_no]
sex = "A"
viewMode = "thumb"

# 데이터 수집
def getData():
  try:
    # date_param = ""
    # bestseller = ""

    # if type == "week":
    #     bestseller = f"{type}bestseller"
    #     date_param = f"weekNo={weekNo}"
    # elif type == "month":
    #     bestseller = f"{type}bestseller"
    #     date_param = f"saleMonth={mothNo}"
    # elif type == "day":
    #     bestseller = f"{type}bestseller"
    #     date_param = f"saleDts={mothNo}-{1}-{2}"

    # url = (
    #     f"{yes24}/"
    #     f"{bestseller}?"
    #     f"categoryNumber={categoryNumber}&"
    #     f"pageNumber={pageNumber}&"
    #     f"pageSize={pageSize}&"
    #     f"type={type}&"
    #     f"saleYear={saleYear}&"
    #     f"{date_param}&"
    #     f"sex={sex}&"
    #     f"viewMode={viewMode}"
    # )
    url = (
      f"{yes24}?"
      f"categoryNumber={categoryNumber}&"
      f"pageNumber={pageNumber}&"
      f"pageSize={pageSize}&"
      f"type={type}&"
      f"saleYear={saleYear}&"
      f"weekNo={weekNo}&"
      f"weekNo={weekNo}&"
      f"sex={sex}&"
      f"viewMode={viewMode}"
    )
    
    st.text(f"URL: {url}")
    head = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    res = get(url, headers=head)
    if res.status_code == 200:
      st.text(f"yes24 {selected_category} 주별 베스트 수집 시작!")
      books = [] # { 도서명, 저자, 별점 }
      books_db = []
      soup = bs(res.text, "html.parser")
      trs = soup.select("#yesBestList .itemUnit")
      for item in trs:
        title = item.select_one(".gd_name").get_text(strip=True)
        author_span = item.select_one("span.authPub.info_auth")
        author = ""
        if author_span:
          author_nm = author_span.select_one("a")
          author = author_nm.get_text(strip=True) if author_nm else author_span.get_text(strip=True)
        star_span = item.select_one("span.rating_grade")
        star = 0.0
        try:
          star_no = star_span.select_one("em.yes_b") if star_span else None
          if star_span:
              star = float(star_no.get_text(strip=True))
        except:
          star = 0.0
        sales_span = item.select_one("div.info_row.info_rating")
        sale_num = 0
        try:
          saleNum_no = sales_span.select_one("span.saleNum") if sales_span else None
          if saleNum_no:
            sale_text = saleNum_no.get_text(strip=True)
            sale_num = int(sale_text.split()[-1].replace(",", ""))
        except:
          sale_num = 0
        
        books_db.append({ "title": title, "author": author, "star": star, "sale_num": sale_num })
        
        if categoryNumber == "006":
          books.append({ "상품명": title, "명칭": author, "별점": star, "판매지수": sale_num })
        elif categoryNumber == "003":
          books.append({ "CD/LP": title, "아티스트": author, "별점": star, "판매지수": sale_num })
        elif categoryNumber == "004":
          books.append({ "DVD/BD": title, "감독 / 제작사": author, "별점": star, "판매지수": sale_num })
        else:
          books.append({ "도서명": title, "저자": author, "별점": star, "판매지수": sale_num })
      
      if len(books_db) > 0:
        # 서버PC 등록
        sql1 = f"DELETE FROM edu.`yes24` WHERE `category` = '{category_db}' AND `week_no` = {weekNo}"
        sql2 = f"""
            INSERT INTO edu.`yes24`
            (`week_no`, `title`, `author`, `star`, `category`, `sale_num`)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
              week_no = VALUES(week_no),
              title = VALUES(title),
              author = VALUES(author),
              star = VALUES(star),
              category = VALUES(category),
              sale_num = VALUES(sale_num)
          """
        values = [
          (weekNo, book["title"], book["author"], book["star"], category_db, book["sale_num"])
          for book in books_db
        ]
        saveMany(sql1, sql2, values)

      tab1, tab2, tab3, tab4 = st.tabs(["HTML 데이터", "JSON 데이터", "DataFrame", "판매지수 Chart"])
      with tab1:
        st.text("html 출력")
        st.html(trs)
      with tab2:
        st.text("JSON 출력")
        json_string = json.dumps(books, ensure_ascii=False, indent=2)
        st.json(body=json_string, expanded=True, width="stretch")
      with tab3:
        st.text("DataFrame 출력")
        st.dataframe(pd.DataFrame(books))
      with tab4:
        st.text("판매지수 차트")
        st.header(f"{selected_category} 주별 배스트  판매지수 차트")
        df = pd.DataFrame(books_db)
        st.bar_chart(df, x="title", y="sale_num", color="title")
  except Exception as e:
    return 0
  return 1

# if st.button(f"수집하기"):
#   getData()

selected_category = st.selectbox( "도서 주별 베스트", category_opt, index=None )

if selected_category:
  selected_week = st.selectbox( f"{selected_category} 주별 베스트", week_opt, index=None )

  if selected_week:
    st.session_state.category_nm = category_opt.index(selected_category)
    st.session_state.week_no = week_opt.index(selected_week)

    if st.button("수집하기"):
      if getData() == 0:
        st.text("수집된 데이터가 없습니다.")