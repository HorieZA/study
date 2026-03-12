create view db_to_air.weeks as 
select * from 
(
	select 1 as 코드, '월요일' as 요일
	union all 
	select 2 as 코드, '화요일' as 요일
	union all 
	select 3 as 코드, '수요일' as 요일
	union all 
	select 4 as 코드, '목요일' as 요일
	union all 
	select 5 as 코드, '금요일' as 요일
	union all 
	select 6 as 코드, '토요일' as 요일
	union all 
	select 7 as 코드, '일요일' as 요일
) as t;

use db_to_air;

select 
	   STR_TO_DATE(CONCAT(CAST(a.년도 AS CHAR), CAST(a.월 AS CHAR), CAST(a.일 AS CHAR)), '%Y%m%d') as 날짜, 
	   w.요일, 
	   a.`항공편번호`, c1.설명 as 항공편명, 
	   a.`항공사코드`, c2.설명 as 항공사명,
	   a.`출발공항코드`, a1.`도시` as 출발도시, a1.`국가` as 출발국가,
	   a.`도착지공항코드`, a2.`도시` as 도착도시, a2.`국가` as 도착국가
  from db_air.`비행` as a 
  left outer join db_to_air.weeks as w
  on (a.요일 = w.코드)
  left outer join db_air.`운반대` as c1
  on (a.`항공편번호` = c1.`코드`)
  left outer join db_air.`운반대` as c2
  on (a.`항공사코드` = c2.`코드`)
  left outer join db_air.`항공사` as a1
  on (a.`출발공항코드` = a1.`항공사코드`)
  left outer join db_air.`항공사` as a2
  on (a.`도착지공항코드` = a2.`항공사코드`)
  where a.월 = 10 and a.`출발공항코드` = 'ATL'
  limit 5
;

select 
	   STR_TO_DATE(CONCAT(CAST(a.년도 AS CHAR), CAST(a.월 AS CHAR), CAST(a.일 AS CHAR)), '%Y%m%d') as 날짜, 
	   w.요일, 
	   a.`항공사코드`, c.설명 as 항공사명, a.`항공편번호`, 	   
	   a.`출발공항코드`, a1.`도시` as 출발도시, a1.`국가` as 출발국가,
	   a.`도착지공항코드`, a2.`도시` as 도착도시, a2.`국가` as 도착국가,
	   a.`비행거리`,
	   case when a.`우회여부` = 1 then '우회' else '직항' end as 우회여부
  from db_air.`비행` as a 
  left outer join db_to_air.weeks as w
  on (a.요일 = w.코드)
  left outer join db_air.`운반대` as c
  on (a.`항공사코드` = c.`코드`)
  left outer join db_air.`항공사` as a1
  on (a.`출발공항코드` = a1.`항공사코드`)
  left outer join db_air.`항공사` as a2
  on (a.`도착지공항코드` = a2.`항공사코드`)
  where a.월 = 10 
    and a.`항공사코드` = 'AA'
  	and a.`출발공항코드` = 'LAX'
  	and a.`도착지공항코드` = 'SFO'
  order by a.`비행거리` desc
;

select 
	   c.설명 as 항공사명,
	   sum(case when a.`우회여부` = 1 then 1 else 0 end) as 우회,
	   sum(case when a.`우회여부` = 1 then 0 else 1 end) as 직항
  from db_air.`비행` as a 
  left outer join db_to_air.weeks as w
  on (a.요일 = w.코드)
  left outer join db_air.`운반대` as c
  on (a.`항공사코드` = c.`코드`)
  left outer join db_air.`항공사` as a1
  on (a.`출발공항코드` = a1.`항공사코드`)
  left outer join db_air.`항공사` as a2
  on (a.`도착지공항코드` = a2.`항공사코드`)
  where a.월 = 10 
    and a.일 in (1,2,3,4,5,6,7)
    and a.`항공사코드` in (select `항공사코드` from db_air.`비행` t  group by `항공사코드`) 
  group by 항공사명
  order by 3 desc
  limit 10
;

select `항공사코드`, max(TIMEDIFF(실제출발시간, 예정출발시간)) as 최대출발지연시간 
from (
	select 
		`항공사코드`,
		STR_TO_DATE(LPAD(`예정출발시간`,4,'0'), '%H%i') as 예정출발시간,
		STR_TO_DATE(LPAD(`실제출발시간`,4,'0'), '%H%i') as 실제출발시간
	from db_air.`비행` where 일 = 1 
) as t
group by `항공사코드`
order by 2 desc
;

select 
	`항공사코드`,
	STR_TO_DATE(LPAD(`예정출발시간`,4,'0'), '%H%i') as 예정출발시간,
	STR_TO_DATE(LPAD(`실제출발시간`,4,'0'), '%H%i') as 실제출발시간,
	TIMEDIFF(실제출발시간, 예정출발시간)
from db_air.`비행` 
WHERE 일 = 1 and `항공사코드` = 'CO'
order by 4 desc
;


CREATE INDEX idx_flight_search
ON 비행 (년도, 요일, 도착지공항코드, 비행취소여부, 도착지연시간);


