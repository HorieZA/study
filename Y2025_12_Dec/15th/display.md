## 1. Flex

`display: flex` 또는 `display: inline-flex`를 지정한 컨테이너 안에서 아이템들을 **유연하게( flexible )** 배치하는 방식입니다.

* 수평/수직 중앙 정렬이 어려움
* 요소 간 간격 일정하게 배치하기 어려움
* 아이템이 넘칠 때 줄바꿈이 어려움
* 레이아웃을 반응형으로 쉽게 만들기 어려움

## 2. Grid

`display: grid` 또는 `display: inline-grid`를 선언한 **부모 요소** 의 Container 안에서 Grid 레이아웃 규칙이 적용됩니다.


### Flex : flex-grow (유연하게 늘리기)
```css
flex-grow: 1;
flex-grow: 0;  /* 기본값 */
```

### Flex : align-items (수직축 방향 정렬)
```css
align-items: stretch;
align-items: flex-start;
align-items: flex-end;
align-items: center;
align-items: baseline;
```

### Flex : align-content (여러 행 정렬). > flex-wrap: wrap; 설정 후 사용
```css
align-content: stretch;
align-content: flex-start;
align-content: flex-end;
align-content: center;
align-content: space-between;
align-content: space-around;
align-content: space-evenly;
```

### Flex : justify-content (메인축 방향 정렬)
```css
justify-content: flex-start;
justify-content: flex-end;
justify-content: center;
justify-content: space-between;
justify-content: space-around;
justify-content: space-evenly;
```

### Flex : flex-direction (배치 방향 설정)
```css
flex-direction: row;
flex-direction: column;
flex-direction: row-reverse;
flex-direction: column-reverse;
```
