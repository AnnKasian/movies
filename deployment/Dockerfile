FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE ${PORT}

CMD ["sh", "-c", "npm run migration:run && npm run start:prod"]

