FROM node:22

WORKDIR /node-app


COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN cp .env.example .env

EXPOSE 3010

# Ponto de partida
CMD ["node","server.js"]