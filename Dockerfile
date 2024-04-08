FROM node:21-alpine3.18

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY tsconfig.app.json ./
COPY src ./src
COPY public ./public
COPY .env ./
COPY vite.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY index.html ./
COPY env.d.ts ./

RUN npm install pm2 -g
RUN npm install
RUN npm run build

COPY . .

EXPOSE 8000
CMD ["pm2-runtime", "dist/index.js"]