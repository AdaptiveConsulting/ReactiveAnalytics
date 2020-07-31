FROM node:11.10-alpine as builder

ARG ANALYTICS_SERVER_HOST
ARG BUILD_VERSION

ENV REACT_APP_ANALYTICS_SERVER_HOST=${ANALYTICS_SERVER_HOST}
ENV REACT_APP_BUILD_VERSION=${BUILD_VERSION}

WORKDIR /
COPY . .
RUN npm ci --network-concurrency 1
RUN npm run build

FROM openresty/openresty:alpine-fat
EXPOSE 3000

# Copy website resourcees
COPY --from=builder /build /usr/local/openresty/nginx/html

# Install lua template engine
RUN /usr/local/openresty/luajit/bin/luarocks install lua-resty-template

# Copy nginx config
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
