FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN cp .env.example .env

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]