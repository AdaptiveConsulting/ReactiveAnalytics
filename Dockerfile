# BUILD LOCAL
FROM node:8.11.3-alpine as localhost_builder

RUN       npm install --global lerna
COPY      . /app
WORKDIR   /app
RUN       rm -rf native deploy docs
CMD       yarn start
