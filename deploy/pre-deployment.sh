#!/bin/bash

sed -i 's/localhost/35.233.20.204/g' ../client/public/app.json
sed -i 's/localhost/35.233.20.204/g' ../client/public/start.html
sed -i 's/localhost/35.233.20.204/g' ../client/src/apollo/client.js
sed -i 's/localhost/35.233.20.204/g' ../native/src/apollo/client.js
sed -i 's/localhost/35.233.20.204/g' ../server/src/index.js
sed -i 's/localhost/35.233.20.204/g' ../.graphqlconfig
sed -i 's/localhost/35.233.20.204/g' ../.graphqlrc
sed -i 's/localhost/35.233.20.204/g' ../graphql.config.json
