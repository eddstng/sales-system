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
echo '> BACK UP DATABASE?' 
echo '> Y/N?'
read -p "" -n 1 -r
echo
sleep 1
if [[ $REPLY =~ ^[Yy]$ ]]
then
    cd /home/eddstng/Work/sales-system/server
    npm run db:backup
    sleep 30 
else
    echo ''
    echo '========================================================='
    echo '============     BACKING UP - CANCELLED      ============'
    echo '========================================================='
    sleep 30 
fi
