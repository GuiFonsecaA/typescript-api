FROM node:18-slim

ENV HOME=/home/app

COPY package.json $HOME/type_script_api_docker/

WORKDIR $HOME/type_script_api_docker

RUN yarn && yarn cache clean

COPY . $HOME/type_script_api_docker

CMD ["yarn", "start"]