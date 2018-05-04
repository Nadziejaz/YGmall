require('./login.css');
require('page/common/nav-s/index.js');
var _YG = require('util/YG.js');
var _user = require('service/user-service.js');

var formError ={
    show:function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide:function(errMsg){
        $('.error-item').hide().find('.err-msg').text('');
    },
};
//实现业务
var page={
    init:function(){
        this.bindEvent()
    },
    bindEvent:function(){
        var _this=this;
        //btn
        $('#submit').click(function(){
            _this.submit();
        });
        //enter
        $('.user-content').keyup(function(e){
            if(e.keycode === 13){
                _this.submit();
            }
        });
    },
    submit:function(){
        var formData ={
            usernme: $.trim($("#username").val()),
            password: $.trim($("#password").val()),
            },
             //处理验证返回
            validateResult = this.formValidate(formData);
             if(validateResult.status){
                 _user.login(formData,
                    function(res){
                     window.location.href=_YG.getUrlParam('redirect') ||"./index.html"},
                    function(errMsg){
                        formError.show(errMsg);
                    });
             }else{
                    formError.show(validateResult.msg);
             }
    },
    //表单验证
    formValidate:function(formData){
        var result = {
            status : false,
            msg:'',
        };
        //判断是否为空
        if(!_YG.validate(formData.usernme,'require')){
            result.msg='用户名不能为空！';
            return result;
        };
        if(!_YG.validate(formData.password,'require')){
            result.msg='密码不能为空！';
            return result;
        };
        //验证通过
        result.status ="true";
        result.msg='好像没什么问题啦。';
        return result;


    },
};
$(function(){
    page.init()
})