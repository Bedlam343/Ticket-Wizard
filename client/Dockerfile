FROM node:19.0-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]