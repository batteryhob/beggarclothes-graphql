FROM node

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN  yarn install
RUN  yarn global add nodemon
RUN  yarn global add babel-cli --ignore-engines
RUN  yarn add babel-cli babel-preset-env babel-preset-stage-3 --dev
RUN  yarn add @babel/preset-env --dev

EXPOSE 4000

CMD ["yarn", "start"]