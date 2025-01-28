FROM node:18
RUN apt-get update && \
    apt-get install -y redis-server && \
    apt-get clean
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000 
CMD ["sh", "-c", "redis-server --daemonize yes && node server.js"]
