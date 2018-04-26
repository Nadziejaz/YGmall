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
    'login':['./src/page/login/login.js'],
    'result':['./src/page/result/index.js'],
},
  output: {
  path: './dist', 
  filename: 'js/[name].js',
  },
  externals:{
    'jquery':"window.jQuery"
  },
  module: {
        loaders: [
            { test: /\.css$/, loader: Ex.extract("style-loader","css-loader",{
              publicPath:'../'
          }) },
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
  new Html(getConfig('result','结果页')),


  ],
};
module.exports=config