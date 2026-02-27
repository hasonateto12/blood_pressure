FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# generate swagger-output.json during build
RUN npm run swagger

ENV NODE_ENV=production
EXPOSE 2135
CMD ["npm", "start"]