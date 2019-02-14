FROM node:8-alpine

COPY .docker/ /
COPY dist/ /usr/src/app

RUN chmod +x /usr/local/sbin/entrypoint

WORKDIR /usr/src/app
ENTRYPOINT [ "/usr/local/sbin/entrypoint" ]
CMD [ "npm", "start" ]