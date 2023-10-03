FROM node:alpine

WORKDIR /usr/app

COPY package.json .
RUN npm install

COPY . .

RUN npm install prisma --save-dev
RUN npx prisma generate
# src/services/games-service.ts(3,10): error TS2305:
# Module '"@prisma/client"' has no exported member 'Bet'.
RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "dev"]