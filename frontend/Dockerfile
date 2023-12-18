# syntax=docker/dockerfile:1

FROM node:21.2.0-alpine

WORKDIR /app

#RUN --mount=type=bind,source=package.json,target=package.json \
#    --mount=type=bind,source=package-lock.json,target=package-lock.json \
#    --mount=type=cache,target=/root/.npm \
#    npm ci --omit=dev

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD npm run dev
