# `angular-gulp-bower-seed` — 基于AngularJs构建单页面应用的项目种子
从实际项目中分离出来的项目种子，可用来搭建大型单页面应用，gulp配置非常详细，使用方便。

This project is an application skeleton for a typical [AngularJS][angularjs] web app. You can use it
to quickly bootstrap your angular webapp projects and dev environment for these projects.

## 源代码
源代码地址：[GitHub](https://github.com/anetin/angular-gulp-bower-seed)
欢迎star和follow😁


## 技术栈
**AngularJs**：采用AngularJs 1的语法

**Gulp**：自动化构建工具，基于本目录结构，配置完整详细，使用方便。

**ui.router**：采用ui.router管理路由

**angular-resource**：采用angular-resource进行访问后台API

**localStorage(HTML5)**：本地存储，保存用户个性化设置。



## 使用 Build Setup

To get you started you can simply clone the `angular-gulp-bower-seed` repository and install the dependencies:

### Prerequisites

You need git to clone the `angular-gulp-bower-seed` repository. You can get git from [here][git].

We also use a number of Node.js tools to initialize and test `angular-gulp-bower-seed`. You must have Node.js
and its package manager (npm) installed. You can get them from [here][node].

### Clone `angular-gulp-bower-seed`

Clone the `angular-gulp-bower-seed` repository using git:

```
git clone https://github.com/anetin/angular-gulp-bower-seed.git
cd angular-gulp-bower-seed
```

``` bash
# install dependencies
npm install

# install angular .etc
bower install

# build for production with minification
npm run build

# serve with hot reload at localhost:8081
npm run server
```

### [项目结构](https://github.com/Anetin/angular-gulp-bower-seed/blob/master/angular-gulp-bower-seed.png)
```
angular-gulp-bower-seed
│  .bowerrc  //bower安装包目录配置
│  .gitignore
│  angular-gulp-bower-seed.png
│  bower.json
│  gulpfile.js  //gulp配置文件，打包处理，开启服务等等
│  LICENSE
│  mockAPI.js  //构造.json数据文件后，通过读取文件方式模拟API请求，在前后端开发进度不一致时非常有用
│  package.json
│  README.md
│
├─app  //项目开发目录
│   │  angular.png.ico
│   │  app.js  //angular项目公共配置，包括主模块创建，路由配置，http拦截处理等
│   │  index-dist.html  // 供gulp编译，引入打包后的文件（script/styles/fonts）
│   │  index.html  SPA项目入口
│   │
│   ├─bower_components //bower管理的依赖库
│   │  ├─angular
│   │  ├─angular-bootstrap
│   │  ├─angular-cookies
│   │  ├─angular-local-storage
│   │  ├─angular-md5
│   │  ├─angular-resource
│   │  ├─angular-route
│   │  ├─angular-ui
│   │  ├─angular-ui-router
│   │  ├─bootstrap
│   │  └─jquery
│   ├─data //构建json格式的静态数据（mock datas）
│   │      csrfToken.json
│   │      login.json
│   │
│   ├─public //项目公共资源，包括字体，图片
│   │  ├─css
│   │  ├─fonts
│   │  └─images
│   │
│   └─src //项目源代码
│       ├─controllers  //控制器相关代码，语义化命名
│       │      appControllers.js
│       │
│       ├─directives  //自定义指令相关代码
│       │  │  directives.js  //指令脚本
│       │  │
│       │  └─tpls   //指令模板文件夹
│       │          datepicker.html
│       │          modal.html
│       │          pagination.html
│       │
│       ├─filters //过滤器代码
│       │      filters.js
│       │
│       ├─services //服务代码
│       │      apiServices.js //与API请求相关服务
│       │      app.util.js  //公共服务
│       │      services.js  //其他
│       │
│       ├─styles  //项目样式文件夹
│       │      app.css
│       │      directives.css
│       │      page1.css
│       │      page2.css
│       │
│       └─templates  //项目视图文件夹
│           │  app.html
│           │  login.html
│           │  noRight.html
│           │
│           ├─modalViews  //模态框视图文件夹
│           │
│           ├─page1Views  //按业务划分视图1文件夹
│           │
│           └─page2Views  //按业务划分视图2文件夹
│
│
├─appDist  //项目编译打包后生成目录
│  angular.png.ico
│  index.html
│
├─public
│  ├─css
│  │      iconfont.css
│  │
│  ├─fonts
│  │      iconfont.eot
│  │      iconfont.svg
│  │      iconfont.ttf
│  │      iconfont.woff
│  │
│  └─images
│          loading.gif
│
├─static
│  ├─css
│  │      app.min.css
│  │
│  └─js
│          app.min.js
│
└─vendor
```





