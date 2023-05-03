-- SELECT column, column FROM table
-- WHERE 조건
-- ORDER BY 정렬
-- LIMIT 조건

-- SAKILA 스키마에서 actor 테이블의 모든 내용 조회
USE sakila;
SELECT * FROM actor;

-- actor 테이블의 LIMIT n
SELECT * FROM actor
		 LIMIT 20; -- 상위 데이터 n개만 나옴
         
-- 개수 세기
SELECT COUNT(first_name) FROM actor;

-- 중복 제거한 데이터 조회
SELECT DISTINCT(last_name) FROM actor;
SELECT COUNT(DISTINCT(last_name)) FROM actor;