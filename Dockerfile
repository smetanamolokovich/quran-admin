FROM node:21-alpine3.18

WORKDIR /app
COPY package*.json ./

RUN npm install pm2 -g
RUN npm install
RUN npm run build-only

COPY . .

EXPOSE 8000
CMD ["pm2-runtime", "dist/index.js"]