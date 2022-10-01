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
echo '============         STARTING SEVER          ============'
echo '========================================================='

echo ''
echo '> ENTER USER PASSWORD TO CONTINUE' 
npm run db:start
npm run db:import
nodemon src/app.ts --exec ts-node
