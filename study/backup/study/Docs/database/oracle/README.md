# Oracle 알아보기

1. 교육 데이터베이스 사용하기
+ [Oracle XE](https://www.oracle.com/kr/database/technologies/appdev/xe.html)
+ [Docker](https://hub.docker.com/r/oracleinanutshell/oracle-xe-11g)

## Docker를 이용하여 Oracle XE 사용하기
+ 이미지 검색
```cmd
docker search oracle-xe-11g
``` 
+ 이미지 pull 하기
```cmd
docker pull oracleinanutshell/oracle-xe-11g
```
+ 컨테이너 생성
```cmd
docker run -d -p 1521:1521 --name oracle oracleinanutshell/oracle-xe-11g
```
+ 컨테이너 접속하여 
```cmd 
docker exec -it oracle bash
```
+ Oracle 실행하기 (SQLPLUS) - 리눅스 영역
```cmd
sqlplus
```
> * username : system
> * password : oracle


