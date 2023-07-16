FROM node:18
ENV APP_HOME=/app/
RUN mkdir -p ${APP_HOME}
WORKDIR ${APP_HOME}
COPY .. ${APP_HOME}
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start:dev"]