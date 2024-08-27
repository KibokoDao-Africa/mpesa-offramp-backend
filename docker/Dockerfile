# Stage 1: Build the app
FROM node:16-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Stage 2: Run the app
FROM node:16-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE 3000

CMD ["node", "dist/server.js"]
