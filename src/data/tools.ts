export type Tool = { slug: string; name: string; category: string; description: string; operation: string };

export const tools: Tool[] = [
  {
    "slug": "text-count",
    "name": "字数统计",
    "category": "文本工具",
    "description": "统计字符、单词、行数和段落数",
    "operation": "text-count"
  },
  {
    "slug": "line-sort",
    "name": "文本行排序",
    "category": "文本工具",
    "description": "按字母或字符顺序排序文本行",
    "operation": "line-sort"
  },
  {
    "slug": "line-dedupe",
    "name": "文本行去重",
    "category": "文本工具",
    "description": "删除重复行并保留首次出现顺序",
    "operation": "line-dedupe"
  },
  {
    "slug": "line-reverse",
    "name": "文本行反转",
    "category": "文本工具",
    "description": "反转文本行的排列顺序",
    "operation": "line-reverse"
  },
  {
    "slug": "trim-lines",
    "name": "清理行首尾空格",
    "category": "文本工具",
    "description": "清理每一行首尾空白",
    "operation": "trim-lines"
  },
  {
    "slug": "blank-lines",
    "name": "删除空白行",
    "category": "文本工具",
    "description": "移除空行和仅含空格的行",
    "operation": "blank-lines"
  },
  {
    "slug": "case-upper",
    "name": "转大写",
    "category": "文本工具",
    "description": "将英文文本转换为大写",
    "operation": "case-upper"
  },
  {
    "slug": "case-lower",
    "name": "转小写",
    "category": "文本工具",
    "description": "将英文文本转换为小写",
    "operation": "case-lower"
  },
  {
    "slug": "case-title",
    "name": "标题格式转换",
    "category": "文本工具",
    "description": "将英文单词转换为标题式大小写",
    "operation": "case-title"
  },
  {
    "slug": "case-sentence",
    "name": "句首大写",
    "category": "文本工具",
    "description": "将句子开头转换为大写",
    "operation": "case-sentence"
  },
  {
    "slug": "text-reverse",
    "name": "文本反转",
    "category": "文本工具",
    "description": "反转文本中的字符",
    "operation": "text-reverse"
  },
  {
    "slug": "text-replace",
    "name": "查找替换",
    "category": "文本工具",
    "description": "按指定字符串查找并替换",
    "operation": "text-replace"
  },
  {
    "slug": "text-to-slug",
    "name": "Slug 生成器",
    "category": "文本工具",
    "description": "将标题转换为 URL 友好的 slug",
    "operation": "text-to-slug"
  },
  {
    "slug": "text-to-lines",
    "name": "逗号转行",
    "category": "文本工具",
    "description": "将逗号分隔的文本转换为逐行列表",
    "operation": "comma-to-lines"
  },
  {
    "slug": "lines-to-comma",
    "name": "行转逗号",
    "category": "文本工具",
    "description": "将多行内容转换为逗号分隔文本",
    "operation": "lines-to-comma"
  },
  {
    "slug": "text-clean",
    "name": "文本清理",
    "category": "文本工具",
    "description": "去除控制字符并规范换行",
    "operation": "text-clean"
  },
  {
    "slug": "text-escape-regex",
    "name": "正则转义",
    "category": "文本工具",
    "description": "转义正则表达式中的特殊字符",
    "operation": "text-escape-regex"
  },
  {
    "slug": "text-unique-words",
    "name": "唯一单词",
    "category": "文本工具",
    "description": "提取文本中的不重复单词",
    "operation": "text-unique-words"
  },
  {
    "slug": "json-format",
    "name": "JSON 格式化",
    "category": "开发者工具",
    "description": "格式化 JSON 并显示缩进",
    "operation": "json-format"
  },
  {
    "slug": "json-minify",
    "name": "JSON 压缩",
    "category": "开发者工具",
    "description": "压缩 JSON 去除空白",
    "operation": "json-minify"
  },
  {
    "slug": "json-validate",
    "name": "JSON 校验",
    "category": "开发者工具",
    "description": "验证 JSON 是否有效",
    "operation": "json-validate"
  },
  {
    "slug": "json-to-yaml",
    "name": "JSON 转 YAML",
    "category": "开发者工具",
    "description": "将 JSON 数据转换为基础 YAML",
    "operation": "json-to-yaml"
  },
  {
    "slug": "yaml-to-json",
    "name": "YAML 转 JSON（基础）",
    "category": "开发者工具",
    "description": "解析简单键值 YAML 并转换为 JSON",
    "operation": "yaml-to-json"
  },
  {
    "slug": "xml-escape",
    "name": "XML 转义",
    "category": "开发者工具",
    "description": "转义 XML 特殊字符",
    "operation": "xml-escape"
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
    "slug": "uuid-gen",
    "name": "UUID 生成器",
    "category": "开发者工具",
    "description": "生成随机 UUID v4",
    "operation": "uuid-gen"
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
    "category": "编码与转换",
    "description": "将文本转为 UTF-8 字节二进制表示",
    "operation": "binary-encode"
  },
  {
    "slug": "binary-decode",
    "name": "二进制转文本",
    "category": "编码与转换",
    "description": "将 8 位二进制字节解码为文本",
    "operation": "binary-decode"
  },
  {
    "slug": "hex-encode",
    "name": "文本转十六进制",
    "category": "编码与转换",
    "description": "将文本转为 UTF-8 十六进制",
    "operation": "hex-encode"
  },
  {
    "slug": "hex-decode",
    "name": "十六进制转文本",
    "category": "编码与转换",
    "description": "将十六进制解码为文本",
    "operation": "hex-decode"
  },
    {
    "slug": "unicode-inspect",
    "name": "Unicode 查看器",
    "category": "编码与转换",
    "description": "显示字符、码点和 UTF-16 编码",
    "operation": "unicode-inspect"
  },
  {
    "slug": "morse-encode",
    "name": "摩斯电码编码",
    "category": "编码与转换",
    "description": "将常见英文字母和数字转为摩斯码",
    "operation": "morse-encode"
  },
  {
    "slug": "morse-decode",
    "name": "摩斯电码解码",
    "category": "编码与转换",
    "description": "将摩斯码转换为英文和数字",
    "operation": "morse-decode"
  },
  {
    "slug": "rot13",
    "name": "ROT13 转换",
    "category": "编码与转换",
    "description": "执行 ROT13 字母转换",
    "operation": "rot13"
  },
  {
    "slug": "caesar",
    "name": "凯撒密码",
    "category": "编码与转换",
    "description": "按偏移量进行凯撒字母位移",
    "operation": "caesar"
  },
  {
    "slug": "csv-to-json",
    "name": "CSV 转 JSON",
    "category": "编码与转换",
    "description": "将基础 CSV 表格转换为 JSON 数组",
    "operation": "csv-to-json"
  },
  {
    "slug": "json-to-csv",
    "name": "JSON 转 CSV",
    "category": "编码与转换",
    "description": "将 JSON 对象数组转换为 CSV",
    "operation": "json-to-csv"
  },
  {
    "slug": "markdown-preview-text",
    "name": "Markdown 纯文本提取",
    "category": "编码与转换",
    "description": "去除常见 Markdown 标记",
    "operation": "markdown-preview-text"
  },
  {
    "slug": "html-to-text",
    "name": "HTML 转纯文本",
    "category": "编码与转换",
    "description": "移除标签并提取文本",
    "operation": "html-to-text"
  },
    {
    "slug": "timestamp-date",
    "name": "时间戳转日期",
    "category": "时间与日期",
    "description": "将 Unix 秒或毫秒时间戳转换为日期",
    "operation": "timestamp-date"
  },
  {
    "slug": "date-timestamp",
    "name": "日期转时间戳",
    "category": "时间与日期",
    "description": "将日期字符串转换为 Unix 秒和毫秒",
    "operation": "date-timestamp"
  },
      {
    "slug": "date-diff",
    "name": "日期间隔计算",
    "category": "时间与日期",
    "description": "计算两个日期之间的天数差",
    "operation": "date-diff"
  },
      {
    "slug": "weekday",
    "name": "星期计算",
    "category": "时间与日期",
    "description": "计算日期对应的星期几",
    "operation": "weekday"
  },
    {
    "slug": "calculator",
    "name": "计算器",
    "category": "数学与数字",
    "description": "支持基础四则运算和括号",
    "operation": "calculator"
  },
  {
    "slug": "percentage",
    "name": "百分比计算",
    "category": "数学与数字",
    "description": "计算一个数占另一个数的百分比",
    "operation": "percentage"
  },
  {
    "slug": "percent-change",
    "name": "百分比变化",
    "category": "数学与数字",
    "description": "计算两个数之间的百分比变化",
    "operation": "percent-change"
  },
  {
    "slug": "average",
    "name": "平均值计算",
    "category": "数学与数字",
    "description": "计算一组数字的平均值",
    "operation": "average"
  },
  {
    "slug": "median",
    "name": "中位数计算",
    "category": "数学与数字",
    "description": "计算一组数字的中位数",
    "operation": "median"
  },
  {
    "slug": "sum",
    "name": "求和计算",
    "category": "数学与数字",
    "description": "计算一组数字之和",
    "operation": "sum"
  },
  {
    "slug": "random-number",
    "name": "随机数生成",
    "category": "数学与数字",
    "description": "生成指定范围的随机整数",
    "operation": "random-number"
  },
  {
    "slug": "number-base",
    "name": "进制转换",
    "category": "数学与数字",
    "description": "十进制转换为二进制、八进制和十六进制",
    "operation": "number-base"
  },
  {
    "slug": "roman-numeral",
    "name": "罗马数字转换",
    "category": "数学与数字",
    "description": "阿拉伯数字与罗马数字互转（1-3999）",
    "operation": "roman-numeral"
  },
  {
    "slug": "factorial",
    "name": "阶乘计算",
    "category": "数学与数字",
    "description": "计算非负整数阶乘（上限 170）",
    "operation": "factorial"
  },
  {
    "slug": "prime-check",
    "name": "质数判断",
    "category": "数学与数字",
    "description": "判断整数是否为质数",
    "operation": "prime-check"
  },
  {
    "slug": "gcd-lcm",
    "name": "最大公约数与最小公倍数",
    "category": "数学与数字",
    "description": "计算两个整数的 GCD 与 LCM",
    "operation": "gcd-lcm"
  },
  {
    "slug": "round-number",
    "name": "数字舍入",
    "category": "数学与数字",
    "description": "按指定小数位数舍入数字",
    "operation": "round-number"
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
    "slug": "color-hex-rgb",
    "name": "HEX 转 RGB",
    "category": "颜色工具",
    "description": "将 HEX 颜色转换为 RGB",
    "operation": "color-hex-rgb"
  },
  {
    "slug": "color-rgb-hex",
    "name": "RGB 转 HEX",
    "category": "颜色工具",
    "description": "将 RGB 颜色转换为 HEX",
    "operation": "color-rgb-hex"
  },
  {
    "slug": "color-rgb-hsl",
    "name": "RGB 转 HSL",
    "category": "颜色工具",
    "description": "将 RGB 颜色转换为 HSL",
    "operation": "color-rgb-hsl"
  },
  {
    "slug": "color-hsl-rgb",
    "name": "HSL 转 RGB",
    "category": "颜色工具",
    "description": "将 HSL 颜色转换为 RGB",
    "operation": "color-hsl-rgb"
  },
  {
    "slug": "color-contrast",
    "name": "对比度计算",
    "category": "颜色工具",
    "description": "计算两种颜色的 WCAG 对比度",
    "operation": "color-contrast"
  },
  {
    "slug": "color-random",
    "name": "随机颜色",
    "category": "颜色工具",
    "description": "生成随机 HEX 颜色",
    "operation": "color-random"
  },
  {
    "slug": "color-palette",
    "name": "配色板生成",
    "category": "颜色工具",
    "description": "基于主色生成简单配色板",
    "operation": "color-palette"
  },
  {
    "slug": "color-invert",
    "name": "颜色反转",
    "category": "颜色工具",
    "description": "计算 HEX 颜色的反色",
    "operation": "color-invert"
  },
  {
    "slug": "color-luminance",
    "name": "相对亮度",
    "category": "颜色工具",
    "description": "计算颜色相对亮度",
    "operation": "color-luminance"
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
    "slug": "url-safe-base64",
    "name": "URL 安全 Base64",
    "category": "编码与转换",
    "description": "进行 URL-safe Base64 编码",
    "operation": "url-safe-base64"
  },
      {
    "slug": "aspect-ratio",
    "name": "宽高比计算",
    "category": "Web 与网络",
    "description": "计算宽高比和等比例尺寸",
    "operation": "aspect-ratio"
  },
  {
    "slug": "http-status",
    "name": "HTTP 状态码查询",
    "category": "Web 与网络",
    "description": "查询常见 HTTP 状态码说明",
    "operation": "http-status"
  },
  {
    "slug": "mime-type",
    "name": "MIME 类型查询",
    "category": "Web 与网络",
    "description": "查询常见文件扩展名的 MIME 类型",
    "operation": "mime-type"
  },
  {
    "slug": "ip-format",
    "name": "IP 地址格式检查",
    "category": "Web 与网络",
    "description": "检查 IPv4 地址格式",
    "operation": "ip-format"
  },
  {
    "slug": "email-validate",
    "name": "邮箱格式检查",
    "category": "Web 与网络",
    "description": "检查常见邮箱格式（非投递验证）",
    "operation": "email-validate"
  },
  {
    "slug": "svg-minify",
    "name": "SVG 文本压缩",
    "category": "图片与设计",
    "description": "压缩简单 SVG 文本中的空白",
    "operation": "svg-minify"
  },
  {
    "slug": "svg-to-data-uri",
    "name": "SVG 转 Data URI",
    "category": "图片与设计",
    "description": "将 SVG 文本转换为 Data URI",
    "operation": "svg-to-data-uri"
  },
  {
    "slug": "list-to-json",
    "name": "列表转 JSON",
    "category": "数据与格式",
    "description": "将逐行文本转换为 JSON 字符串数组",
    "operation": "list-to-json"
  },
  {
    "slug": "json-to-list",
    "name": "JSON 数组转列表",
    "category": "数据与格式",
    "description": "将 JSON 数组转换为逐行文本",
    "operation": "json-to-list"
  },
  {
    "slug": "number-format",
    "name": "数字千分位格式化",
    "category": "数据与格式",
    "description": "为数字添加千分位分隔符",
    "operation": "number-format"
  },
  {
    "slug": "byte-convert",
    "name": "字节单位换算",
    "category": "数据与格式",
    "description": "字节转换为 KB、MB、GB",
    "operation": "byte-convert"
  },
  {
    "slug": "csv-clean",
    "name": "CSV 行空白清理",
    "category": "数据与格式",
    "description": "规范换行并去除每行首尾空白，适用于简单 CSV 文本",
    "operation": "csv-clean"
  },
  {
    "slug": "table-to-markdown",
    "name": "表格转 Markdown",
    "category": "数据与格式",
    "description": "将 CSV 转成 Markdown 表格",
    "operation": "table-to-markdown"
  },
  {
    "slug": "json-key-sort",
    "name": "JSON 键排序",
    "category": "数据与格式",
    "description": "递归按键名排序 JSON 对象",
    "operation": "json-key-sort"
  },
  {
    "slug": "json-stringify",
    "name": "JSON 字符串化",
    "category": "数据与格式",
    "description": "将输入文本包装为 JSON 字符串",
    "operation": "json-stringify"
  },
  {
    "slug": "json-unstringify",
    "name": "JSON 字符串还原",
    "category": "数据与格式",
    "description": "还原 JSON 中的字符串内容",
    "operation": "json-unstringify"
  },
  {
    "slug": "bmi",
    "name": "BMI 计算器",
    "category": "生活与实用",
    "description": "根据身高体重计算 BMI（仅供参考）",
    "operation": "bmi"
  },
  {
    "slug": "calorie-estimate",
    "name": "每日热量估算",
    "category": "生活与实用",
    "description": "用基础公式估算基础代谢（仅供参考）",
    "operation": "calorie-estimate"
  },
  {
    "slug": "tip-calculator",
    "name": "小费计算器",
    "category": "生活与实用",
    "description": "计算小费和分摊金额",
    "operation": "tip-calculator"
  },
  {
    "slug": "loan-payment",
    "name": "贷款月供计算",
    "category": "生活与实用",
    "description": "根据本金、年利率和期限估算月供",
    "operation": "loan-payment"
  },
  {
    "slug": "discount",
    "name": "折扣计算器",
    "category": "生活与实用",
    "description": "计算折后价格与节省金额",
    "operation": "discount"
  },
  {
    "slug": "split-bill",
    "name": "账单分摊",
    "category": "生活与实用",
    "description": "将总金额按人数平均分摊",
    "operation": "split-bill"
  },
  {
    "slug": "word-frequency",
    "name": "词频统计",
    "category": "生活与实用",
    "description": "统计英文单词出现次数",
    "operation": "word-frequency"
  },
  {
    "slug": "reading-time",
    "name": "阅读时间估算",
    "category": "生活与实用",
    "description": "按阅读速度估算阅读分钟数",
    "operation": "reading-time"
  },
  {
    "slug": "json-to-js-object",
    "name": "JSON 转 JavaScript 对象",
    "category": "开发者工具",
    "description": "将 JSON 转换为 JavaScript 对象字面量",
    "operation": "json-to-js-object"
  },
  {
    "slug": "json-to-csharp",
    "name": "JSON 转 C# 模型",
    "category": "开发者工具",
    "description": "根据 JSON 示例生成 C# 类和属性类型",
    "operation": "json-to-csharp"
  },
  {
    "slug": "json-to-java",
    "name": "JSON 转 Java 模型",
    "category": "开发者工具",
    "description": "根据 JSON 示例生成 Java DTO 字段和类型",
    "operation": "json-to-java"
  },
  {
    "slug": "json-to-php",
    "name": "JSON 转 PHP 数组",
    "category": "开发者工具",
    "description": "将 JSON 转换为可用的 PHP 数组表达式",
    "operation": "json-to-php"
  },
  {
    "slug": "json-pick-fields",
    "name": "JSON 字段提取",
    "category": "数据与格式",
    "description": "按字段名从 JSON 对象或对象数组中提取字段",
    "operation": "json-pick-fields"
  },
  {
    "slug": "json-merge",
    "name": "JSON 深度合并",
    "category": "数据与格式",
    "description": "深度合并两个 JSON 对象，后一个对象覆盖同名值",
    "operation": "json-merge"
  },
  {
    "slug": "json-lines-merge",
    "name": "JSON 行合并",
    "category": "数据与格式",
    "description": "将每行一个 JSON 值合并成标准 JSON 数组并定位错误行",
    "operation": "json-lines-merge"
  },
  {
    "slug": "json-to-array",
    "name": "JSON 对象转数组",
    "category": "数据与格式",
    "description": "提取 JSON 对象的字段值并转换为数组",
    "operation": "json-to-array"
  },
  {
    "slug": "text-filter",
    "name": "正则文本过滤",
    "category": "文本工具",
    "description": "使用正则表达式筛选匹配的文本行",
    "operation": "text-filter"
  },
  {
    "slug": "text-prefix",
    "name": "批量添加前缀",
    "category": "文本工具",
    "description": "为每一行批量添加指定前缀",
    "operation": "text-prefix"
  },
  {
    "slug": "text-suffix",
    "name": "批量添加后缀",
    "category": "文本工具",
    "description": "为每一行批量添加指定后缀",
    "operation": "text-suffix"
  },
  {
    "slug": "text-wrap-quotes",
    "name": "逐行添加引号",
    "category": "文本工具",
    "description": "为每一行添加指定引号并转义内部引号",
    "operation": "text-wrap-quotes"
  },
  {
    "slug": "substring-extract",
    "name": "子字符串提取",
    "category": "文本工具",
    "description": "按开始和结束标记提取两者之间的内容",
    "operation": "substring-extract"
  },
  {
    "slug": "text-diff",
    "name": "文本差异对比",
    "category": "文本工具",
    "description": "逐行比较两段文本并标记新增、删除和相同行",
    "operation": "text-diff"
  }
];
