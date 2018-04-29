'use strict';
var Hogan=require('hogan')
var conf={
    serverHost:''
}
var _YG = {
    request : function(param){
        var _this=this
        $.ajax({
            type : param.method  || 'get',
            url  : param.url     ||  '',
            dataType: param.type || 'json',
            data:param.data      || '',
            success:function(res){
                if(
                    //0为登录成功
                    0 === res.status){
                    typeof param.success ==="function" && param.success(res.data,res.msg)
                }else if(
                    //无登录信息
                    10 === res.status){
                        _this.doLogin();
                    }else if(
                        //登录错误
                        1 === res.status
                    ){
                        typeof param.error ==="function" && param.error(res.msg)  
                    }
            },
            error : function(err){
                typeof param.error ==="function" && param.error(err.statusText);
            }
        })
    },
    //登录操作
    doLogin : function(){
        window.location.href = './login.html?redirect='+encodeURIComponent(window.location.href);
    
    },
    //获取地址
    getServerUrl :function(path){
        return conf.serverHost + path
    },
    //获取url
    getUrlParam : function(name){
        var reg= new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        var result= window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null
    },
    //使用hogan渲染
    renderHtml:function(htmlTemplate,data){
        var template = Hogan.compile(htmlTemplate);
        var result=template.render(data)
        return result
    },
    //成功提示
    successMsg:function(Msg){
        alert(Msg||"操作成功！")
    },
    //错误提示
    errorMsg:function(Msg){
        alert(Msg||"操作失败，请重试！")
    },
    //验证方法(null,mobilphone,email,space)
    validate:function(value,type){
        //space
        var value=$.trim(value);
        if('require' === type){
            return !!value;
        };
        //mp
        if('phone' === type){
            return /^1{10}$/.test(value);
        };
        //email
        if('email'===type){
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        };
    },
    //return homepage
    goHome:function(){
        window.location.href='./index.html'
    },
}
module.exports = _YG