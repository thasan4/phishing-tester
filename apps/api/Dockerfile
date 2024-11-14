FROM node:20.18-alpine3.20 AS development
WORKDIR /usr/src/app
COPY ./apps/api/package*.json ./
RUN npm install
COPY ./apps/api .
EXPOSE 3000 9229

FROM node:20.18-alpine3.20 AS builder
WORKDIR /usr/src/app
COPY ./apps/api/package*.json ./
RUN npm install --quiet --only=production
COPY ./apps/api .
RUN npm install @nestjs/cli
RUN npm run build

FROM node:20.18-alpine3.20 AS production
WORKDIR /usr/src/app
COPY ./apps/api/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
CMD ["npm", "run", "start:prod"]
EXPOSE 3000