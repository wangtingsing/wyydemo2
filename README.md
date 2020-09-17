# vue-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



<topnav v-if='$store.state.topisshow'></topnav>  无效？？？？
state 设置布尔值带“” 变成了字符串

路由  ：to   name path 区别


路由传参  路由里需接收


res.data 里面{{res.data.playlist.coverImgUrl}}获取不到   只有将coverImgUrl放到data里面 res.data放data却不行
mounted 调用data里面异步请求来的数据 不行 异步未执行完