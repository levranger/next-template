FROM timbru31/node-alpine-git:12

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --no-progress --frozen-lockfile

COPY . .
RUN yarn build

RUN yarn install --no-progress --production --frozen-lockfile

CMD yarn start
