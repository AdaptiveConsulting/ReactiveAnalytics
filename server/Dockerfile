FROM node:12-alpine as builder

ARG BUILD_VERSION

ENV BUILD_VERSION=${BUILD_VERSION}

WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile --non-interactive
RUN yarn run build

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app/lib                   ./lib
COPY --from=builder /app/node_modules          ./node_modules
COPY --from=builder /app/.graphqlconfig        ./
COPY --from=builder /app/graphql.config.json   ./
COPY --from=builder /app/.graphqlrc            ./
COPY --from=builder /app/package.json          ./

CMD ["npm", "run", "start:prod"]
