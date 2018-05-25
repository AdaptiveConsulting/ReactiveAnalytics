#!/bin/sh

yarn start 2>&1 &

nginx -g "daemon off;" 2>&1 &
