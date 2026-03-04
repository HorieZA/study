<img src="./images/nltk-0.png" width="300">

## (1) NLTK란

- **풀네임:** Natural Language Toolkit
- **개발자:** Steven Bird, Edward Loper, Ewan Klein
- **첫 릴리즈:** 2001년
- **목적:**
  자연어 처리 연구, 교육, 실험을 쉽게 하기 위한 **오픈소스 도구 세트**

> NLTK는 연구용, 학습용으로 매우 강력하며, 파이썬의 대표적인 NLP 패키지 중 하나입니다.

> 최근에는 **spaCy**, **transformers(Hugging Face)** 등 더 빠르고 대규모 모델에 적합한 라이브러리가 많이 사용되지만, NLTK는 여전히 **NLP 기본 개념을 학습하기에 최적**입니다.

## (2) 설치 및 기본 설정

```bash
pip install nltk
```

> NLTK는 여러 **코퍼스(corpus)**와 **언어 리소스**를 내장하고 있는데, 이를 다운로드해야 합니다:

```python
import nltk
nltk.download('all')  # 전체 다운로드 (용량 큼)
# 또는 필요한 리소스만 선택 다운로드
nltk.download('punkt')       # 토크나이저
nltk.download('stopwords')   # 불용어 리스트
nltk.download('wordnet')     # WordNet 사전
```

> NLTK Data 다운로드
- [NLTK Corpora](http://www.nltk.org/nltk_data/) 접속
- [GitHub > nltk_data](https://github.com/nltk/nltk_data) 접속

## (3) 주요 기능

| `기능` | `설명` | `관련 모듈` |
| :---: | :---: | :---: |
| **토큰화 (Tokenization)** | 문장을 단어/문장 단위로 분리 | `nltk.tokenize` |
| **품사 태깅 (POS Tagging)** | 각 단어의 품사(POS)를 식별 | `nltk.pos_tag` |
| **형태소 분석 / 어간 추출** | 단어의 기본형으로 변환 | `nltk.stem` |
| **불용어 제거 (Stopword Removal)** | 의미 없는 단어 제거        | `nltk.corpus.stopwords` |
| **어휘 자원 활용 (Lexical Resources)** | WordNet 등 의미 관계 탐색 | `nltk.corpus.wordnet` |
| **파싱 (Parsing)** | 문법 트리 분석 | `nltk.parse` |
| **감성 분석, 분류 실험** | 기초적인 머신러닝 기능 제공 | `nltk.classify`, `nltk.sentiment` |

## (4) 주요 예시 코드

> 1. 토큰화

```python
from nltk.tokenize import word_tokenize, sent_tokenize

text = "NLTK is a powerful library for Natural Language Processing."
print(sent_tokenize(text))   # 문장 단위 분리
print(word_tokenize(text))   # 단어 단위 분리
```

> 2. 불용어 제거

```python
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

stop_words = set(stopwords.words('english'))
words = word_tokenize("This is a simple NLTK example.")
filtered = [w for w in words if w.lower() not in stop_words]
print(filtered)
```

> 3. 어간 추출 & 표제어 추출

```python
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk.corpus import wordnet

stemmer = PorterStemmer()
lemmatizer = WordNetLemmatizer()

print(stemmer.stem("running"))     # -> run
print(lemmatizer.lemmatize("running", pos='v'))  # -> run
```

> 4. 품사 태깅

```python
from nltk import pos_tag, word_tokenize

text = word_tokenize("I am learning NLP using NLTK.")
print(pos_tag(text))
```

> 5. WordNet 예제

```python
from nltk.corpus import wordnet as wn

syns = wn.synsets("bank")
for s in syns:
    print(s.name(), ":", s.definition())
```

## (5) 교육 및 연구에서의 NLTK 활용

> NLTK는 **"자연어처리 입문용 교재"**로도 유명합니다.

> 특히 **《Natural Language Processing with Python》** (NLTK Book)은 언어학, 데이터 과학, 인공지능 입문자에게 필독서로 꼽힙니다.

> 온라인 무료 버전: [https://www.nltk.org/book/](https://www.nltk.org/book/)

## (6) NLTK의 장단점

| `장점` | `단점` |
| :---: | :---: |
| 교육용으로 매우 적합 | 실제 산업 환경에서는 느림 |
| 다양한 말뭉치와 사전 포함 | 최신 딥러닝 모델 지원 부족 |
| 쉬운 사용법과 풍부한 문서 | 한국어 지원 제한적 |
| 커뮤니티가 넓음 | spaCy, transformers에 비해 속도↓ |

## (7) 한국어 자연어 처리에서의 활용

- NLTK는 기본적으로 **영어 중심**입니다.
- 한국어 형태소 분석을 위해서는 보통 **KoNLPy**, **Soynlp**, **PyKoSpacing**, **Hannanum** 등의 라이브러리를 함께 사용합니다.
- 한국어에서는 **KoNLPy + NLTK의 전처리 기능 조합**이 자주 쓰입니다.
