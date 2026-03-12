show databases;

use mysql;

show tables;

use mysql;

select * from user;

-- 사용자 생성 > DDL 질의어를 사용한다.
-- 생성한다 사용자를 계정@호스트 비밀번호;
create user 'test'@'localhost' IDENTIFIED by '4321';
create user 'test1'@'localhost' IDENTIFIED by 'test1';

-- 권한 부여 하기 > DCL 질의어를 사용한다.
GRANT all on edu.* to 'test'@'localhost';

-- 권한 부여 후 적용 명령어 실행
flush PRIVILEGES;

use edu;

show tables;