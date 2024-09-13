FROM node:20

ENV PORT 3000

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install --only=production

COPY . /usr/src/app

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "start"