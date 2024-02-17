FROM node:18

ENV POSTGRES_USER=qj
ENV POSTGRES_PASSWORD=Yatathakar123!
ENV POSTGRES_HOST=docker_postgres
ENV POSTGRES_PORT=5433
ENV POSTGRES_DB=quranJourney
ENV ACCOUNT_SID=ACa030edf5c50e00b761dca69894001a31
ENV AUTH_TOKEN=da8900b5c300cbec225a850f73a768c4
ENV TWILIO_PHONE=+13512478587
ENV RECEPIENT_PHONE_NUMBER_1=+14165566718
ENV RECEPIENT_PHONE_NUMBER_2=+14165566718


WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001
ENV NODE_ENV=staging
ENV PORT=3001

CMD ["node", "index.js"]
