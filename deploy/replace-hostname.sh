#!/bin/sh
#
# This script replaces the relevant hardcoded hostnames for their relevant environments.
# TODO: Handle hostnames without seds.

########################################################################################
# Variables:
#   $1 -> Gets the value of the relevant domain to be replaced everywhere.
########################################################################################

# Replacements:

## client/public/start.html
### http://localhost:3000                -> https://domain_name.adaptivecluster.com

## client/public/app.json
### http://localhost:3000                -> https://domain_name.adaptivecluster.com

## client/src/apollo/client.js
### ws://localhost:${PORT}/subscriptions -> wss://domain_name.adaptivecluster.com/subscriptions
### http://localhost:${PORT}/graphql     -> https://domain_name.adaptivecluster.com/graphql

## server/src/index.js
### http://localhost:${PORT}             -> ??? https://domain_name.adaptivecluster.com
### http://localhost:${CLIENT_PORT}      -> ??? https://domain_name.adaptivecluster.com
### ws://localhost:${PORT}/subscriptions -> wss://domain_name.adaptivecluster.com/subscriptions
### http://localhost:${PORT}             -> https://domain_name.adaptivecluster.com

## native/src/apollo/client.js
### ws://localhost:${PORT}/subscriptions -> wss://domain_name.adaptivecluster.com/subscriptions
### http://localhost:${PORT}/graphql     -> https://domain_name.adaptivecluster.com/graphql

## .graphqlconfig
### http://localhost:4000/graphql        -> https://domain_name.adaptivecluster.com/graphql
### ws://localhost:4000/subscriptions    -> wss://domain_name.adaptivecluster.com/subscriptions

## .graphqlrc
#### http://localhost:4000/graphql       -> https://domain_name.adaptivecluster.com/graphql

## graphql.config.json
### http://localhost:4000/graphql        -> https://domain_name.adaptivecluster.com/graphql
### http://localhost:8080/graphql        -> https://domain_name.adaptivecluster.com/graphql

domain_name="${1}"

# Replaces all HTTP paths until a slash to https://domain_name
sed -i -e 's|http:\/\/[^/]*|https:\/\/'"$domain_name"'|g' \
    ../client/public/start.html       \
    ../client/public/app.json         \
    ../client/src/apollo/client.js    \
    ../native/src/apollo/client.js    \
    ../.graphqlconfig                 \
    ../.graphqlrc                     \
    ../graphql.config.json

# Replaces all Websocket ws://string until a slash to wss://domain_name
sed -i -e 's|ws:\/\/[^/]*|wss:\/\/'"$domain_name"'|g'     \
    ../client/src/apollo/client.js    \
    ../server/src/index.js            \
    ../native/src/apollo/client.js    \
    ../.graphqlconfig

# Replaces all HTTP paths until the ` delimiter to https://domain_name
sed -i -e 's|http:\/\/[^`]*|https:\/\/'"$domain_name"'|g' \
    ../server/src/index.js
