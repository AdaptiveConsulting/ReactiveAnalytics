FROM nginx:alpine
MAINTAINER lluis@weareadaptive.com

RUN apk update --no-cache \
 && apk add --no-cache    \
    curl                  \
    nodejs                \
    yarn                  \
 && npm install --global lerna

RUN mkdir -p /etc/nginx/ssl

WORKDIR /app

COPY . .

COPY deploy/run.sh run.sh

CMD ["sh", "docker-boot.sh"]
