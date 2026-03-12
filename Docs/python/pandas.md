<img src="./images/pandas-0.png" width="200">

## (1) pandas란

> **pandas (Panel Data)** 

- **행(row)** 과 **열(column)** 로 구성된 데이터(=테이블)를 다루기 위한 라이브러리입니다.
- **NumPy** 위에서 동작하며, 데이터 분석, 정제(cleaning), 변환, 집계(aggregation) 등을 매우 효율적으로 수행합니다.

## (2) 설치

```bash
pip install pandas
```

## (3) pandas의 기본 구조

> pandas에는 크게 두 가지 핵심 자료구조가 있습니다.

| `객체` | `설명` | `비슷한 구조` |
| :---: | :---: | :---: |
| `Series` | 1차원 데이터 (인덱스 + 값) | 리스트, 1열짜리 데이터 |
| `DataFrame` | 2차원 데이터 (행 + 열) | 엑셀 시트, SQL 테이블 |

## (4) Series — 1차원 데이터

```python
import pandas as pd

s = pd.Series([10, 20, 30, 40], index=['a', 'b', 'c', 'd'])
print(s)
```

- 출력:

```
a    10
b    20
c    30
d    40
dtype: int64
```

> 특징:

- **인덱스(index)** 와 **값(value)** 으로 구성
- NumPy 배열처럼 연산 가능

> 예:

```python
print(s.mean())   # 평균
print(s + 10)     # 벡터화 연산 가능
print(s['b'])     # 인덱스로 접근 → 20
```

## (5) DataFrame — 2차원 데이터

> `DataFrame`은 **여러 개의 Series가 모인 구조**입니다.

```python
data = {
    '이름': ['홍길동', '이몽룡', '성춘향'],
    '나이': [23, 21, 19],
    '성별': ['남', '남', '여']
}
df = pd.DataFrame(data)
print(df)
```

- 출력:

```
     이름  나이 성별
0   홍길동  23  남
1   이몽룡  21  남
2   성춘향  19  여
```

## (6) 기본 속성 살펴보기

| `속성` | `설명` | `예시` |
| :---: | :---: | :---: |
| `.shape` | (행, 열) 크기 | `(3, 3)` |
| `.columns` | 열 이름 | `Index(['이름','나이','성별'])` |
| `.index` | 행 인덱스 | `RangeIndex(0, 3)` |
| `.info()` | 데이터 요약 정보 | 데이터 타입, 결측치 등 |
| `.describe()` | 통계 요약 | 평균, 표준편차, 최소·최대 등 |

## (7) CSV 파일 입출력

> 파일 읽기

```python
df = pd.read_csv('data.csv')
```

> 파일 저장

```python
df.to_csv('output.csv', index=False)
```

> 엑셀 파일도 가능:

```python
df = pd.read_excel('data.xlsx')
```

## (8) 데이터 접근

```python
df['이름']           	# 특정 열
df[['이름', '성별']]   	# 여러 열
df.loc[0]            	# 인덱스명으로 접근
df.iloc[1]           	# 행 번호로 접근
```

## (9) 조건 필터링

```python
df[df['나이'] > 20]
```

- 결과:

```
     이름  나이 성별
0   홍길동  23  남
1   이몽룡  21  남
```

## (10) 정렬, 그룹화, 통계

> 정렬

```python
df.sort_values(by='나이', ascending=False)
```

> 그룹화

```python
df.groupby('성별')['나이'].mean()
```

- 출력:

```
성별
남    22.0
여    19.0
Name: 나이, dtype: float64
```

## (11) 결측치 처리 (NaN)

```python
df.isnull()             # 결측 여부 확인
df.fillna(0)            # 결측값을 0으로 채움
df.dropna()             # 결측값 있는 행 제거
```

## (12) 컬럼 추가 & 삭제

```python
df['학교'] = ['서울대', '연세대', '고려대']  # 새 컬럼 추가
df.drop('성별', axis=1, inplace=True)       # 컬럼 삭제
```

## (13) DataFrame 병합 (merge, concat)

> 1. `concat()` — 위아래 또는 옆으로 붙이기

```python
pd.concat([df1, df2])        # 행 방향(위아래)
pd.concat([df1, df2], axis=1)  # 열 방향(좌우)
```

> 2. `merge()` — SQL의 JOIN처럼

```python
pd.merge(df1, df2, on='id', how='inner')
```

## (14) 기본 통계 함수

| `함수` | `설명` |
| :---: | :---: |
| `.mean()` | 평균 |
| `.sum()` | 합계 |
| `.min()`, `.max()` | 최소·최대 |
| `.std()` | 표준편차 |
| `.corr()` | 상관관계 |
| `.value_counts()` | 카테고리 빈도 수 |

> 예시:

```python
df['성별'].value_counts()
```

- 출력:

```
남    2
여    1
Name: 성별, dtype: int64
```

## (15) 간단한 시각화

> pandas는 내부적으로 `matplotlib`을 활용해 간단한 그래프를 바로 그릴 수 있습니다.

```python
import matplotlib.pyplot as plt

df['나이'].plot(kind='bar')
plt.show()
```

## (16) pandas가 강력한 이유

| `기능` | `설명` |
| :---: | :---: |
| **고속 처리** | NumPy 기반으로 빠름 |
| **다양한 파일 형식 지원** | CSV, Excel, SQL, JSON 등 |
| **강력한 데이터 조작 기능** | 필터링, 그룹화, 집계, 정렬 등 |
| **데이터 정제에 최적화** | 결측치, 이상치 처리 등 |
| **다른 라이브러리와 호환** | scikit-learn, matplotlib, seaborn 등 |

## (17) 예제 정리

```python
import pandas as pd

df = pd.DataFrame({
    '이름': ['A', 'B', 'C', 'D'],
    '점수': [85, 90, 78, 92],
    '학년': [1, 2, 1, 3]
})

print(df.describe())          # 통계 요약
print(df[df['점수'] > 80])    # 조건 필터링
print(df.groupby('학년')['점수'].mean())  # 그룹별 평균
```

- 출력:

```
학년
1    81.5
2    90.0
3    92.0
Name: 점수, dtype: float64
```

## (18) 요약 정리

| `항목` | `설명` |
| :---: | :---: |
| **Series** | 1차원 데이터 (열 단위) |
| **DataFrame** | 2차원 데이터 (행 + 열) |
| **파일 입출력** | `read_csv()`, `to_csv()` |
| **데이터 선택** | `loc`, `iloc`, `[]` |
| **데이터 변형** | `groupby`, `merge`, `concat` |
| **결측치 처리** | `fillna`, `dropna` |
| **시각화** | `.plot()` |
