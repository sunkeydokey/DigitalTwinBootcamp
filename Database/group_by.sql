-- 스키마 생성 후 폴더 파일 임포트
CREATE DATABASE market_db;

USE market_db;

SELECT * FROM market_db.member;

-- GROUP BY
SELECT mem_name FROM market_db.member GROUP BY mem_id;
SELECT * FROM market_db.member GROUP BY mem_id;
SELECT mem_name, mem_number 
	   FROM market_db.member 
       GROUP BY mem_id;

SELECT height FROM market_db.member GROUP BY height;
SELECT mem_name 
	   FROM market_db.member 
	   GROUP BY height; -- 오류
       
SELECT mem_name, height 
	   FROM market_db.member 
       ORDER BY height DESC;
       
SELECT addr, mem_name, mem_number
	   FROM market_db.member 
       GROUP BY addr, mem_name, mem_number;
       
SELECT * FROM buy;
SELECT prod_name,
	   MAX(PRICE) AS maximum 
	   FROM buy 
	   GROUP BY prod_name;
       
SELECT prod_name, 
	   MIN(price) AS minimum,
       AVG(price) AS average
       FROM buy
       GROUP BY prod_name;
       
SELECT prod_name, 
	   MIN(price) AS minimum,
       CEIL(AVG(price)) AS average_ceiled
       FROM buy
       GROUP BY prod_name;
       
SELECT prod_name, 
	   COUNT(price) AS count,
       SUM(price) AS sum
       FROM buy
       GROUP BY prod_name;

SELECT addr, COUNT(*) FROM member GROUP BY addr;
SELECT addr, 
	   AVG(height) AS height_avg 
       FROM member 
       GROUP BY addr;
SELECT addr,
	   MAX(height) AS height_max 
       FROM member 
       GROUP BY addr;
SELECT addr,
	   MAX(height) AS height_max, 
       MIN(height) AS height_min 
       FROM member 
       GROUP BY addr;
