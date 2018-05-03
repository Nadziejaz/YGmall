var webpack=require('webpack');
var Ex = require('extract-text-webpack-plugin');
var Html=require('html-webpack-plugin');

var getConfig=function(name,title){
	return{ template:'./src/view/'+name+'.html',
	filename:'view/'+name+'.html',
  title :title,
  inject:true,
	hash:true,
	chunks:['common',name]};
};
var config = {
  entry: 
  {
        'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'list':['./src/page/list/index.js'],
        'detail':['./src/page/detail/index.js'],
        'login':['./src/page/login/login.js'],
        'user-reg':['./src/page/user-reg/index.js'],
        'user-fixpsw':['./src/page/user-fixpsw/index.js'],
        'user-center':['./src/page/user-center/index.js'],
        'user-center-updata':['./src/page/user-center-updata/index.js'],
        'user-newpsw':['./src/page/user-newpsw/index.js'],
        'result':['./src/page/result/index.js'],
},
  output: {
  path: './dist', 
  publicPath:'../',
  filename: 'js/[name].js',
  },
  externals:{
    'jquery':"window.jQuery"
  },
  module: {
        loaders: [
            { test: /\.css$/, loader: Ex.extract("style-loader","css-loader"
          ) },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
    }, 
  resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name:'common',
      filename:'js/base.js'
    }),
  new Ex("css/[name].css"),
	new Html(getConfig('index','首页')),
  new Html(getConfig('login','用户登录')),
  new Html(getConfig('result','操作结果')),
  new Html(getConfig('user-reg','用户注册')),
  new Html(getConfig('user-fixpsw','修改密码')),
  new Html(getConfig('user-center','个人中心')),
  new Html(getConfig('user-center-updata','修改个人信息')),
  new Html(getConfig('user-newpsw','修改密码')),
  new Html(getConfig('list','列表页')),
  new Html(getConfig('detail','商品详情')),


  ],
};
module.exports=config