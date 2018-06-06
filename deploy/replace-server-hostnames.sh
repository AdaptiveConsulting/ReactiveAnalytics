#!/bin/sh

domain_name="${1}"

# Replaces all HTTP paths until the ` delimiter to https://domain_name
sed -i -e 's|http:\/\/[^`]*|https:\/\/'"$domain_name"'|g' \
    server/src/index.js            \
    .graphqlrc                     \
    .graphqlconfig                 \
    graphql.config.json

# Replaces all Websocket ws://string until a slash to wss://domain_name
sed -i -e 's|ws:\/\/[^/]*|wss:\/\/'"$domain_name"'|g'     \
    server/src/index.js            \
    .graphqlconfig