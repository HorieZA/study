# DataBaseStudy

+ [MariaDB](https://mariadb.org/)
+ [Documentation](https://mariadb.org/documentation/)
+ [HeidiSQL](https://www.heidisql.com/download.php#google_vignette)
+ [Docker Image](https://hub.docker.com/_/mariadb)

## DB와 DBMS
1. Database (DB)
+ 논리적으로 연관된 데이터를 모아 일정한 형태로 저장하는 곳
+ 응용 시스템들이 공용(Shared)으로 사용하기 위하여 통합(Integrated), 저장(Stored)한 데이터 집합
+ [위키백과 링크](https://ko.wikipedia.org/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4)

2. Database Management System (DBMS)
+ 데이터베이스 관리 프로그램
+ DBMS를 이용하여 데이터 입력(Insert), 수정(Update), 삭제(Delete) 등의 기능을 제공
+ [위키백과 링크](https://ko.wikipedia.org/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4_%EA%B4%80%EB%A6%AC_%EC%8B%9C%EC%8A%A4%ED%85%9C)

3. Relational Database (RDB)
+ 데이터를 열과 행으로 구성하여 테이블로 관리
+ 고유키는 각 행을 식별 (기본키, PK)
+ 데이터는 행 단위로 저장되며, 각 항목의 속성은 열로 표현한다
+ 테이블간의 관계를 이용하여 데이터를 이용한다.
+ [위키백과 링크](https://ko.wikipedia.org/wiki/%EA%B4%80%EA%B3%84%ED%98%95_%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4)

4. 관계형 데이터베이스 종류
+ [Oracle](https://www.oracle.com/kr/)
+ [MS SQL Server](https://www.microsoft.com/ko-kr/sql-server)
+ [IBM DB2](https://www.ibm.com/kr-ko/db2)
+ [Sybase](https://www.sap.com/korea/products/acquired-brands/what-is-sybase.html)
+ [MySQL](https://www.mysql.com/)
+ [MariaDB](https://mariadb.org/)

<img src="./images/db-ranking.png" width="1920"></img>

## HeidiSQL 알아보기
1. HeidiSQL를 이용하여 접속하기 
+ HeidiSQL 실행 후  `신규` 버튼 클릭
<img src="./images/c-step1.png" width="1920"></img>

2. MariaDB 접속 정보 입력 후 `저장` 버튼 클릭
<img src="./images/c-step2.png" width="1920"></img>

3. `열기` 버튼 클릭하여 접속

## MariaDB 알아보기 (SQL)
+ DDL : 데이터 정의 언어
+ DML : 데이터 조작 언어
+ DCL : 데이터 제어 언어

1. DDL
+ 생성 (CREATE) : 데이터베이스, 사용자, 테이블

2. DML (CRUD)
+ 입력 (INSERT) : 테이블에 데이터 추가 하기
+ 검색 (SELECT) : 테이블에 있는 데이터 읽어 오기
+ 수정 (UPDATE) : 테이블에 있는 데이터 수정 하기
+ 삭제 (DELETE) : 테이블에 있는 데이터 행 삭제 하기

3. DCL 
+ 권한 (GRANT) : DDL에서 생성한 사용자의 접속 및 제어 권한 부여
+ 권한삭제 (REVOKE) : GRANT로 부여한 권한 삭제
+ 적용 (COMMIT) : 트렌젝션에서 발생한 데이터 조작(검색X)에 대하여 저장 하라는 명령어
+ 취소 (ROLLBACK) : 트렌젝션에서 발생한 데이터 조작의 내용을 취소 하라는 명령어

## [MARIADB DATA TYPE](https://mariadb.com/kb/en/data-types/)
+ [정수형](https://mariadb.com/kb/en/data-types-numeric-data-types/)
+ [문자형](https://mariadb.com/kb/en/string-data-types/)
+ [날짜형](https://mariadb.com/kb/en/date-and-time-data-types/)
- 기타
    - [AUTO INCREMENT](https://mariadb.com/kb/en/auto_increment/)
    - [NULL Values](https://mariadb.com/kb/en/null-values/)

## DML 작성법
+ [INSERT 알아보기](https://mariadb.com/kb/en/insert/)
```sql
INSERT INTO [테이블명] ( [컬럼명] ) VALUE ( [값] );
```

+ [UPDATE 알아보기](https://mariadb.com/kb/en/update/)
```sql
UPDATE [테이블명] SET [컬럼명] = [값] WHERE [조건식]
```

+ [DELETE 알아보기](https://mariadb.com/kb/en/delete/)
```sql
DELETE FROM [테이블명] WHERE [조건식]
```

+ [SELECT - OPERATORS 알아보기](https://mariadb.com/kb/en/operators/)
```sql
SELECT [컬럼명] FROM [테이블명] WHERE [조건식]
```

+ [SELECT - ORDER BY 알아보기](https://mariadb.com/kb/en/order-by/)
```sql
SELECT [컬럼명] FROM [테이블명] ORDER BY [컬럼명 또는 인덱스]
```
> 정렬 키워드 : [ASC] or [DESC]

+ [SELECT - GROUP BY 알아보기](https://mariadb.com/kb/en/group-by/)
```sql
SELECT [컬럼명], [집계함수] FROM [테이블명] WHERE [조건식] GROUP BY [컬럼명]
```
> [함수 알아보기](https://mariadb.com/kb/en/built-in-functions/)
