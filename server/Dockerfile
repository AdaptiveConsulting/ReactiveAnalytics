# BUILD SERVER
FROM alpine:edge as server_builder
ARG DOMAIN_NAME=adaptivecluster.com
RUN apk update         \
 && apk add nodejs     \
            nodejs-npm \
            yarn
COPY . /app
WORKDIR /app
RUN sh deploy/replace-server-hostnames.sh $DOMAIN_NAME
RUN cd /app/server && yarn install

# CREATE SERVER ARTIFACT
FROM node:9-alpine
LABEL maintainer="Lluis Marquez - lluis@weareadaptive.com"
WORKDIR /app/server

COPY --from=server_builder /app/server                /app/server
COPY --from=server_builder /app/.graphqlconfig        /app/.graphqlconfig
COPY --from=server_builder /app/graphql.config.json   /app/graphql.config.json
COPY --from=server_builder /app/.graphqlrc            /app/.graphqlrc
COPY --from=server_builder /app/app.json              /app/app.json


CMD ["yarn", "start"]

# docker build --no-cache -t eu.gcr.io/adaptive-reactive-analytics/reactive-analytics-server:0.0.1 -f server/Dockerfile --build-arg DOMAIN_NAME="$domain_name.adaptivecluster.com" .
