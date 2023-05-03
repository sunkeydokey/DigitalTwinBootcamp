-- DATABASE 생성 후 실습파일 임포트
CREATE DATABASE testdb;
USE testdb;

SELECT last_name, COUNT(last_name) AS count
	   FROM actor
       GROUP BY last_name;
       
SELECT last_name, COUNT(last_name) AS count
	   FROM actor
       GROUP BY last_name
       ORDER BY last_name DESC;


SELECT last_name, first_name
	   FROM actor
       GROUP BY last_name, first_name
       ORDER BY last_name;
       
SELECT last_name, first_name
	   FROM actor
       ORDER BY last_name, first_name;
       
SELECT last_name, first_name 
	   FROM actor 
       GROUP BY last_name
       ORDER BY first_name; -- 오류
SELECT last_name, first_name 
	   FROM actor 
       GROUP BY last_name, first_name
       ORDER BY last_name, first_name;