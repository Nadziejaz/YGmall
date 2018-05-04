require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var navSide = require('page/common/nav-side/index.js');
var _YG = require('util/YG.js');
var _user = require('service/user-service.js');
var templateIndex =require('./index.string')
var page={
    init:function(){
        this.onLoad();
    },
    onLoad:function(){
        navSide.init({name:'user-center'});
        this.loadUserInfo();
    },
    loadUserInfo:function(){
        var userHtml='';
        _user.getUserInfo(function(res){
            userHtml =_YG.renderHtml(templateIndex,res);
        },function(errMsg){
            _YG.errorMsg(errMsg)
        });
   },
};
$(function(){
    page.init()
})