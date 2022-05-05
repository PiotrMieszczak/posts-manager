FROM node:16-alpine as builder
WORKDIR /app

COPY package*.json .

RUN npm i @angular/cli
RUN npm ci

COPY . .
RUN ./node_modules/.bin/ng build --prod

FROM nginx:latest

COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/posts-manager /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
