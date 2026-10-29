# 工具目录

当前目录包含 **130 个实用工具**。重点覆盖文本处理、JSON 数据加工、开发者代码转换与常用格式处理。新增工具均有对应处理器和烟雾测试。

## 文本工具（25）

- [字数统计](/tools/text-count/)：统计字符、单词、行数和段落数
- [文本行排序](/tools/line-sort/)：按字母或字符顺序排序文本行
- [文本行去重](/tools/line-dedupe/)：删除重复行并保留首次出现顺序
- [文本行反转](/tools/line-reverse/)：反转文本行的排列顺序
- [清理行首尾空格](/tools/trim-lines/)：清理每一行首尾空白
- [删除空白行](/tools/blank-lines/)：移除空行和仅含空格的行
- [转大写](/tools/case-upper/)：将英文文本转换为大写
- [转小写](/tools/case-lower/)：将英文文本转换为小写
- [标题格式转换](/tools/case-title/)：将英文单词转换为标题式大小写
- [句首大写](/tools/case-sentence/)：将句子开头转换为大写
- [文本反转](/tools/text-reverse/)：反转文本中的字符
- [查找替换](/tools/text-replace/)：按指定字符串查找并替换
- [Slug 生成器](/tools/text-to-slug/)：将标题转换为 URL 友好的 slug
- [逗号转行](/tools/text-to-lines/)：将逗号分隔的文本转换为逐行列表
- [行转逗号](/tools/lines-to-comma/)：将多行内容转换为逗号分隔文本
- [文本清理](/tools/text-clean/)：去除控制字符并规范换行
- [正则转义](/tools/text-escape-regex/)：转义正则表达式中的特殊字符
- [唯一单词](/tools/text-unique-words/)：提取文本中的不重复单词
- [Lorem Ipsum 生成](/tools/lorem/)：生成指定段数的占位文本
- [正则文本过滤](/tools/text-filter/)：使用正则表达式筛选匹配的文本行
- [批量添加前缀](/tools/text-prefix/)：为每一行批量添加指定前缀
- [批量添加后缀](/tools/text-suffix/)：为每一行批量添加指定后缀
- [逐行添加引号](/tools/text-wrap-quotes/)：为每一行添加指定引号并转义内部引号
- [子字符串提取](/tools/substring-extract/)：按开始和结束标记提取两者之间的内容
- [文本差异对比](/tools/text-diff/)：逐行比较两段文本并标记新增、删除和相同行

## 开发者工具（26）

