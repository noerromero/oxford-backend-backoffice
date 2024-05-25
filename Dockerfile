FROM node:19

WORKDIR /app

COPY . .

RUN npm install && npm install typescript -g
RUN npm install -g env-cmd
RUN tsc
##RUN npx sequelize-cli db:migrate

##EXPOSE 3000

CMD ["npm", "start"]