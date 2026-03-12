from bs4 import BeautifulSoup
import requests

url = 'https://news.naver.com/'
response = requests.get(url)

# print(response)

soup = BeautifulSoup(response.text, 'lxml')

# print(soup)

# 모든 뉴스 제목 가져오기
# titles = soup.select('a[href*="news.naver"]')

# print(titles)

# for t in titles:
#   print(t.get_text(strip=True))


## 심화과정 이름을 불러와서 체크하기

import requests
from bs4 import BeautifulSoup

# url = "https://news.naver.com/"
headers = {"User-Agent": "Mozilla/5.0"}

res = requests.get(url, headers=headers)
soup = BeautifulSoup(res.text, "html.parser")

feeds = soup.select(".comp_news_feed")

for feed in feeds:
    journal = feed.select_one(".cnf_journal_name")
    
    if journal and journal.get_text(strip=True) == "주간경향":
        news_list = feed.select_one(".cnf_news_list")
        
        if news_list:
            items = news_list.select(".cnf_news_item a")
            
            for item in items:
                print("제목:", item.get_text(strip=True))
                print("링크:", item["href"])
                print()
        break