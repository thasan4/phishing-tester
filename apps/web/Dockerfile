# Build the application
FROM node:20.18-alpine3.20 AS builder
WORKDIR /app
COPY ./apps/web/package*.json ./
RUN npm install
COPY ./apps/web .
RUN npm run build

# Serve the application with a lightweight web server
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./apps/web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]