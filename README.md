# WxCool [![NPM Version](https://img.shields.io/npm/v/wx-cool.svg?style=flat)](https://npmjs.org/package/wx-cool) ![repo size](https://img.shields.io/github/repo-size/awhitemouse/wxcool) [![NPM Version](https://img.shields.io/npm/l/wx-cool)](https://npmjs.org/package/wx-cool)

> 致力于打造一套简洁高效的小程序脚手架

## 准备工作

### 全局安装Gulp-cli

```shell
npm install -g gulp-cli
or
yarn add -g gulp-cli
```

### 检查Gulp-cli是否安装成功

```shell
gulp -v
```

## 如何使用

### 安装

```shell
npm i wx-cool
```

### 依赖加载

```shell
npm install
or
yarn install
```

### 配置

> + server.js：Hapi服务mock数据，每个接口都需要配置路由数据
> + src/project.config.json：项目配置文件，需要填写appid
> + src/utils/ajaxConfig.js：请求接口配置文件（不附带域名以及固定前缀）。所有的请求接口都在这里配置
> + src/utils/config.js：数据字典配置，所有的数据字典都在这里配置
> + src/utils/imgConfig.js：图片路径配置，所有的图片路径都在这里配置
> + src/utils/request.js：请求封装，已封装完成，基本无需更改
> + src/utils/util.js：公共方法
> + src/env/development.js：开发环境请求地址配置，此处配置的是server.js中的域名，无需修改
> + src/env/production.js：线上环境请求地址配置
> + src/env/testing.js：测试环境请求地址配置

### 编译

```shell
npm run dev：开发环境
npm run test：测试环境
npm run build：线上环境
```

## 目录结构

`文件目录结构生成失败`

## 代码规范 & 注意事项

> + src文件夹是我们需要编辑的文件夹，dist文件夹是编译后的文件夹，是我们查看编译结果的文件夹
> + 组件放置在components文件夹中，图片放置在images文件夹中
> + 所有的接口都必须在ajaxConfig.js中配置，仅配置接口路径，不配置域名以及固定项目路径
> + 除了必须写在wxss文件中的图片路径外，其他所有的图片路径都必须在imgConfig.js中配置
> + 在js和wxml中最好不要出现带有特定含义的数字、字符串、数组等，这些信息都需要在config.js中进行配置
> + 一些通用的方法都要写在util.js中
> + 在开发环境执行npm run dev命令后，请不要关闭命令窗口，否则dist文件夹将不能自动更新
