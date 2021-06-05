FROM node:15.13.0-alpine3.10

WORKDIR /usr/st1202/backend

ADD ./app/package.json ./
ADD ./app/package-lock.json ./
RUN apk add bash && npm i && npm i -g @nestjs/cli 

EXPOSE 3000