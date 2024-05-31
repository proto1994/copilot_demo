# 使用 Node.js 激活 GitHub Copilot

## 说明

练习 GitHub Copilot 实验练习

用于运行实验以评估 Copilot 可行性的演示项目

## 练习步骤

1. 将练习文件夹下载到本地
2. 打开 `NodeServer.js`，并开始编写一个 Node.js 服务器，根据初始文本检查第一个建议
3. 打开 `test.js` 文件并分析当前测试
4. 打开命令提示符并运行测试 (运行 `mocha test.js`)
5. 查看结果，应该显示如下内容：
    ```
    mocha test.js
    server is listening on port 3000
    
      Node Server
        
        √ should return "key not passed" if key is not passed
    
      1 passing (34ms)
    ```
6. 在 `NodeServer.js` 中实现练习中描述的其余方法（不要忘记在 Visual Studio Code 中打开 `color.json` 文件，以便 Copilot 获得更好的推荐上下文）
7. 在 `test.js` 文件中添加测试功能的方法
8. 运行测试以验证一切正常
9. 打开 `dockerfile` 文件，并填写它，以便使用 Node 镜像创建一个能够运行 Web 服务器的 Docker 容器
10. 创建命令以在端口 4000 上运行 docker
11. 测试应用程序是否在端口 4000 上运行

## Node.js 服务器练习

练习包括使用 Node.js 构建一个 Web 服务器，以处理各种功能的请求。服务器必须处理的请求包括：

- `/Get`:
    - 返回一个 "hello world" 消息

- `/DaysBetweenDates`:
    - 计算两个日期之间的天数
    - 通过查询字符串接收 2 个参数 `date1` 和 `date2`，并计算这两个日期之间的天数

- `/ValidatePhoneNumber`:
    - 通过查询字符串接收名为 `phoneNumber` 的参数
    - 用西班牙格式验证 `phoneNumber`，例如 +34666777888
    - 如果 `phoneNumber` 有效则返回 "valid"，如果无效则返回 "invalid"

- `/ValidateSpanishDNI`:
    - 通过查询字符串接收名为 `dni` 的参数
    - 计算 DNI 字母
    - 如果 DNI 有效则返回 "valid"，如果无效则返回 "invalid"

- `/ReturnColorCode`:
    - 通过查询字符串接收名为 `color` 的参数
    - 读取 `colors.json` 文件并返回 `rgba` 字段
    - 从查询字符串获取 `color` 变量
    - 遍历 `colors.json` 中的每种颜色以找到该颜色
    - 返回 `code.hex` 字段

- `/TellMeAJoke`:
    - 调用笑话 API 并使用 axios 返回一个随机笑话

- `/MoviesByDirector`:
    - 通过查询字符串接收名为 `director` 的参数
    - 调用电影 API 并使用 axios 返回该导演的电影列表
    - 返回完整的电影列表

- `/ParseUrl`:
    - 从查询字符串中检索名为 `someurl` 的参数
    - 解析 URL 并返回协议、主机、端口、路径、查询字符串和哈希
    - 返回解析的主机

- `/ListFiles`:
    - 获取当前目录
    - 获取当前目录中的文件列表
    - 返回文件列表

- `/GetFullTextFile`:
    - 读取 `sample.txt` 并返回包含单词 "Fusce" 的行
    - (注意此实现，因为通常在分析之前会读取文件的全部内容，因此内存使用高，当文件太大时可能会失败)

- `/GetLineByLineFromTextFile`:
    - 逐行读取 `sample.txt`
    - 创建一个按行读取文件的承诺，并返回包含单词 "Fusce" 的行列表
    - 返回行的列表

- `/CalculateMemoryConsumption`:
    - 返回进程的内存消耗，以 2 位小数 GB 为单位

- `/MakeZipFile`:
    - 使用 zlib 创建一个名为 `sample.gz` 的 zip 文件，其中包含 `sample.txt`

- `/RandomEuropeanCountry`:
    - 创建一个包含欧洲国家及其 ISO 代码的数组
    - 从数组中返回一个随机国家
    - 返回国家及其 ISO 代码

## GitHub Copilot 实验练习

可以使用 Copilot 实验室插件执行以下任务，当前为预览功能，可能会有一些错误。

- 确保安装 GitHub Copilot 实验室扩展：[GitHub Copilot Labs](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-labs)
- 打开 GitHub Copilot 扩展以查看所有可用的功能。

### 功能介绍

- **Explain**: 选择 `validatePhoneNumber` 方法中具有正则表达式的行，在“解释”部分点击“向 Copilot 询问”。你将看到一个详细解释正则表达式中不同符号的含义。
- **语言翻译**: 选择一些源代码，比如这行：
    ```javascript
    var randomCountry = countries[Math.floor(Math.random() * countries.length)];
    ```
    在“语言翻译”部分选择 Python 并单击“向 Copilot 询问”按钮，你应该看到新的 Python 代码。
- **可读性**: 选择 `MakeZipFile` 的内容在“可读性”部分，点击“可读性”，查看如何添加注释以及将具有简短名称的变量重命名为更易理解的名称。

### 其他功能

- **修复错误**: 在练习中，不应该有错误，因为大部分代码将由 Copilot 完成。我们可以强制一些错误，然后测试调试功能。制造一些错误，比如：
    ```javascript
    for (var i = 1
    ```
    选择文本，在“刷子”部分单击“修复错误”按钮。
- **调试**: 选择包含变量的一些文本行，比如：
    ```javascript
    var queryData = url.parse(req.url, true).query;
    var color = queryData.color;
    var colorFound = "not found";
    ```
    选择文本，在“刷子”部分点击“调试”按钮。
- **整理**: 待定
- **列出步骤**: 选择没有注释的一些代码行，在“刷子”部分点击“列出步骤”按钮。
- **使健壮**: 选择来自输入的一些文本，例如来自查询字符串的变量：
    ```javascript
    var queryData = url.parse(req.url, true).query;
    var date1 = queryData.date1;
    var date2 = queryData.date2;
    ```
    在“刷子”部分点击“使健壮”按钮，你会看到添加了额外的验证。
- **分块**: 待定
- **文档**: 选择一行（例如一个方法或 if 子句的开始）
    ```javascript
    else if (req.url.startsWith('/GetFullTextFile'))
    ```
    在“刷子”部分点击“文档”按钮，你会看到在这一行之前添加了解释代码功能的注释。
- **生成测试**: 待定
