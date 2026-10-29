# Utility Hub（在线工具站）

这是一个可通过 GitHub 网页上传、由 Cloudflare Pages 构建发布的 Astro 项目。无需在本地安装 Node.js。

## 功能
- 首页、分类页式导航、站内搜索、工具详情页
- 116 个精选工具入口（由 `src/data/tools.ts` 统一管理）
- 每个工具入口都对应实际处理逻辑，并提供烟雾测试
- 输入数据默认在浏览器本地处理，不主动上传服务器
- 自动生成静态页面和 sitemap
- 响应式布局、复制结果、清空输入

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

## 测试

运行 `npm test` 可执行逻辑级烟雾测试：覆盖目录中的所有唯一操作，并检查部分关键输出。它不等同于真实浏览器的端到端测试；每次修改处理逻辑后仍应在浏览器中手动验证相关工具。

## 新增工具
编辑 `src/data/tools.ts`，新增一个工具对象，设置 `slug`、`name`、`category`、`description`、`operation`。`operation` 必须是 `public/scripts/tool-engine.js` 中已实现的操作名，或按现有函数格式扩展它。

## 注意
这是可运行的第一版基础工程，不是 LZL TOOL 的逐像素复制，也不包含第三方站点的专有代码或品牌素材。上线前请更换站点名称、域名和文案。大型 PDF、OCR、视频转码等功能需要单独引入库并评估浏览器兼容性。

## 工具质量原则

- 每个工具名称、说明与实际操作保持一致。
- 不保留重复别名、仅输出固定模板却宣称可配置的工具，或容易误导的伪功能。
- HTML/CSS/JavaScript 的简单正则压缩器已移除，避免破坏复杂语法或字符串内容。
- 颜色渐变生成器只接受两个明确的 HEX 色值；输入错误时会说明原因，不返回默认结果冒充成功。
