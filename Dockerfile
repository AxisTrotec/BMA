FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV PORT=3000

ENV SID = "AC51d5c2e10bcfd25566f68a22be074052"

ENV auth = "30c8a522d2c1516d038dd2a3b4334998"

ENV secretkey = "test81946273"

EXPOSE 3000

CMD ["npm", "start"]