FROM node:21-alpine3.18

WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm run build
RUN npm install pm2 -g

COPY . .

EXPOSE 8000
CMD ["pm2-runtime", "dist/index.js"]