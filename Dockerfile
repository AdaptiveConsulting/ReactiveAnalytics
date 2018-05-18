FROM node:carbon

RUN apt-get install nginx

WORKDIR /usr/src/app

COPY . .

CMD ["sh", "-c", "tail -f /dev/null"]
# CMD ["sh", "cloud_bootstrap.sh"]
