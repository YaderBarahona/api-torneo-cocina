FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["sh", "-c", "npm run migrate && npm start"]

EXPOSE 3000
