#!/bin/bash

# sed -i 's/localhost/35.195.236.145/g' main.fffd4622.js
# sed -i 's/localhost/35.195.236.145/g' main.fffd4622.js.map

sed -i 's/localhost/35.195.236.145/g' ../client/public/app.json
sed -i 's/localhost/35.195.236.145/g' ../client/public/start.html
sed -i 's/localhost/35.195.236.145/g' ../client/src/apollo/client.js
sed -i 's/localhost/35.195.236.145/g' ../native/src/apollo/client.js
sed -i 's/localhost/35.195.236.145/g' ../server/src/index.js
sed -i 's/localhost/35.195.236.145/g' ../.graphqlconfig
sed -i 's/localhost/35.195.236.145/g' ../.graphqlrc
sed -i 's/localhost/35.195.236.145/g' ../graphql.config.json
