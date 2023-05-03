-- 2023.05.02 SQL

-- sample 스키마 생성
CREATE DATABASE sample;
-- sample 스키마 사용
USE sample;

-- test1 테이블 생성
CREATE TABLE test1 (
	id int primary key,
    name varchar(11),
    tel varchar(11)
    );
    
-- test1 테이블에 데이터 넣기
INSERT INTO test1
       VALUES (
			   1,
               'LEE',
               '01012345678'
               );
               
INSERT INTO test1
       VALUES (
			   2,
               'KIM',
               '01043135312'
               );
               
INSERT INTO test1
       VALUES (
			   3,
               'PARK',
               '01098765432'
               );
           
-- test1 의 모든 데이터 조회
SELECT * FROM test1;