#!/bin/sh

echo "Executing yarn start command..." >&2
yarn start 2>&1 &

echo "Running NGINX..." >&2
nginx -g "daemon off;" 2>&1 &
