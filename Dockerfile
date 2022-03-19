FROM node:alpine

LABEL "author"="ngthuongdoan"
LABEL "author.email"="ngthuongdoan@gmail.com"
LABEL "description"="This is a server for my netflit clone"

RUN mkdir /usr/node-server && chown -R node:node /usr/node-server

WORKDIR /usr/node-server

COPY ./ ./
RUN yarn install --pure-lockfile
RUN yarn generate

USER node
COPY --chown=node:node . .

EXPOSE 5000
# CMD ["dist/src/index.js"]
