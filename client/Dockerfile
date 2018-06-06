# BUILD CLIENT
FROM alpine:edge as client_builder
ARG DOMAIN_NAME=adaptivecluster.com
RUN apk update         \
 && apk add nodejs     \
            nodejs-npm \
            yarn
RUN npm install --global lerna
COPY . /app
WORKDIR /app
RUN sh deploy/replace-client-hostnames.sh $DOMAIN_NAME
RUN lerna bootstrap
RUN cd client && npm run build

# CREATE CLIENT ARTIFACT
FROM nginx:alpine
LABEL maintainer="Lluis Marquez - lluis@weareadaptive.com"
RUN mkdir -p /etc/nginx/ssl
WORKDIR /app
COPY --from=client_builder /app/client/build                       /usr/share/nginx/html/
COPY --from=client_builder /app/common                             /usr/share/nginx/html/common/
COPY --from=client_builder /app/deploy/nginx-boot.sh   /app/nginx-boot.sh
RUN chmod +x /app/nginx-boot.sh
CMD ["sh", "-c", "/app/nginx-boot.sh"]

# docker build --no-cache -t eu.gcr.io/adaptive-reactive-analytics/insights-client:dev -f client/Dockerfile --build-arg DOMAIN_NAME=dev-insights.adaptivecluster.com" .