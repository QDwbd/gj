# Utility Hub（在线工具站）

这是一个可通过 GitHub 网页上传、由 Cloudflare Pages 构建发布的 Astro 项目。无需在本地安装 Node.js。

## GitHub + Cloudflare Pages 部署
1. 在 GitHub 网页创建一个新仓库，例如 `utility-hub`（不要覆盖已有的博客仓库）。
2. 解压本项目 ZIP，在 GitHub 仓库点击 **Add file → Upload files**，上传项目内所有文件和文件夹中的内容，提交到 `main`。
3. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**，选择新仓库。
4. 构建配置：
   - Framework preset：Astro（若未自动识别）
   - Build command：`npm run build`
   - Build output directory：`dist`
5. 点击 Save and Deploy。以后推送到 `main` 会自动重新部署。
6. 部署成功后，在 Pages 项目的 **Custom domains** 中绑定子域名或专门用于工具站的域名。
7. 将 `astro.config.mjs` 中 `https://example.com` 改成你实际使用的站点域名，再提交一次。
