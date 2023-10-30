FROM node:20-alpine

RUN export NODE_OPTIONS=--openssl-legacy-provider

RUN yarn set version 1.22.5
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install --silent --ignore-optional
RUN yarn add global serve
RUN yarn add global react-scripts@3.3.1 --silent --ignore-optional

CMD ["next", "dev"]