- [JSON 格式化](/tools/json-format/)：格式化 JSON 并显示缩进
- [JSON 压缩](/tools/json-minify/)：压缩 JSON 去除空白
- [JSON 校验](/tools/json-validate/)：验证 JSON 是否有效
- [JSON 转 YAML](/tools/json-to-yaml/)：将 JSON 数据转换为基础 YAML
- [YAML 转 JSON（基础）](/tools/yaml-to-json/)：解析简单键值 YAML 并转换为 JSON
- [XML 转义](/tools/xml-escape/)：转义 XML 特殊字符
- [URL 编码](/tools/url-encode/)：使用 encodeURIComponent 编码文本
- [URL 解码](/tools/url-decode/)：解码 URL 编码文本
- [Base64 编码](/tools/base64-encode/)：将 UTF-8 文本编码为 Base64
- [Base64 解码](/tools/base64-decode/)：将 Base64 解码为 UTF-8 文本
- [HTML 实体编码](/tools/html-encode/)：编码 HTML 特殊字符
- [HTML 实体解码](/tools/html-decode/)：解码常见 HTML 实体
- [正则表达式测试](/tools/regex-test/)：用正则表达式匹配文本
- [UUID 生成器](/tools/uuid-gen/)：生成随机 UUID v4
- [随机密码生成器](/tools/password-gen/)：生成安全随机密码
- [SHA-256 计算](/tools/hash-sha256/)：计算文本的 SHA-256 摘要
- [JWT 解码](/tools/jwt-decode/)：解码 JWT 的 Header 和 Payload（不验证签名）
- [URL 解析](/tools/url-parse/)：解析 URL 的协议、主机、路径和参数
- [查询参数解析](/tools/querystring-parse/)：将 URL 查询字符串转换为 JSON
- [查询参数生成](/tools/querystring-build/)：将 JSON 对象转换为查询字符串
- [Unix 权限转换](/tools/unix-permissions/)：将 chmod 数字权限转换为 rwx 字符串
- [Cron 表达式说明](/tools/cron-explain/)：拆解常见 Cron 五段表达式
- [JSON 转 JavaScript 对象](/tools/json-to-js-object/)：将 JSON 转换为 JavaScript 对象字面量
- [JSON 转 C# 模型](/tools/json-to-csharp/)：根据 JSON 示例生成 C# 类和属性类型
- [JSON 转 Java 模型](/tools/json-to-java/)：根据 JSON 示例生成 Java DTO 字段和类型
- [JSON 转 PHP 数组](/tools/json-to-php/)：将 JSON 转换为可用的 PHP 数组表达式

## 编码与转换（14）

- [文本转二进制](/tools/binary-encode/)：将文本转为 UTF-8 字节二进制表示
- [二进制转文本](/tools/binary-decode/)：将 8 位二进制字节解码为文本
- [文本转十六进制](/tools/hex-encode/)：将文本转为 UTF-8 十六进制
- [十六进制转文本](/tools/hex-decode/)：将十六进制解码为文本
- [Unicode 查看器](/tools/unicode-inspect/)：显示字符、码点和 UTF-16 编码
- [摩斯电码编码](/tools/morse-encode/)：将常见英文字母和数字转为摩斯码
- [摩斯电码解码](/tools/morse-decode/)：将摩斯码转换为英文和数字
- [ROT13 转换](/tools/rot13/)：执行 ROT13 字母转换
- [凯撒密码](/tools/caesar/)：按偏移量进行凯撒字母位移
- [CSV 转 JSON](/tools/csv-to-json/)：将基础 CSV 表格转换为 JSON 数组
- [JSON 转 CSV](/tools/json-to-csv/)：将 JSON 对象数组转换为 CSV
- [Markdown 纯文本提取](/tools/markdown-preview-text/)：去除常见 Markdown 标记
- [HTML 转纯文本](/tools/html-to-text/)：移除标签并提取文本
- [URL 安全 Base64](/tools/url-safe-base64/)：进行 URL-safe Base64 编码

## 时间与日期（4）

- [时间戳转日期](/tools/timestamp-date/)：将 Unix 秒或毫秒时间戳转换为日期
- [日期转时间戳](/tools/date-timestamp/)：将日期字符串转换为 Unix 秒和毫秒
- [日期间隔计算](/tools/date-diff/)：计算两个日期之间的天数差
- [星期计算](/tools/weekday/)：计算日期对应的星期几

## 数学与数字（15）

- [计算器](/tools/calculator/)：支持基础四则运算和括号
- [百分比计算](/tools/percentage/)：计算一个数占另一个数的百分比
- [百分比变化](/tools/percent-change/)：计算两个数之间的百分比变化
- [平均值计算](/tools/average/)：计算一组数字的平均值
- [中位数计算](/tools/median/)：计算一组数字的中位数
- [求和计算](/tools/sum/)：计算一组数字之和
- [随机数生成](/tools/random-number/)：生成指定范围的随机整数
- [进制转换](/tools/number-base/)：十进制转换为二进制、八进制和十六进制
- [罗马数字转换](/tools/roman-numeral/)：阿拉伯数字与罗马数字互转（1-3999）
- [阶乘计算](/tools/factorial/)：计算非负整数阶乘（上限 170）
- [质数判断](/tools/prime-check/)：判断整数是否为质数
- [最大公约数与最小公倍数](/tools/gcd-lcm/)：计算两个整数的 GCD 与 LCM
- [数字舍入](/tools/round-number/)：按指定小数位数舍入数字
- [长度单位换算](/tools/unit-convert/)：米、千米、厘米、英尺和英寸换算
- [温度换算](/tools/temperature/)：摄氏度、华氏度和开尔文换算

## 颜色工具（10）

- [HEX 转 RGB](/tools/color-hex-rgb/)：将 HEX 颜色转换为 RGB
- [RGB 转 HEX](/tools/color-rgb-hex/)：将 RGB 颜色转换为 HEX
- [RGB 转 HSL](/tools/color-rgb-hsl/)：将 RGB 颜色转换为 HSL
- [HSL 转 RGB](/tools/color-hsl-rgb/)：将 HSL 颜色转换为 RGB
- [对比度计算](/tools/color-contrast/)：计算两种颜色的 WCAG 对比度
- [随机颜色](/tools/color-random/)：生成随机 HEX 颜色
- [配色板生成](/tools/color-palette/)：基于主色生成简单配色板
- [颜色反转](/tools/color-invert/)：计算 HEX 颜色的反色
- [相对亮度](/tools/color-luminance/)：计算颜色相对亮度
- [CSS 渐变生成](/tools/css-gradient/)：输入两个 HEX 色值，生成线性渐变 CSS

## 安全与生成器（4）

- [SHA-1 计算](/tools/hash-sha1/)：计算 SHA-1 摘要（不用于安全签名）
- [SHA-512 计算](/tools/hash-sha512/)：计算 SHA-512 摘要
- [HMAC-SHA256](/tools/hmac-sha256/)：用浏览器 Web Crypto 计算 HMAC-SHA256
- [密码强度检查](/tools/password-strength/)：根据长度和字符种类给出本地估算

## Web 与网络（8）

- [宽高比计算](/tools/aspect-ratio/)：计算宽高比和等比例尺寸
- [Meta 标签生成](/tools/html-meta/)：根据标题、描述和网址生成 Meta 标签
- [robots.txt 生成](/tools/robots-txt/)：生成基础 robots.txt 内容
- [Sitemap URL 条目生成](/tools/sitemap-url/)：将网址包装为 sitemap XML 的单条 URL 记录
- [HTTP 状态码查询](/tools/http-status/)：查询常见 HTTP 状态码说明
- [MIME 类型查询](/tools/mime-type/)：查询常见文件扩展名的 MIME 类型
- [IP 地址格式检查](/tools/ip-format/)：检查 IPv4 地址格式
- [邮箱格式检查](/tools/email-validate/)：检查常见邮箱格式（非投递验证）

## 图片与设计（3）

- [SVG 文本压缩](/tools/svg-minify/)：压缩简单 SVG 文本中的空白
- [SVG 转 Data URI](/tools/svg-to-data-uri/)：将 SVG 文本转换为 Data URI
- [设计 Token 生成](/tools/design-token/)：将颜色与间距输入转成 CSS 变量

## 数据与格式（13）

- [列表转 JSON](/tools/list-to-json/)：将逐行文本转换为 JSON 字符串数组
- [JSON 数组转列表](/tools/json-to-list/)：将 JSON 数组转换为逐行文本
- [数字千分位格式化](/tools/number-format/)：为数字添加千分位分隔符
- [字节单位换算](/tools/byte-convert/)：字节转换为 KB、MB、GB
- [CSV 行空白清理](/tools/csv-clean/)：规范换行并去除每行首尾空白，适用于简单 CSV 文本
- [表格转 Markdown](/tools/table-to-markdown/)：将 CSV 转成 Markdown 表格
- [JSON 键排序](/tools/json-key-sort/)：递归按键名排序 JSON 对象
- [JSON 字符串化](/tools/json-stringify/)：将输入文本包装为 JSON 字符串
- [JSON 字符串还原](/tools/json-unstringify/)：还原 JSON 中的字符串内容
- [JSON 字段提取](/tools/json-pick-fields/)：按字段名从 JSON 对象或对象数组中提取字段
- [JSON 深度合并](/tools/json-merge/)：深度合并两个 JSON 对象，后一个对象覆盖同名值
- [JSON 行合并](/tools/json-lines-merge/)：将每行一个 JSON 值合并成标准 JSON 数组并定位错误行
- [JSON 对象转数组](/tools/json-to-array/)：提取 JSON 对象的字段值并转换为数组

## 生活与实用（8）

- [BMI 计算器](/tools/bmi/)：根据身高体重计算 BMI（仅供参考）
- [每日热量估算](/tools/calorie-estimate/)：用基础公式估算基础代谢（仅供参考）
- [小费计算器](/tools/tip-calculator/)：计算小费和分摊金额
- [贷款月供计算](/tools/loan-payment/)：根据本金、年利率和期限估算月供
- [折扣计算器](/tools/discount/)：计算折后价格与节省金额
- [账单分摊](/tools/split-bill/)：将总金额按人数平均分摊
- [词频统计](/tools/word-frequency/)：统计英文单词出现次数
- [阅读时间估算](/tools/reading-time/)：按阅读速度估算阅读分钟数