SELECT 
a.`년도`,
a.`월`,
a.`일`,
w.`요일`,
air.`항공사명` AS `출발항공사`,
a.`항공편번호`,
air.`도시` AS `출발 도시`,
c.`설명` AS `운반대설명`,
a.`도착지연시간`,
a.`도착지공항코드`
FROM db_air.`비행` AS a
INNER JOIN db_air.`요일` AS w
ON a.`요일` = w.`코드`
INNER JOIN db_air.`항공사` AS air
ON a.`출발공항코드` = air.`항공사코드`
INNER JOIN db_air.`운반대` AS c
ON a.`출발공항코드` = c.`코드`
WHERE a.`도착지연시간` >= 60
AND a.`비행취소여부` = 0
AND a.`도착지공항코드` = 'ORD'
AND a.`년도` = 1988
AND a.`요일` = 4
GROUP BY a.`도착지연시간`, w.`요일`, air.`도시`
ORDER BY a.`도착지연시간` DESC





-- 1.총 비행 수(일,월,년 기준), 정시 운행 완료 수, 비행 지연 수 + 사유, 비행 취소 수 +사유  정렬(일,월,년별)
-- 2.항공사별 정시 운행완료 수, 평균 지연시간+ 지연 수 + 사유, 비행 취소 수 + 사유, 우회 여부 수
-- 3.일,월,년별 평균 비행시간 +예정경과시간보다 실제 경과시간이 제일 긴 항공사 랭킹
-- 4.출발 공항별 지연율, 도착 공항별 지연수, 가장 바쁜 공항

SELECT  출발공항코드, count(*) as 총운항횟수 , avg(출발지연시간) from db_air.`비행` where 출발지연시간 != 'NA' group BY 출발공항코드 ORDER by 출발지연시간 desc
LIMIT 100;

SELECT 도착지공항코드, count(*) as 총운항횟수, avg(도착지연시간) from db_air.`비행` where 도착지연시간 != 'NA' group BY 도착지공항코드 ORDER by 도착지연시간 desc
LIMIT 100;

-- 5.가장 인기 있는 노선
SELECT
 출발공항코드,
 도착지공항코드,
 COUNT(*) AS flight_count
FROM db_air.`비행`
GROUP BY 출발공항코드,
 도착지공항코드
ORDER BY flight_count DESC
LIMIT 100;

-- 1. 항공편번호 → 노선별 항공편명을 말하는 것으로 보임
-- 6. 60분 이상 지연 조회
SELECT 년도, 월, 일, 항공사코드, 항공편번호, 도착지연시간
FROM db_air.`비행`
WHERE 도착지연시간 >= 60
ORDER BY 도착지연시간 DESC;

-- 7. 항공사별 평균 지연 시간 및 총 운항 횟수
SELECT
 출발공항코드,
 도착지공항코드,
 비행거리,
 count(*) as 총운항횟수,
 avg(도착지연시간) as 도착지연평균,
 avg(출발지연시간) as 출발지연평균
from db_air.`비행`
group by 출발공항코드
order by 도착지공항코드 DESC;

-- 8. 비행 거리가 2,000마일이 넘는 장거리 노선 중 어느 도시 및 국가에서 출발 했는지 거리순으로 확인
SELECT 
 DISTINCT A.출발공항코드, 
 A.도착지공항코드,
 B.도시, 
 B.국가,
 A.비행거리
FROM 비행 A
JOIN 항공사 B ON A.출발공항코드 = B.항공사코드 
WHERE A.비행거리 != 'NA'
 AND CAST(A.비행거리 AS SIGNED) > 2000 
ORDER BY CAST(A.비행거리 AS SIGNED) DESC;

-- 9. 비행 거리가 긴 순서대로 정렬하면서, 각 노선의 평균 도착 지연 시간
SELECT 
  A.출발공항코드, 
  A.도착지공항코드,
  B.도시 AS 출발도시, 
  A.비행거리,
  AVG(CAST(A.도착지연시간 AS SIGNED)) AS 평균도착지연
FROM 비행 A
JOIN 항공사 B ON A.출발공항코드 = B.항공사코드 
WHERE A.비행거리 != 'NA' 
 AND A.도착지연시간 != 'NA' 
 AND CAST(A.비행거리 AS SIGNED) > 2000 
GROUP BY A.출발공항코드, A.도착지공항코드, B.도시, A.비행거리
ORDER BY CAST(A.비행거리 AS SIGNED) DESC;

-- 10. 거리 구간별 지연 묶어보기
SELECT 
 -- 거리를 500마일 단위로 묶어서 그룹화 (예: 500, 1000, 1500...)
 (CAST(비행거리 AS SIGNED) DIV 500) * 500 AS 거리구간,
 COUNT(*) AS 운항건수,
 AVG(CAST(도착지연시간 AS SIGNED)) AS 구간평균지연
FROM 비행
WHERE 도착지연시간 != 'NA' AND 비행거리 != 'NA'
GROUP BY 거리구간
ORDER BY 거리구간;

-- 11. 요일별 평균 지연시간+운항횟수 (어느 요일에 타면 좋을까)
SELECT
 요일,
 COUNT(*) AS 요일별운항횟수,
 AVG(CAST(도착지연시간 AS SIGNED)) AS 평균도착지연,
 AVG(CAST(출발지연시간 AS SIGNED)) AS 평균출발지연
FROM 비행
WHERE 도착지연시간 != 'NA'
GROUP BY 요일
ORDER BY 요일별운항횟수 DESC;