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

RUN ls -la

CMD ["sh", "-c", "/app/run.sh"]
