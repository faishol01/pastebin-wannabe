FROM node:18-alpine

WORKDIR /opt/apps

ENV NODE_ENV=production

COPY package*.json .
RUN npm install

COPY . .
RUN chmod +x *.sh

EXPOSE 3000

CMD [ "./startup.sh" ]