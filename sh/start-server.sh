#!/bin/bash
echo '========================================================='
echo '============         STARTING SEVER          ============'
echo '========================================================='
echo ''
echo '> ENTER USER PASSWORD TO CONTINUE...' 
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
echo ''
echo ''
echo ''
echo ''
echo ''
echo ''
echo ''
sudo service postgresql stop && yes | docker-compose stop psql && docker-compose up -d psql
sleep 2
PGPASSWORD=$(grep PGPASSWORD .env | cut -d '=' -f2) psql -h localhost -U sales_system_db -f ../dumps/latest/items.sql | PGPASSWORD=$(grep PGPASSWORD .env | cut -d '=' -f2) psql -h localhost -U sales_system_db -f ../dumps/latest/customers.sql
nodemon src/app.ts --exec ts-node
