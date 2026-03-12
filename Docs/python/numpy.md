<img src="./images/numpy-0.png" width="200">

## (1) NumPy란 무엇인가?

> **NumPy (Numerical Python)** 는 “수치 계산(numerical computation)”을 빠르고 효율적으로 수행하기 위한 라이브러리입니다.

- **핵심 기능:** 고성능 **다차원 배열 객체(ndarray)** 제공
- **주요 장점:**

  - 빠른 연산 (C로 구현되어 속도가 빠름)
  - 벡터화(vectorization)를 통한 효율적인 수학 계산
  - 선형대수, 푸리에 변환, 통계 기능 내장
  - 다른 라이브러리(pandas, TensorFlow, PyTorch 등)의 기반이 됨

## (2) ndarray (NumPy 배열)의 특징

> NumPy의 핵심은 **ndarray 객체**입니다. 이는 “n-dimensional array” — 즉, 다차원 배열을 의미합니다.

- 예:

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([[1, 2, 3],
              [4, 5, 6]])

print(a)
print(b)
```

- 출력:

```
[1 2 3]
[[1 2 3]
 [4 5 6]]
```

## (3) ndarray의 주요 속성

| `속성` | `설명` | `예시` |
| :---: | :---: | :---: |
| `ndim` | 배열의 차원 수 | `b.ndim → 2` |
| `shape` | 각 차원의 크기 (행, 열 등) | `b.shape → (2, 3)` |
| `size` | 전체 원소 개수 | `b.size → 6` |
| `dtype` | 데이터 타입 | `b.dtype → int64` |

## (4) 배열 생성 방법

> NumPy는 배열을 다양하게 생성할 수 있습니다.

| `함수` | `설명` | `예시` |
| :---: | :---: | :---: |
| `np.array()` | 리스트나 튜플로부터 생성 | `np.array([1,2,3])` |
| `np.zeros()` | 0으로 채운 배열 | `np.zeros((2,3))` |
| `np.ones()` | 1로 채운 배열 | `np.ones((3,3))` |
| `np.arange()` | 범위 기반 배열 (Python `range`와 유사) | `np.arange(0,10,2)` |
| `np.linspace()` | 구간을 균등 분할 | `np.linspace(0,1,5)` |
| `np.random.rand()` | 0~1 난수 배열 | `np.random.rand(2,3)` |

## (5) 배열 연산 (벡터화 연산)

> NumPy의 강점 중 하나는 **반복문 없이 배열 전체에 연산**을 적용할 수 있다는 점입니다.

```python
a = np.array([1, 2, 3])
b = np.array([10, 20, 30])

print(a + b)   # [11 22 33]
print(a * b)   # [10 40 90]
print(a ** 2)  # [1 4 9]
```

> **벡터화(vectorization)**: 루프 없이 빠르게 연산 수행

## (6) 배열 인덱싱 & 슬라이싱

```python
a = np.array([[1,2,3],
              [4,5,6],
              [7,8,9]])

print(a[0, 2])   # 1행 3열 → 3
print(a[1, :])   # 2행 전체 → [4 5 6]
print(a[:, 1])   # 2열 전체 → [2 5 8]
```

## (7) 배열 형태 변경 (reshape)

```python
a = np.arange(12)
b = a.reshape(3, 4)
print(b)
```

- 출력:

```
[[ 0  1  2  3]
 [ 4  5  6  7]
 [ 8  9 10 11]]
```

## (8) 유용한 수학 함수들

| `함수` | `설명` | `예시` |
| :---: | :---: | :---: |
| `np.sum()` | 합계 | `np.sum(a)` |
| `np.mean()` | 평균 | `np.mean(a)` |
| `np.std()` | 표준편차 | `np.std(a)` |
| `np.max()`, `np.min()` | 최대/최소 | `np.max(a)` |
| `np.dot()` | 행렬 곱 | `np.dot(a, b)` |

## (9) 브로드캐스팅 (Broadcasting)

> **서로 다른 shape의 배열 간 연산을 자동으로 확장해서 수행하는 기능**입니다.

```python
a = np.array([[1,2,3],
              [4,5,6]])
b = np.array([10,20,30])

print(a + b)
```

- 출력:

```
[[11 22 33]
 [14 25 36]]
```

> `b`가 자동으로 `(2,3)`으로 확장되어 연산됩니다.

## (10) NumPy는 왜 빠를까?

- 내부적으로 **C 언어로 구현**되어 있음
- **벡터화(vectorization)** 로 반복문 최소화
- **메모리 효율적** (연속된 메모리 블록 사용)

## (11) NumPy 실습

> 1. 설치

```bash
pip install numpy
```

> 2. 간단한 예제 — 평균 구하기

```python
import numpy as np

data = np.array([10, 20, 30, 40, 50])

print("평균:", np.mean(data))
print("표준편차:", np.std(data))
print("합계:", np.sum(data))
```

- 출력:

```
평균: 30.0
표준편차: 14.142135623730951
합계: 150
```

> 3. 정리

| `핵심 요소` | `설명` |
| :---: | :---: |
| **ndarray** | 다차원 수치 배열 객체 |
| **shape / ndim / dtype** | 배열의 구조 정보 |
| **벡터화 연산** | 빠르고 간결한 수학 연산 |
| **브로드캐스팅** | 서로 다른 크기의 배열 연산 지원 |
| **다양한 수학 함수** | 평균, 표준편차, 행렬 연산 등  |
