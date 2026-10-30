export type Tool = { slug: string; name: string; category: string; description: string; operation: string };

export const tools: Tool[] = [
  {
    "slug": "color-workbench",
    "name": "颜色与配色工具箱",
    "category": "图片工具",
    "description": "集中完成 HEX、RGB、HSL 颜色互转、对比度、亮度、反色、随机颜色和配色板生成",
    "operation": "color-workbench"
  },
  {
    "slug": "text-workbench",
    "name": "综合文本工具箱",
    "category": "文本工具",
    "description": "在一个工作台中完成文本统计、行处理、大小写转换、查找替换、正则过滤、列表整理和文本比较",
    "operation": "text-workbench"
  },
  {
    "slug": "json-workbench",
    "name": "JSON 与数据格式工具箱",
    "category": "开发者工具",
    "description": "集中处理 JSON 格式化、校验、转换、结构整理、字段操作、XML/YAML/CSV/INI 转换及代码模型生成",
    "operation": "json-workbench"
  },
  {
    "slug": "url-encode",
    "name": "URL 编码",
    "category": "开发者工具",
    "description": "使用 encodeURIComponent 编码文本",
    "operation": "url-encode"
  },
  {
    "slug": "url-decode",
    "name": "URL 解码",
    "category": "开发者工具",
    "description": "解码 URL 编码文本",
    "operation": "url-decode"
  },
  {
    "slug": "base64-encode",
    "name": "Base64 编码",
    "category": "开发者工具",
    "description": "将 UTF-8 文本编码为 Base64",
    "operation": "base64-encode"
  },
  {
    "slug": "base64-decode",
    "name": "Base64 解码",
    "category": "开发者工具",
    "description": "将 Base64 解码为 UTF-8 文本",
    "operation": "base64-decode"
  },
  {
    "slug": "html-encode",
    "name": "HTML 实体编码",
    "category": "开发者工具",
    "description": "编码 HTML 特殊字符",
    "operation": "html-encode"
  },
  {
    "slug": "html-decode",
    "name": "HTML 实体解码",
    "category": "开发者工具",
    "description": "解码常见 HTML 实体",
    "operation": "html-decode"
  },
  {
    "slug": "regex-test",
    "name": "正则表达式测试",
    "category": "开发者工具",
    "description": "用正则表达式匹配文本",
    "operation": "regex-test"
  },
  {
    "slug": "password-gen",
    "name": "随机密码生成器",
    "category": "开发者工具",
    "description": "生成安全随机密码",
    "operation": "password-gen"
  },
  {
    "slug": "hash-sha256",
    "name": "SHA-256 计算",
    "category": "开发者工具",
    "description": "计算文本的 SHA-256 摘要",
    "operation": "hash-sha256"
  },
  {
    "slug": "jwt-decode",
    "name": "JWT 解码",
    "category": "开发者工具",
    "description": "解码 JWT 的 Header 和 Payload（不验证签名）",
    "operation": "jwt-decode"
  },
  {
    "slug": "url-parse",
    "name": "URL 解析",
    "category": "开发者工具",
    "description": "解析 URL 的协议、主机、路径和参数",
    "operation": "url-parse"
  },
  {
    "slug": "querystring-parse",
    "name": "查询参数解析",
    "category": "开发者工具",
    "description": "将 URL 查询字符串转换为 JSON",
    "operation": "querystring-parse"
  },
  {
    "slug": "querystring-build",
    "name": "查询参数生成",
    "category": "开发者工具",
    "description": "将 JSON 对象转换为查询字符串",
    "operation": "querystring-build"
  },
  {
    "slug": "unix-permissions",
    "name": "Unix 权限转换",
    "category": "开发者工具",
    "description": "将 chmod 数字权限转换为 rwx 字符串",
    "operation": "unix-permissions"
  },
  {
    "slug": "cron-explain",
    "name": "Cron 表达式说明",
    "category": "开发者工具",
    "description": "拆解常见 Cron 五段表达式",
    "operation": "cron-explain"
  },
  {
    "slug": "binary-encode",
    "name": "文本转二进制",
    "category": "开发者工具",
    "description": "将文本转为 UTF-8 字节二进制表示",
    "operation": "binary-encode"
  },
  {
    "slug": "binary-decode",
    "name": "二进制转文本",
    "category": "开发者工具",
    "description": "将 8 位二进制字节解码为文本",
    "operation": "binary-decode"
  },
  {
    "slug": "hex-encode",
    "name": "文本转十六进制",
    "category": "开发者工具",
    "description": "将文本转为 UTF-8 十六进制",
    "operation": "hex-encode"
  },
  {
    "slug": "hex-decode",
    "name": "十六进制转文本",
    "category": "开发者工具",
    "description": "将十六进制解码为文本",
    "operation": "hex-decode"
  },
  {
    "slug": "unicode-inspect",
    "name": "Unicode 查看器",
    "category": "开发者工具",
    "description": "显示字符、码点和 UTF-16 编码",
    "operation": "unicode-inspect"
  },
  {
    "slug": "morse-encode",
    "name": "摩斯电码编码",
    "category": "开发者工具",
    "description": "将常见英文字母和数字转为摩斯码",
    "operation": "morse-encode"
  },
  {
    "slug": "morse-decode",
    "name": "摩斯电码解码",
    "category": "开发者工具",
    "description": "将摩斯码转换为英文和数字",
    "operation": "morse-decode"
  },
  {
    "slug": "rot13",
    "name": "ROT13 转换",
    "category": "开发者工具",
    "description": "执行 ROT13 字母转换",
    "operation": "rot13"
  },
  {
    "slug": "caesar",
    "name": "凯撒密码",
    "category": "开发者工具",
    "description": "按偏移量进行凯撒字母位移",
    "operation": "caesar"
  },
  {
    "slug": "markdown-preview-text",
    "name": "Markdown 纯文本提取",
    "category": "开发者工具",
    "description": "去除常见 Markdown 标记",
    "operation": "markdown-preview-text"
  },
  {
    "slug": "html-to-text",
    "name": "HTML 转纯文本",
    "category": "开发者工具",
    "description": "移除标签并提取文本",
    "operation": "html-to-text"
  },
  {
    "slug": "date-diff",
    "name": "日期间隔计算",
    "category": "数学与数字",
    "description": "计算两个日期之间的天数差",
    "operation": "date-diff"
  },
  {
    "slug": "unit-convert",
    "name": "长度单位换算",
    "category": "数学与数字",
    "description": "米、千米、厘米、英尺和英寸换算",
    "operation": "unit-convert"
  },
  {
    "slug": "temperature",
    "name": "温度换算",
    "category": "数学与数字",
    "description": "摄氏度、华氏度和开尔文换算",
    "operation": "temperature"
  },
  {
    "slug": "hash-sha1",
    "name": "SHA-1 计算",
    "category": "安全与生成器",
    "description": "计算 SHA-1 摘要（不用于安全签名）",
    "operation": "hash-sha1"
  },
  {
    "slug": "hash-sha512",
    "name": "SHA-512 计算",
    "category": "安全与生成器",
    "description": "计算 SHA-512 摘要",
    "operation": "hash-sha512"
  },
  {
    "slug": "hmac-sha256",
    "name": "HMAC-SHA256",
    "category": "安全与生成器",
    "description": "用浏览器 Web Crypto 计算 HMAC-SHA256",
    "operation": "hmac-sha256"
  },
  {
    "slug": "password-strength",
    "name": "密码强度检查",
    "category": "安全与生成器",
    "description": "根据长度和字符种类给出本地估算",
    "operation": "password-strength"
  },
  {
    "slug": "aspect-ratio",
    "name": "宽高比计算",
    "category": "开发者工具",
    "description": "计算宽高比和等比例尺寸",
    "operation": "aspect-ratio"
  },
  {
    "slug": "http-status",
    "name": "HTTP 状态码查询",
    "category": "开发者工具",
    "description": "查询常见 HTTP 状态码说明",
    "operation": "http-status"
  },
  {
    "slug": "my-ip",
    "name": "查询本机 IP",
    "category": "数据库工具",
    "description": "查询当前网络对外显示的公网 IP 地址；不等同于路由器分配的局域网 IP",
    "operation": "my-ip"
  },
  {
    "slug": "email-validate",
    "name": "邮箱格式检查",
    "category": "开发者工具",
    "description": "检查常见邮箱格式（非投递验证）",
    "operation": "email-validate"
  },
  {
    "slug": "svg-minify",
    "name": "SVG 文本压缩",
    "category": "图片工具",
    "description": "压缩简单 SVG 文本中的空白",
    "operation": "svg-minify"
  },
  {
    "slug": "svg-to-data-uri",
    "name": "SVG 转 Data URI",
    "category": "图片工具",
    "description": "将 SVG 文本转换为 Data URI",
    "operation": "svg-to-data-uri"
  },
  {
    "slug": "number-format",
    "name": "数字千分位格式化",
    "category": "开发者工具",
    "description": "为数字添加千分位分隔符",
    "operation": "number-format"
  },
  {
    "slug": "byte-convert",
    "name": "字节单位换算",
    "category": "开发者工具",
    "description": "字节转换为 KB、MB、GB",
    "operation": "byte-convert"
  },
  {
    "slug": "csv-clean",
    "name": "CSV 行空白清理",
    "category": "开发者工具",
    "description": "规范换行并去除每行首尾空白，适用于简单 CSV 文本",
    "operation": "csv-clean"
  },
  {
    "slug": "table-to-markdown",
    "name": "表格转 Markdown",
    "category": "开发者工具",
    "description": "将 CSV 转成 Markdown 表格",
    "operation": "table-to-markdown"
  },
  {
    "slug": "base64url-encode",
    "name": "Base64URL 编码",
    "category": "开发者工具",
    "description": "将 UTF-8 文本编码为适用于 URL 的 Base64URL 格式",
    "operation": "base64url-encode"
  },
  {
    "slug": "base64url-decode",
    "name": "Base64URL 解码",
    "category": "开发者工具",
    "description": "解码 Base64URL 文本并还原 UTF-8 内容",
    "operation": "base64url-decode"
  },
  {
    "slug": "rot47",
    "name": "ROT47 编码/解码",
    "category": "开发者工具",
    "description": "对 ASCII 可打印字符执行 ROT47 替换；同一操作可编码和解码",
    "operation": "rot47"
  },
  {
    "slug": "uuid-bulk",
    "name": "批量 UUID 生成",
    "category": "安全与生成器",
    "description": "按指定数量生成 UUID v4，每行一个",
    "operation": "uuid-bulk"
  },
  {
    "slug": "css-format",
    "name": "CSS 格式化",
    "category": "开发者工具",
    "description": "格式化 CSS 规则并缩进属性，便于阅读和维护",
    "operation": "css-format"
  },
  {
    "slug": "sql-format",
    "name": "SQL 格式化",
    "category": "开发者工具",
    "description": "格式化常见 SQL 查询语句，突出 SELECT、FROM、WHERE、JOIN 等子句",
    "operation": "sql-format"
  },
  {
    "slug": "image-editor",
    "name": "在线图片编辑器",
    "category": "图片工具",
    "description": "在浏览器中裁剪、旋转、翻转、调色、像素化、添加水印并导出 PNG/JPEG/WebP",
    "operation": "image-editor"
  },
  {
    "slug": "image-to-base64",
    "name": "图片转 Base64",
    "category": "图片工具",
    "description": "上传本地图片并转换为 Data URL，可复制结果",
    "operation": "image-to-base64"
  },
  {
    "slug": "base64-to-image",
    "name": "Base64 转图片",
    "category": "图片工具",
    "description": "解码图片 Base64 或 Data URL，预览并下载图片",
    "operation": "base64-to-image"
  },
  {
    "slug": "svg-to-png",
    "name": "SVG 转 PNG",
    "category": "图片工具",
    "description": "将 SVG 标记渲染为可下载的 PNG 图片",
    "operation": "svg-to-png"
  },
  {
    "slug": "content-type-lookup",
    "name": "MIME / Content-Type 查询",
    "category": "开发者工具",
    "description": "按文件扩展名或 MIME 类型查询常见媒体类型",
    "operation": "content-type-lookup"
  },
  {
    "slug": "tcp-port-lookup",
    "name": "常见端口查询",
    "category": "开发者工具",
    "description": "按 TCP/UDP 端口号或服务名查询常见端口说明",
    "operation": "tcp-port-lookup"
  },
  {
    "slug": "http-method-reference",
    "name": "HTTP 方法参考",
    "category": "开发者工具",
    "description": "查询 GET、POST、PUT、PATCH、DELETE 等 HTTP 方法用途",
    "operation": "http-method-reference"
  },
  {
    "slug": "unicode-escape",
    "name": "Unicode 转义",
    "category": "开发者工具",
    "description": "将文本转为 UTF-16 Unicode 转义序列",
    "operation": "unicode-escape"
  },
  {
    "slug": "unicode-unescape",
    "name": "Unicode 反转义",
    "category": "开发者工具",
    "description": "将文本中的反斜线 uXXXX 序列还原为字符",
    "operation": "unicode-unescape"
  },
  {
    "slug": "qr-generator",
    "name": "二维码生成器",
    "category": "图片工具",
    "description": "在浏览器中生成可下载的二维码 PNG，支持前景色、背景色和边距",
    "operation": "qr-generator"
  },
  {
    "slug": "barcode-generator",
    "name": "条码生成器",
    "category": "图片工具",
    "description": "生成 Code 128、EAN-13、EAN-8、UPC-A、ITF-14 等常见条码并导出 PNG",
    "operation": "barcode-generator"
  },
  {
    "slug": "pdf-page-editor",
    "name": "PDF 页面整理",
    "category": "文件工具",
    "description": "在本地重排、删除和旋转 PDF 页面并导出新文件",
    "operation": "pdf-page-editor"
  },
  {
    "slug": "pdf-merge",
    "name": "PDF 合并",
    "category": "文件工具",
    "description": "在浏览器中合并多个 PDF 文件并下载结果",
    "operation": "pdf-merge"
  },
  {
    "slug": "pdf-to-images",
    "name": "PDF 转图片",
    "category": "文件工具",
    "description": "将 PDF 指定页面渲染为 PNG，支持缩放、背景颜色、预览和 ZIP 批量下载",
    "operation": "pdf-to-images"
  },
  {
    "slug": "audio-player",
    "name": "本地音频播放器",
    "category": "音视频工具",
    "description": "加载本地音频文件播放，支持 0.5× 到 2× 播放速度",
    "operation": "audio-player"
  },
  {
    "slug": "video-speed",
    "name": "视频变速播放器",
    "category": "音视频工具",
    "description": "在浏览器中预览本地视频并调整播放速度",
    "operation": "video-speed"
  },
  {
    "slug": "screen-recorder",
    "name": "屏幕录制",
    "category": "音视频工具",
    "description": "通过浏览器屏幕共享权限录制屏幕并下载 WebM 文件",
    "operation": "screen-recorder"
  },
  {
    "slug": "sqlite-browser",
    "name": "SQLite 浏览与编辑",
    "category": "数据库工具",
    "description": "在浏览器中打开 SQLite 数据库、执行 SQL 查询与修改并导出数据库",
    "operation": "sqlite-browser"
  },
  {
    "slug": "excel-to-json",
    "name": "Excel 转 JSON",
    "category": "文件工具",
    "description": "读取 XLSX 工作簿并将指定工作表转换为 JSON 数组",
    "operation": "excel-to-json"
  },
  {
    "slug": "excel-to-html",
    "name": "Excel 转 HTML 表格",
    "category": "文件工具",
    "description": "将 XLSX 工作表转换为 HTML 表格源码",
    "operation": "excel-to-html"
  },
  {
    "slug": "json-to-excel",
    "name": "JSON 转 Excel",
    "category": "文件工具",
    "description": "将 JSON 对象数组生成可下载的 XLSX 工作簿",
    "operation": "json-to-excel"
  },
  {
    "slug": "image-remove-background",
    "name": "在线抠图工具",
    "category": "图片工具",
    "description": "移除图片中的指定背景颜色并生成透明背景",
    "operation": "image-lab"
  },
  {
    "slug": "image-transform",
    "name": "图片旋转与翻转",
    "category": "图片工具",
    "description": "在同一工作台中自由旋转图片，并进行水平或垂直翻转",
    "operation": "image-lab"
  },
  {
    "slug": "image-size",
    "name": "图片尺寸与裁切",
    "category": "图片工具",
    "description": "在同一工作台中裁切、调整尺寸、等比例放大或缩小图片",
    "operation": "image-lab"
  },
  {
    "slug": "image-replace-color",
    "name": "图片颜色替换",
    "category": "图片工具",
    "description": "将图片中的指定颜色替换为新颜色",
    "operation": "image-lab"
  },
  {
    "slug": "image-grayscale",
    "name": "图像灰度转换",
    "category": "图片工具",
    "description": "使用不同灰度算法将彩色图片转换为黑白图片",
    "operation": "image-lab"
  },
  {
    "slug": "image-batch-copy",
    "name": "图片批量复制",
    "category": "图片工具",
    "description": "按指定数量水平或垂直复制图片",
    "operation": "image-lab"
  },
  {
    "slug": "image-rounded-corners",
    "name": "圆角图片生成器",
    "category": "图片工具",
    "description": "为图片设置圆角并导出透明背景",
    "operation": "image-lab"
  },
  {
    "slug": "image-alpha-invert",
    "name": "PNG 透明区域反转",
    "category": "图片工具",
    "description": "反转 PNG 图片的透明与不透明区域",
    "operation": "image-lab"
  },
  {
    "slug": "image-watermark-tile",
    "name": "图片平铺水印",
    "category": "图片工具",
    "description": "为图片添加重复平铺的文字水印",
    "operation": "image-lab"
  },
  {
    "slug": "image-sharpen",
    "name": "图像锐化",
    "category": "图片工具",
    "description": "增强图片边缘与细节清晰度",
    "operation": "image-lab"
  },
  {
    "slug": "image-blur",
    "name": "图片模糊处理",
    "category": "图片工具",
    "description": "通过像素缩放实现图片柔化模糊效果",
    "operation": "image-lab"
  },
  {
    "slug": "image-pixelate",
    "name": "图片像素化",
    "category": "图片工具",
    "description": "将图片转换为马赛克像素效果",
    "operation": "image-lab"
  },
  {
    "slug": "image-emboss",
    "name": "浮雕效果生成器",
    "category": "图片工具",
    "description": "将图片转换为具有明暗立体感的浮雕效果",
    "operation": "image-lab"
  },
  {
    "slug": "image-brightness",
    "name": "图片亮度调整",
    "category": "图片工具",
    "description": "调整图片整体亮度",
    "operation": "image-lab"
  },
  {
    "slug": "image-mirror",
    "name": "镜像图片生成器",
    "category": "图片工具",
    "description": "生成图片的左右镜像拼接效果",
    "operation": "image-lab"
  },
  {
    "slug": "image-color-tint",
    "name": "图片调色工具",
    "category": "图片工具",
    "description": "使用指定颜色对图片进行整体色彩调整",
    "operation": "image-lab"
  },
  {
    "slug": "image-noise",
    "name": "图片添加噪声",
    "category": "图片工具",
    "description": "向图片叠加可调强度的随机噪声效果",
    "operation": "image-lab"
  },
  {
    "slug": "image-sepia",
    "name": "棕褐色调滤镜",
    "category": "图片工具",
    "description": "为图片添加经典复古棕褐色调",
    "operation": "image-lab"
  },
  {
    "slug": "image-contrast",
    "name": "图片对比度调整",
    "category": "图片工具",
    "description": "调整图片明暗对比度",
    "operation": "image-lab"
  },
  {
    "slug": "image-saturation",
    "name": "图片饱和度调整",
    "category": "图片工具",
    "description": "调整图片色彩饱和度",
    "operation": "image-lab"
  },
  {
    "slug": "image-vignette",
    "name": "图片晕影效果",
    "category": "图片工具",
    "description": "为图片四周添加暗角晕影效果",
    "operation": "image-lab"
  },
  {
    "slug": "image-border",
    "name": "图片添加边框",
    "category": "图片工具",
    "description": "为图片添加自定义颜色边框",
    "operation": "image-lab"
  },
  {
    "slug": "image-background",
    "name": "图片背景添加",
    "category": "图片工具",
    "description": "为透明图片添加纯色背景",
    "operation": "image-lab"
  },
  {
    "slug": "image-quality",
    "name": "图片质量压缩",
    "category": "图片工具",
    "description": "通过调整导出质量压缩图片体积",
    "operation": "image-lab"
  },
  {
    "slug": "png-to-jpg",
    "name": "PNG 转 JPG",
    "category": "图片工具",
    "description": "将 PNG 图片转换为 JPG 格式",
    "operation": "image-lab"
  },
  {
    "slug": "jpg-to-webp",
    "name": "JPG 转 WebP",
    "category": "图片工具",
    "description": "将 JPG 图片转换为 WebP 格式",
    "operation": "image-lab"
  },
  {
    "slug": "png-to-webp",
    "name": "PNG 转 WebP",
    "category": "图片工具",
    "description": "将 PNG 图片转换为 WebP 格式",
    "operation": "image-lab"
  },
  {
    "slug": "webp-to-jpg",
    "name": "WebP 转 JPG",
    "category": "图片工具",
    "description": "将 WebP 图片转换为 JPG 格式",
    "operation": "image-lab"
  }
];
