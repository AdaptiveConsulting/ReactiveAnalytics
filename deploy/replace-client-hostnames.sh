#!/bin/sh

domain_name="${1}"

if [ "$domain_name" = "localhost" ]; then
    exit 0
fi

# Replaces all HTTP paths until a slash to https://domain_name
sed -i -e 's|http:\/\/[^/]*|https:\/\/'"$domain_name"'|g' \
    client/public/start.html       \
    client/public/app.json         \
    client/src/apollo/client.js    \
    .graphqlconfig                 \
    .graphqlrc                     \
    graphql.config.json

# Replaces all Websocket ws://string until a slash to wss://domain_name
sed -i -e 's|ws:\/\/[^/]*|wss:\/\/'"$domain_name"'|g'     \
    client/src/apollo/client.js    \
    .graphqlconfig
