FROM node:19

WORKDIR /app

COPY . .

RUN npm install && npm install typescript -g
RUN npm install -g env-cmd
RUN npm i -g sequelize-cli
RUN tsc
#RUN npm run build/scripts/createDatabase.js
#RUN npm run migrate

##EXPOSE 3000

CMD ["npm", "start"]