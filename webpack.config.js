var webpack=require('webpack');
var Ex = require('extract-text-webpack-plugin');
var Html=require('html-webpack-plugin');
var getConfig=function(name){
	return{ template:'./src/view/'+name+'.html',
	filename:'view/'+name+'.html',
	inject:true,
	hash:true,
	chunks:['common',name]}
}
var config = {
  entry: 
  {
    'common':['./src/page/common/index.js'],
    'index':['./src/page/index/index.js'],
    'login':['./src/page/login/login.js'],
},
  output: {
	path: './dist' ,
	publicPath : '/dist',
    filename: 'js/[name].js',
  },
  externals:{
    'jquery':"window.jQuery"
  },
  module: {
    loaders: [{
      test: /\.css$/,
	  loader: Ex.extract('style-loader', 'css-loader'),
	   // 单独打包出CSS，这里配置注意下
	},
	{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
	{ test: /\.string$/, loader: 'html-loader'}]
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name:'common',
      filename:'js/base.js'
    }),
    new Ex("css/[name].css"),
	new Html(getConfig('index')),
	new Html(getConfig('login')),

  ],
};
module.exports=config