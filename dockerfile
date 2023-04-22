FROM node:18-alpine AS compilation

WORKDIR /compile

COPY . .

RUN yarn

RUN yarn tsc

#stage 2

FROM node:18-alpine

WORKDIR /app

COPY  --from=compilation  /compile/dist ./dist

COPY package.json .

COPY yarn.lock .

RUN yarn --production

COPY bin ./bin

COPY public ./public

COPY views  ./views

COPY .env .

CMD ["node", "bin/www"]

EXPOSE 3000