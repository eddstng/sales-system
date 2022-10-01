#!/bin/bash
echo ''
echo ''
echo ''
echo ''
echo ''
echo ''
echo ''
echo ''
echo ''
echo ''
echo '========================================================='
echo '============       BACKING UP DATABASE       ============'
echo '========================================================='
echo ''
echo '> SETTING UP DUMP DIRECTORIES'
mkdir ../dumps
mkdir ../dumps/latest
mkdir ../dumps/`date +%Y`
mkdir ../dumps/`date +%Y/%m`
mkdir ../dumps/`date +%Y/%m/%d`

echo ''
echo '> CREATING SQL DUMP FOR CUSTOM ITEMS IN DATABASE'
PGPASSWORD=salessystemdb psql -h localhost -U sales_system_db  -c 'drop table custom_items;'
PGPASSWORD=salessystemdb psql -h localhost -U sales_system_db  -c 'create table custom_items as select menu_id, price, name_eng, name_chn, category from items where category = 16;'
PGPASSWORD=salessystemdb pg_dump -h localhost -U sales_system_db --column-inserts --data-only --table=custom_items sales_system_db > ../dumps/latest/items.sql
sed -i 's/public.custom_items/public.items/g' ../dumps/latest/items.sql
echo 'items.sql saved to ../dumps/latest/'


echo ''
echo '> CREATING SQL DUMP FOR CUSTOMERS IN DATABASE'
PGPASSWORD=salessystemdb pg_dump -h localhost -U sales_system_db --column-inserts --data-only --table=customers sales_system_db > ../dumps/latest/customers.sql
echo 'customers.sql saved to ../dumps/latest/'

echo ''
echo '> SAVING ../DUMPS BY DATE'
echo 'item.sql saved to ../dumps/'`date +%Y/%m/%d/`
cp ../dumps/latest/items.sql ../dumps/`date +%Y/%m/%d/`
echo 'customers.sql saved to ../dumps/'`date +%Y/%m/%d/`
cp ../dumps/latest/customers.sql ../dumps/`date +%Y/%m/%d/`
docker exec -t postgres_db pg_dumpall -c -U postgres > ../dumps/`date +%Y/%m/%d/`full-`date +%H:%M:%S`.sql
# To import full database dump use `PGPASSWORD=postgres psql -h localhost -U postgres -f full.sql `
echo 'full-'`date +%H:%M:%S`'.sql saved to ../dumps/'`date +%Y/%m/%d/`
echo ''
echo '========================================================='
echo '============  BACKING UP DATABASE - SUCCESS  ============'
echo '========================================================='
