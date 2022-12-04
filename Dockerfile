FROM node:19-alpine as builder
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.23-alpine
COPY --from=builder build /usr/share/nginx/html
EXPOSE 80
