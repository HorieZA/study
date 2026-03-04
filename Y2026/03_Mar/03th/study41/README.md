## Mariadb 구성하기

- Docker 볼륨 생성
```bash
docker volume create data-mariadb
```

- Docker Container 생성
```bash
docker run -d -p 3306:3306 -v data-mariadb:/var/lib/mysql -e MARIADB_ROOT_PASSWORD=1234 -e MARIADB_DATABASE=edu -e TZ=Asia/Seoul -e LC_ALL=en_US.UTF-8 --name mariadb mariadb:12.1.2
```

- Database Table 생성
```sql
CREATE TABLE edu.`melon`(
    `no`    	INT(11)				NOT NULL    COMMENT '멜론 번호'		AUTO_INCREMENT,
    `code`		VARCHAR(100)      NOT NULL    COMMENT '장르',
	 `id`    	INT(11)				NOT NULL    COMMENT '앨범 ID',
    `img`		VARCHAR(255)		NULL		   COMMENT '이미지',
    `title`		VARCHAR(100)      NOT NULL    COMMENT '타이틀', 
    `album`		VARCHAR(100)		NOT NULL    COMMENT '앨범명',
    `cnt`		INT(11)				NOT NULL    COMMENT '좋아요',
    `regDate`	DATETIME	   		NOT NULL    COMMENT '등록일자'		DEFAULT current_timestamp(),
    `modDate`	DATETIME 	      NOT NULL    COMMENT '수정일자'		DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`no`) USING BTREE
)
COMMENT='멜론차트'
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB;
```

- Table Insert문
```python
sql = f"""
    INSERT INTO edu.`melon` 
    (`id`, `code`, `img`, `title`, `album`, `cnt`)
    VALUE
    ('{id}', '{code}', '{img}', '{title}', '{album}', {cnt});
"""
```

- 장르 코드명
```sql
CREATE VIEW edu.`category` AS
SELECT 'GN0100' AS `code`, '발라드' AS `name`
UNION ALL
SELECT 'GN0200' AS `code`, '댄스' AS `name`
UNION ALL
SELECT 'GN0300' AS `code`, '랩/힙합' AS `name`
UNION ALL
SELECT 'GN0400' AS `code`, 'R&B/Soul' AS `name`
UNION ALL
SELECT 'GN0500' AS `code`, '인디음악' AS `name`
UNION ALL
SELECT 'GN0600' AS `code`, '록/메탈' AS `name`
UNION ALL
SELECT 'GN0700' AS `code`, '트로트' AS `name`
UNION ALL
SELECT 'GN0800' AS `code`, '포크/블루스' AS `name`;
```

- 장르 코드명 연결하여 불러오기
```sql
SELECT n.`name`, s.`code`, COUNT(*) AS cnt
FROM edu.`melon` AS s
INNER JOIN edu.`category` AS n
ON (s.`code` = n.`code`)
GROUP BY n.`name`, s.`code`
ORDER BY 2;
```
