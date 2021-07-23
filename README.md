### 背景
在负责rn 版本开发中， 还需要负责H5的开发工作。已有的H5项目未使用任何打包工具，框架。
每个页面都是html + css +js。 且页面多语言的实现是每个语言一个页面， 需求实现过程中存在大量的重复工作。
在优化过程中总结出该项目。

### 项目使用场景
app 中webView H5 活动页， 承载不太复杂的交互，以展示为主。

### 技术方案
以jq 为基础搭页面。项目引入mobileBone 实现单页面的路由转场，达到类似Native APP 交互体验。

### 项目结构
在了解项目结构之前， 可以先了解一下 [mobileBone](http://www.mobilebone.org/guide/#&index.html) 的实现思路;   
且该项目结构考虑到于原有项目结构的兼容， 使用时可根据自己的项目做调整。

```
├── dist
│   ├── css   
│   ├── index.html
│   ├── js   
│   ├── lib
│   └── pages
├── package.json
├── README.md
├── src
│   ├── common
│   │   └── assets
│   │       └── css
│   ├── index.html
│   ├── index.js
│   ├── lib
│   │   ├── jquery
│   │   │   └── jquery-3.6.0.min.js
│   │   └── mobilebone
│   │       ├── mobilebone.animate.css
│   │       ├── mobilebone.css
│   │       └── mobilebone.js
│   └── pages
│       └── about
│           ├── index.html
│           ├── index.js
│           └── page.config.js
├── webpack.config.dev.js
├── webpack.config.js
├── webpack.config.prod.js
└── yarn.lock


```    


打包后直接部署dist 目录即可。
src 作为源文件。 pages 目录下的页面不依赖于 mobileBone  
jquery-3.6.0.min.js 作为基础依赖，如果使用 mobileBone 则需要每个页面单独引入


### 使用

可直接在该项目的基础上进行开发。pages 目录下每个文件夹作为一个模块， 每个html 文件作为一个页面。page.config.js 作为webpack 打包配置

### 启动

node 版本：v14.15.0
```
npm run dev
```



