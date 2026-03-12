import streamlit as st

st.set_page_config(
  page_title="3월6일 3팀 yes24 수집",
  page_icon="💗",
  layout="wide",
)

st.title("streamlit 프로젝트")

st.subheader("1. Yes24 베스트셀러 수집 Ver.0305")
with st.expander("보기"):
  st.page_link(page="./pages/1_yes24.py", label="[수집 보기]", icon="🔗")
  st.code("""
    def getData():
      try:    
        url = (
          f"{yes24}?"
          f"categoryNumber={categoryNumber}&"
          f"pageNumber={pageNumber}&"
          f"pageSize={pageSize}&"
          f"type={type}&"
          f"saleYear={saleYear}&"
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
            sql2 = f""
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
              ""
            values = [
              (weekNo, book["title"], book["author"], book["star"], category_db, book["sale_num"])
              for book in books_db
            ]
            saveMany(sql1, sql2, values)

          tab1, tab2, tab3, tab4 = st.tabs(["HTML 데이터", "JSON 데이터", "DataFrame","판매 지수 차트"])
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
            st.text("판매 지수 차트")
            st.header(f"{selected_category} 주별 베스트 판매지수 차트")
            df = pd.DataFrame(books_db)
            st.bar_chart(df, x="title", y="sale_num", color="title")
      except Exception as e:
        return 0
      return 1
  """)

st.subheader("2. Yes24 베스트셀러 수집 Ver.0306")
with st.expander("보기"):
  st.page_link(page="./pages/2_daily_yes24.py", label="[수집 보기]", icon="🔗")
  st.code("""
    def getData():
      try:    
        url = (
            f"{yes24}?"
            f"categoryNumber={categoryNumber}&"
            f"pageNumber={pageNumber}&"
            f"pageSize={pageSize}&"
            f"type={type}&"
            f"saleDts={saleDts}&"
            f"sex={sex}&"
            f"viewMode={viewMode}"
            )
        
        st.text(f"URL: {url}")
        head = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
        res = get(url, headers=head)
        if res.status_code == 200:
          st.text(f"yes24 {selected_category} 선택 날짜: {saleDts}")
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
            sql1 = f"DELETE FROM edu.`yes24_daily` WHERE `category` = '{category_db}' AND `sale_date` = {saleDts}"
            sql2 = f""
                INSERT INTO edu.`yes24_daily`
                (`sale_date`, `title`, `author`, `star`, `category`, `sale_num`)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                  sale_date = VALUES(sale_date),
                  title = VALUES(title),
                  author = VALUES(author),
                  star = VALUES(star),
                  category = VALUES(category),
                  sale_num = VALUES(sale_num)
              ""
            values = [
              (saleDts, book["title"], book["author"], book["star"], category_db, book["sale_num"])
              for book in books_db
            ]
            saveMany(sql1, sql2, values)

          tab1, tab2, tab3, tab4 = st.tabs(["HTML 데이터", "JSON 데이터", "DataFrame","판매 지수 차트"])
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
            st.text("판매 지수 차트")
            st.header(f"{selected_category} 일간 베스트 판매지수 차트")
            df = pd.DataFrame(books_db)
            st.bar_chart(df, x="title", y="sale_num", color="title")
      except Exception as e:
        return 0
      return 1
  """)

st.subheader("3. 인터파크 티켓 수집")
with st.expander("보기"):
  st.page_link(page="./pages/3_interpark.py", label="[수집 보기]", icon="🔗")
  st.code("""
    Next.js + SWR 구조
    rankingTypes 이름이 바뀌어도 자동 탐지
          
    def getData():
      try:
        url = urls
        st.text(f"URL: {url}")
        head = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"}
        res = get(url, headers=head)
        if res.status_code == 200:
          st.text("인터파크 티켓 수집 시작!")
          tickets = [] # { 장르, 티켓이름, 장소, 시작날짜, 종료날짜, 예매율 }
          soup = bs(res.text, "html.parser")
          items = soup.select("div.responsive-ranking-list_rankingItem__PuQPJ")
          genre = genres[st.session_state.itp_index]
          for item in items:
            tName = item.select_one("li.responsive-ranking-list_goodsName__aHHGY").get_text(strip=True)
            pName = item.select_one("li.responsive-ranking-list_placeName__9HN2O").get_text(strip=True)
            tDate = item.select_one("div.responsive-ranking-list_dateWrap__jBu5n").get_text(strip=True)
            tPercent = item.select_one("li.responsive-ranking-list_bookingPercent__7ppKT").get_text(strip=True)
            tickets.append({ "장르": genre, "티켓이름": tName, "장소": pName, "기간": tDate, "예매율": tPercent })
          tab1, tab2, tab3, tab4 = st.tabs(["HTML 데이터", "json 데이터", "DataFrame", "API 데이터"])
          with tab1:
            st.text("HTML 출력")
            # st.html(items)
            st.text(items)
          with tab2:
            st.text("JSON 출력")
            # st.json(arr)
            json_string = json.dumps(tickets, ensure_ascii=False, indent=2)
            st.json(body=json_string, expanded=True, width="stretch")
          with tab3:
            st.text("DataFrame 출력")
            st.dataframe(pd.DataFrame(tickets))
          with tab4:
            st.text("API 출력")
            script_tag = soup.find('script', {'id': '__NEXT_DATA__'})
            json_data = json.loads(script_tag.string)
            st.json(json_data, expanded=False)
            st.html("<hr/>")
            st.text(f"{genre} 목록 출력")
            # st.json(json_data.get('props', {}).get('pageProps', {}).get('fallback', {}).get(keys, []), expanded=False)
            fallback = json_data.get("props", {}).get("pageProps", {}).get("fallback", {})
            rank_data = []
            for k, v in fallback.items():
              if "/ranking" in k and genres[st.session_state.itp_index] in k:
                rank_data = v
                break
                
            st.json(rank_data, expanded=False)

      except Exception as e:
        return 0
      return 1
  """)