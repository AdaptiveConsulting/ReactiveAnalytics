FROM node:carbon

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000
EXPOSE 4000

CMD ["sh", "cloud_bootstrap.sh"]
