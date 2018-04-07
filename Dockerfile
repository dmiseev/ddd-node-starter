FROM node:8.9-alpine

RUN apk add --no-cache make gcc g++ python git bash
RUN apk add --no-cache vips-dev fftw-dev --repository https://dl-3.alpinelinux.org/alpine/edge/testing/

RUN npm install -g wait-port
RUN npm install -g ts-node
RUN npm install -g typescript
RUN npm install -g typeorm

EXPOSE 3000 3100 3200