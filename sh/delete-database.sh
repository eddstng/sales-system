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
echo '============        DELETING DATABASE        ============'
echo '========================================================='
echo ''
echo '> ENTER USER PASSWORD TO CONTINUE' 
npm run db:start
echo ''
echo '> BACK UP DATABASE BEFORE DELETING?' 
echo '> Y/N?'
read -p "" -n 1 -r
echo
sleep 1
if [[ $REPLY =~ ^[Yy]$ ]]
then
    npm run db:backup
    sleep 1
else 
    echo ''
    echo '> NO BACKUP WILL BE MADE'
fi

echo ''
echo ''
echo '========================================================='
echo '============        DELETING DATABASE        ============'
echo '========================================================='
echo ''
echo '> DELETE DATABASE?' 
echo '> Y/N?'
read -p "" -n 1 -r
echo
sleep 1
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo ''
    echo "> CLICK 'Y' AND 'ENTER' TO CONTINUE" 
    echo ''
    docker-compose rm -s -v psql
    sleep 3
    echo ''
    echo '========================================================='
    echo '============   DELETING DATABASE - SUCCESS   ============'
    echo '========================================================='
    sleep 30 
else
    echo ''
    echo '========================================================='
    echo '============  DELETING DATABASE - CANCELLED  ============'
    echo '========================================================='
    sleep 30 
fi
