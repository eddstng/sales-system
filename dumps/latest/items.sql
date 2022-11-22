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
-- Data for Name: custom_items; Type: TABLE DATA; Schema: public; Owner: sales_system_db
--

INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 24.5, 'BBQ Duck (HALF)', '燒鴨 (半隻)', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 9.50, 'Spicy Wonton (S)', '红油抄手 (小)', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 12.75, 'Spicy Wonton (L)', '红油抄手 (大)', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 16.95, 'DF Tofu Spicy', '椒鹽豆腐', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 19.5, 'DF Cod Spicy', '椒鹽斑塊', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 19.50, 'Chicken Wings', '红烧雞翼', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 19.50, 'Chicken Wings Spicy', '椒盐雞翼', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 16.5, 'Garlic Kai Lan', '蒜蓉芥蘭', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 16.5, 'Garlic Bok Choy', '蒜蓉白菜', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 16.5, 'Garlic Grn Bean', '蒜蓉豆仔', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 16.5, 'Seshuan Grn Bean', '干煸四季豆', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 17.50, 'Grn Bean with Bean Curd Sauce', '腐乳豆仔', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 17.95, 'Chn Mushroom Broccoli', '北菰百加利', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 18.95, 'Scallop Egg White Fried Rice', '瑤柱蛋白炒飯', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 12.75, '3 Kind Shred Meat CM (CRISPY)', '三絲炒麵', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 12.75, '3 Kind Shred Meat CM (DRY)', '三絲炒麵 (干)', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 12.75, '3 Kind Shred Meat CM (SOFT)', '三絲炒麵 (軟)', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 12.75, 'Beef Grn Pepper BB CM (CRISPY)', '豉椒牛肉炒麵', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 12.75, 'Beef Grn Pepper BB CM (DRY)', '豉椒牛肉炒麵 (干)', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 12.75, 'Beef Grn Pepper BB CM (SOFT)', '豉椒牛肉炒麵 (軟)', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 13.75, 'Chkn Grn Pepper BB CM (CRISPY)', '豉椒雞球炒麵', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 13.75, 'Chkn Grn Pepper BB CM (DRY)', '豉椒雞球炒麵 (干)', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 13.75, 'Chkn Grn Pepper BB CM (SOFT)', '豉椒雞球炒麵 (軟)', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 13.75, 'Beef Broccoli BB CM (CRISPY)', '豉汁百加利牛肉炒麵', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 13.75, 'Beef Broccoli BB CM (DRY)', '豉汁百加利牛肉炒麵 (干)', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 13.75, 'Beef Broccoli BB CM (SOFT)', '豉汁百加利牛肉炒麵 (軟)', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 20.50, 'Prawns Broccoli', '虾球百加利', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 20.50, 'Cod Mx Veg', '斑球雜菜', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 9.99, 'Shred Chkn CM (SP)', '', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 20.50, 'Steam Fish', '蒸魚', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 25.50, 'Steam Fish Tofu Ginger Onion', '蒸魚加豆腐', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 22.5, 'Mountain Tofu', '鯨山豆腐', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 2.25, 'Side Black Bean Sauce ', '細豉汁', 16);
INSERT INTO public.items (menu_id, price, name_eng, name_chn, category) VALUES (0, 2.25, 'Side Ginger Oil', '姜葱油', 16);


--
-- PostgreSQL database dump complete
--

