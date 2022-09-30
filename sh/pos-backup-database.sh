#!/bin/bash

echo '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
echo '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
echo '!!!                 BACKING UP DATABASE                 !!!'
echo '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
echo "!!!            CLICK 'Y' TO START THE PROCESS.          !!!"
echo '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
echo '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
read -p "" -n 1 -r
echo
sleep 2
if [[ $REPLY =~ ^[Yy]$ ]]
then
    cd /home/eddstng/Work/sales-system/server
    npm run db:backup
    sleep 30 
fi
