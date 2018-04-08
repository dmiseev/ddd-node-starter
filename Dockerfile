FROM node:8.9-alpine

RUN apk add --no-cache make gcc g++ python git bash

RUN npm install -g typescript
RUN npm install -g typeorm

EXPOSE 3000