use edu;

show tables;

-- DDL
create table t1 (
    col1 int,
    col2 VARCHAR(10)
);


-- DML
INSERT into t1 (col1) value (1);

select * from t1;