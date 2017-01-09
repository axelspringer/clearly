# Builds a Docker to deliver to dist/
FROM nginx:alpine

MAINTAINER sebastian.doell@axelspringer.de

COPY dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx
