# Express Annotate JS [![gitee.png](https://palerock.cn/api-provider/files/view?identity=L2FydGljbGUvaW1hZ2UvMjAyMDA2MjkxNTQyMTMwNzVXcWZyU2dTbC5wbmc=&w=15)](https://gitee.com/HGJing/express-annotate-js) [![github.png](https://palerock.cn/api-provider/files/view?identity=L2FydGljbGUvaW1hZ2UvMjAyMDA2MjkxNjU3NDkzMDkybWNLRXhHMi5wbmc=&w=15)](https://github.com/canguser/express-annotate-js)

**Express Annotate JS** 是一个基于 Javascript 中的注解提案 `proposal-decorators` 和 `Express` 而实现的一套快速开发的 NodeJS 框架，其注解模块核心基于 [Annotate JS](https://github.com/canguser/annotate-js)  
## 使用条件及环境  
- 依赖项目
    - `"@palerock/annotate-js": "^1.2.10"`
    - `"express": "^4.17.1"`
- 使用前提
    - 需要对 NodeJS 服务端开发有一定了解
    - 需要对 express 框架有一定了解
    - 需要了解 `proposal-decorators` 提案以及如何通过 babel 来搭建开发环境
    - 需要了解 [Annotate JS](https://github.com/canguser/annotate-js) 该框架的基本注解用法
## 快速开始
### 引入
```shell script
npm install @palerock/express-annotate-js
```
以及一个简单的能够使用 `proposal-decorators` 提案的开发环境
```json
{
  "presets": [
    [
      "@babel/preset-env"
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    "@babel/plugin-proposal-function-bind",
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ]
  ]
}
```
### 使用
```javascript
import {launcher, GetMapping, Register} from "@palerock/express-annotate-js";
import {Boot, Autowired, Bean} from "@palerock/annotate-js"; 

@Register // 将该 class 注册为 web 服务
class DemoController {

    @Autowired
    DemoService; // 自动注入 Service

    @GetMapping({url: '/'})
    getContent({content}) {
        // 通过参数注入获取请求参数
        return `Hello Express Annotate JS, ${this.DemoService.parseContent(content)}`;
    }

}

@Bean
class DemoService {
    parseContent(content) {
        return `Parsed content: ${content}`;
    }
}

@Boot
class Application {

    port = 3034;

    main() {
        // 启动服务
        launcher.start(this.port);
    }

}
```
运行后在浏览器输入以下链接 `http://localhost:3034/?content=Enjoy%20it`  
将会看到显示如下内容： `"Hello Express Annotate JS, Parsed content: Enjoy it"`  
## 文档撰写中，具体详情请参考源码或留言评论