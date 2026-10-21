# ビルドステージ
FROM node:22.23.4-bookworm AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
ENV PORT=3000
CMD ["node", "./build"]
