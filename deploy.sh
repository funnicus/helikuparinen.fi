#!/bin/bash

# Script to deploy this site

EXIT_STATUS=0

if [ "$NODE_ENV"="prod"  ]; then
    echo -e "\n-------- Deploying production build...\n"
    cd helikuparinen.fi/ || EXIT_STATUS=$?
else
    echo -e "\n-------- Deploying beta build...\n"
    cd beta.helikuparinen.fi/ || EXIT_STATUS=$?
fi

git pull || EXIT_STATUS=$?

npm install || EXIT_STATUS=$?
npm i sharp --no-save || EXIT_STATUS=$?
npm run build || EXIT_STATUS=$?

if [ "$NODE_ENV"="prod"  ]; then
    pm2 restart prod || EXIT_STATUS=$?
    exit ${EXIT_STATUS}
fi

pm2 restart beta || EXIT_STATUS=$?
exit ${EXIT_STATUS}