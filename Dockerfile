FROM node:21-alpine3.18 as build-app

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

RUN npm install
RUN npm run build

COPY . .

FROM nginx:stable-alpine as production-stage
COPY --from=build-app /app/dist /usr/share/nginx/html
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]