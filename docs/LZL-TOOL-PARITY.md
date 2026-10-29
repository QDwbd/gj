# LZL TOOL 功能对标清单

> 用于逐项核对 https://www.lzltool.com/ 与 https://www.lzltool.cn/ 的公开功能目录。网站会持续更新，因此本清单不是永久完整的；每次实现都必须验证实际输入、输出、错误处理和下载/预览交互。不能以“有页面”代替“功能可用”。

## 已实现 / 本项目已有基础

- [x] JSON 格式化、压缩、验证、排序、字段提取、合并、数组转换、转 YAML
- [x] JSON 转 C# / Java / PHP / JavaScript 对象
- [x] JSON ↔ CSV、CSV 清理、列表 ↔ JSON、表格转 Markdown
- [x] URL 编码/解码、URL 解析、查询参数解析/构建
- [x] Base64、Base64URL、十六进制、二进制、Morse、ROT13、ROT47、凯撒
- [x] HTML 转义/反转义、XML 转义/反转义、XML 格式化/压缩、JSON ↔ XML
- [x] CSS 压缩/格式化、HTML/JS 压缩、SQL 格式化
- [x] 正则测试、文本差异、文本行清理/去重/排序、重复项分析
- [x] 哈希、HMAC、JWT 解码、密码生成/强度、UUID 单个/批量
- [x] 日期时间、数学、颜色、单位、BMI、贷款/小费等计算工具
- [x] SVG 压缩、SVG Data URI、占位 SVG、图片宽高等基础工具
- [x] INI ↔ JSON
- [x] Cookie 请求头转 JSON（重复键保留数组）
- [x] JSON 数组去重、逐行列表随机打乱/分组切片
- [x] JSON 转 Go struct / Kotlin data class / SQL 建表语句 / HTML 表格

## 仍需实现并通过测试的 LZL 类别

### 图片处理
- [ ] 浏览器图片编辑器：裁剪、旋转、翻转、缩放、亮度/对比度、滤镜、标注、水印、像素化
- [ ] PNG/JPEG/WebP/ICO 格式转换与批量处理
- [x] 图片转 Base64 / Base64 转图片（本地上传、预览与下载）
- [ ] 图片颜色提取、坐标取色
- [x] SVG 转 PNG（含尺寸限制与外部资源/脚本拦截）
- [ ] SVG 预览与 PNG 导出、SVG 转 Android VectorDrawable、图片矢量化
- [ ] 图片宫格切割、拼图子图识别、二维码/条码识别

### PDF / Office / 文件
- [x] PDF 指定页码转 PNG（缩放、背景、预览与 ZIP 批量下载）
- [ ] PDF 长图/分页等高级输出模式
- [x] PDF 页面重排、删除、旋转与多文件合并（浏览器本地处理）
- [ ] Excel/PPT 内嵌图片提取、Excel 转 HTML/JSON、JSON 转 Excel
- [ ] CSV 编码/中文乱码修复
- [ ] ZIP 文件打包、文件对比、随机文件抽取
- [x] SQLite 本地浏览、SQL 执行、修改与数据库导出（WebAssembly）

### 开发者与数据转换
- [ ] XML 排序与更严格的 XML 校验
- [ ] JS/HTML 格式化与混合代码处理、JS 压缩/混淆选项
- [ ] SQL Insert/Update 字段视图
- [ ] YAML ↔ XML/INI、INI ↔ XML、JSON ↔ XML 的复杂类型与边界用例
- [x] JSON → Rust struct / C++ struct
- [ ] C# ↔ VB.NET、C# DTO 到 Java/C++/Go/TypeScript/SQL 等转换
- [ ] C# 插值字符串、Cookie JSON、cURL 转 C#/Java/Python/Go/PHP
- [ ] SVG/图标生成器、window.open 参数生成器、JS 执行沙箱
- [ ] 正则表达式可视化、参考表和键码工具

### 文本 / 列表 / 生成器
- [x] 名单随机抽取、随机分组、分组切片与随机打乱
- [ ] 列表合并/唯一后缀
- [ ] 中文词频分析的完整分词方案、大小写/简繁转换
- [x] 单个二维码和常见条码生成、颜色/边距选项与 PNG 导出
- [ ] 批量二维码/条码生成与排版导出（PNG/SVG/PDF/Excel、模板、Logo）
- [ ] 随机 JSON/XML/YAML/CSV、随机字符串/数字/分数/二进制等生成器
- [ ] 图片占位符的自定义尺寸、背景/文字参数

### 生活工具与参考资料
- [x] 本地音频播放器、视频变速预览、屏幕录制（浏览器授权与 WebM 下载）
- [ ] 更完整的多轨音视频处理
- [ ] 键盘/鼠标测试、番茄钟、待办事项、RMB 大写、车牌归属地
- [x] 常见 MIME / Content-Type、TCP 端口、HTTP 方法参考表（内置静态数据）
- [ ] HTTP 状态码/头、ASCII、HTML 实体、文件签名等参考表
- [ ] 浏览器信息、IP 工具、MAC 厂商查询、TLD/高校/尺码/Excel 函数等资料页

## 验收规则

1. 每个勾选项都必须有可运行的处理逻辑，而不是仅有标题、输入框或固定示例。
2. 关键参数、错误提示、预览、复制和文件下载行为必须测试。
3. 文件类工具必须覆盖真实文件上传、大小/格式错误、处理后下载；不能只接受粘贴文本。
4. 需要外部服务/数据库的数据功能，要明确数据来源、更新方式与服务不可用时的提示。
5. 每批变更必须通过 `npm test` 与 `npm run build`，并在 CI 通过后才合并。
