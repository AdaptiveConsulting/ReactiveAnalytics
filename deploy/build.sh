#!/bin/sh
#
# Automatically builds the project and pushes it to Google Cloud.
# The host that runs this script should have access to Google Cloud resources with a valid account.

########################################################################################
# Variables:
#   $1 -> Gets the value of the relevant domain to be replaced everywhere.
########################################################################################

version="${1}"
external_ip="${2}"
domain_name="${3}"

sh replace-hostname.sh "$domain_name"

sed -i 's|__VERSION__|'"$version"'|g' deployment.yaml client-nginx-cm.yaml
sed -i 's|__EXTERNAL_IP__|'"$external_ip"'|g' service.yaml client-nginx-cm.yaml
sed -i 's|__DOMAIN_NAME__|'"$domain_name"'|g' service.yaml client-nginx-cm.yaml

cd .. \
    && lerna bootstrap

cd client/ \
    && npm run build

sed -i -e 's/"client", //g' ../lerna.json

# Containerize the project
docker build -t eu.gcr.io/adaptive-reactive-analytics/insights:"$version" ../

# Push container artifact to Google Cloud
# For local tests, when working on Windows, this will not work if gcloud command is setted with the .cmd workaround.
gcloud docker -- push eu.gcr.io/adaptive-reactive-analytics/insights:"$version"
