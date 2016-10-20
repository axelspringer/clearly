# Builds a Docker to deliver to dist/
FROM nginx:alpine

MAINTAINER "Axel Springer SE"

COPY dist/ /usr/share/nginx/html
