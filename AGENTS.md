# AGENTS.md

## デプロイ（手動）

本番は Cloud Run。main へのマージだけではデプロイされないので、以下の手順で手動で出す。
`<PROJECT_ID>` / `<REGION>` / `<SERVICE>` / `<REPOSITORY>` は `cloudbuild.yml` に書かれている値を使う。

1. マージ済みの main をクリーンな状態で取り出し、linux/amd64 でビルドする（作業ツリーの `.env` などをイメージに入れないため、`git archive` を使う）

   ```bash
   SHA=$(git rev-parse --short HEAD)
   IMG=<REGION>-docker.pkg.dev/<PROJECT_ID>/<REPOSITORY>/<SERVICE>:$SHA
   CTX=$(mktemp -d) && git archive HEAD | tar -x -C "$CTX"
   docker buildx build --platform linux/amd64 --provenance=false -t "$IMG" --load "$CTX"
   docker run --rm --platform linux/amd64 "$IMG" node -v   # Dockerfile の版検査と同じ版になること
   docker push "$IMG"
   ```

2. トラフィック 0% の新リビジョンを `canary` タグ付きで作る（引数は `cloudbuild.yml` の deploy 手順と同じ。`gcloud builds submit` は使わない）

   ```bash
   gcloud run deploy <SERVICE> --project=<PROJECT_ID> --region=<REGION> --platform managed \
     --image "$IMG" --allow-unauthenticated --memory 2Gi --cpu 1 \
     --no-traffic --tag canary
   ```

   環境変数は `--set-env-vars` を付けなければ既存リビジョンのものが引き継がれる。

3. `https://canary---<サービスの URL のホスト>` で `/` `/game` `/credit` `/privacy` `/sitemap.xml` が 200 を返すことを確かめる

4. トラフィックを段階的に切り替える（例: 1% → 10% → 50% → 100%）。各段でエラー率を見て、問題があれば元のリビジョンへ戻す

   ```bash
   gcloud run services update-traffic <SERVICE> --project=<PROJECT_ID> --region=<REGION> \
     --to-revisions=<新リビジョン>=1,<旧リビジョン>=99
   # 戻す時
   gcloud run services update-traffic <SERVICE> --project=<PROJECT_ID> --region=<REGION> \
     --to-revisions=<旧リビジョン>=100
   ```

5. 100% にした後、稼働中のリビジョンのイメージで `node -v` を確かめ、公開 URL の主要ページが 200 を返すことを確認する
