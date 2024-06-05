# Version of Node
FROM node:22-alpine as development

# working directory in container
WORKDIR /usr/src/app

# copy package.json and package-lock.json in container
COPY package*.json /usr/src/app/

# install all dependencies
RUN npm install

# copy entire sourceCode to directory in docker container
COPY . /usr/src/app/

RUN npm run build

FROM node:22-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node","dist/index.js"]