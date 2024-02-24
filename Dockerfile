# ビルドステージ
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
ENV PORT=3000
CMD ["node", "./build"]
