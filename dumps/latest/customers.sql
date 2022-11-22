--
-- PostgreSQL database dump
--

-- Dumped from database version 13.8 (Debian 13.8-1.pgdg110+1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (1, 'Table #1', '0000000001', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (2, 'Table #2', '0000000002', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (3, 'Table #3', '0000000003', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (4, 'Table #12', '0000000012', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (5, 'Table #14', '0000000014', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (6, 'Table #15', '0000000015', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (7, 'Table #21', '0000000021', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (8, 'Table #32', '0000000032', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (9, 'Table #33', '0000000033', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (10, 'Table #34', '0000000034', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (11, 'Table #35', '0000000035', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (12, 'Table #36', '0000000036', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (13, 'David Wallace', '604-123-0987', NULL, 5340, 'Charleston Crt', 'Vancouver', NULL, '5340 Charleston Crt', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (14, 'Beatrix Harley', '604-421-1341', '910', 1022, 'Bearton St', 'Vancouver', NULL, '910-1022 Bearton St', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (15, 'Catherine Trix', '604-122-2114', NULL, 1391, 'Horton Ave', 'Vancouver', NULL, '1391 Horton Ave', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (16, NULL, '778-882-3903', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (17, NULL, '604-314-8808', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (18, NULL, '604-329-5208', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (57, NULL, '604-347-4409', '406', 950, 'Cassiar', NULL, NULL, '406 - 950 Cassiar', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (58, NULL, '604-889-6434', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (59, NULL, '604-338-1551', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (60, NULL, '604-202-2398', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (61, NULL, '604-723-8741', NULL, 6430, 'Kitchener', NULL, NULL, '6430 Kitchener', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (62, 'Tony', '604-816-5501', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (63, NULL, '604-291-6935', NULL, 4411, 'Georgia', NULL, 'BSM', '4411 Georgia', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (64, NULL, '778-321-6694', NULL, 4206, 'Venables', NULL, NULL, '4206 Venables', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (65, NULL, '604-299-1718', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (66, NULL, '778-879-8898', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (67, 'Peter/Margret', '604-433-7331', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (68, NULL, '604-298-3557', NULL, 3587, 'Triumph', NULL, NULL, '3587 Triumph', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (35, 'Pat', '604-916-5484', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (69, 'Shawn', '604-908-0566', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (70, NULL, '604-816-1692', NULL, 1517, 'Blaine Ave', NULL, NULL, '1517 Blaine Ave', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (71, NULL, '604-916-0253', NULL, 1061, 'Holdom', NULL, NULL, '1061 Holdom', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (72, NULL, '778-908-8233', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (73, NULL, '604-889-9880', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (19, 'Tony', '604-817-2749', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (20, NULL, '778-513-9349', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (21, NULL, '604-339-6720', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (22, NULL, '000-000-0000', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (23, NULL, '604-833-4520', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (24, NULL, '604-299-8106', NULL, 7051, 'Blaine Court', NULL, NULL, '7051 Blaine Court', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (25, NULL, '604-603-1805', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (26, NULL, '778-951-6045', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (27, NULL, '604-970-7214', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (28, NULL, '778-822-0791', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (29, NULL, '604-355-1423', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (30, NULL, '604-307-5484', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (31, NULL, '778-899-9442', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (32, NULL, '778-223-0845', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (33, NULL, '604-291-9772', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (34, NULL, '604-355-6747', '801', 3760, 'Albert', NULL, '8910', '801 - 3760 Albert', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (36, NULL, '604-312-6954', NULL, 5270, 'Pandora', NULL, NULL, '5270 Pandora', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (37, NULL, '604-291-9279', NULL, 4760, 'Pandora', NULL, NULL, '4760 Pandora', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (38, NULL, '306-741-7757', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (39, NULL, '250-814-4434', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (40, NULL, '236-877-8760', '326', 3475, 'Hasting', NULL, NULL, '326 - 3475 Hasting', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (41, NULL, '604-754-4644', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (42, NULL, '604-761-3593', '305', 1955, 'Woodway Place', NULL, '5014', '305 - 1955 Woodway Place', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (43, NULL, '604-298-4388', '119', 3550, 'Adanac', NULL, NULL, '119 - 3550 Adanac', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (44, NULL, '604-992-3610', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (45, 'Dave', '604-291-2056', NULL, 1135, 'Holdom', NULL, NULL, '1135 Holdom', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (46, NULL, '604-299-7958', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (47, NULL, '604-837-3900', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (48, NULL, '604-908-1896', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (49, NULL, '604-318-9183', NULL, 3676, 'Yale', NULL, NULL, '3676 Yale', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (50, NULL, '236-509-1921', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (51, NULL, '778-837-7452', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (52, NULL, '604-299-6118', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (53, NULL, '604-970-5181', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (54, NULL, '604-298-2115', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (55, NULL, '778-788-2723', '43', 3550, 'Adanac', NULL, NULL, '43 - 3550 Adanac', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (56, NULL, '604-418-4367', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (74, NULL, '604-351-3060', NULL, 3847, 'Yale St', NULL, NULL, '3847 Yale St', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (75, 'Jeff', '604-298-1086', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (76, NULL, '778-668-7854', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (77, NULL, '604-808-3009', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (78, NULL, '604-868-2070', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (79, 'Angela', '604-834-3646', NULL, 75, 'Rosser', NULL, NULL, '75 Rosser', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (80, NULL, '778-833-1542', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (81, NULL, '778-939-7661', NULL, 1025, 'Ingleton Ave', NULL, NULL, '1025 Ingleton Ave', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (82, NULL, '604-970-0133', '4402', 1888, 'Gilmore Ave', NULL, '1315', '4402 - 1888 Gilmore Ave', NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (83, NULL, '604-728-7601', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.customers (id, name, phone, unit_number, street_number, street_name, city, buzzer_number, address, note) VALUES (84, 'Mr. Wong', '604-298-8292', NULL, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', (SELECT MAX(id) FROM public.customers));

--
-- PostgreSQL database dump complete
--

