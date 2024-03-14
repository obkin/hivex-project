FROM node:latest

COPY . /app
WORKDIR /app

RUN ["npm", "install"]

EXPOSE 5060

CMD ["npm", "run", "start:dev"]