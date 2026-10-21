# ビルドステージ
# library/node の 22.23.4 の index が空のため、CPU 別の公式リポ amd64/node を digest 固定で使う
FROM amd64/node:22.23.4-bookworm@sha256:fa977e2a6e98a6cb3a5cfd2b7a96ecb414bde30c17be475109043309fa073dab AS build
RUN test "$(node -v)" = "v22.23.4"
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
ENV PORT=3000
CMD ["node", "./build"]
