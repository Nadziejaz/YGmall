require('./index.css');
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
        //实时username
        $('#username').blur(function(){
            var username= $.trim($(this).val());
            _user.checkUsername(username,
                function(res){formError.hide()},
                function(errMsg){formError.show()})
        });
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
            password_re: $.trim($("#password_re").val()),
            phone: $.trim($("#phone").val()),
            email: $.trim($("#email").val()),
            Q: $.trim($("#Q").val()),
            A: $.trim($("#A").val()),
            },
             //处理验证返回
            validateResult = this.formValidate(formData);
             if(validateResult.status){
                 _user.register(formData,
                    function(res){
                     window.location.href='./result.html?type=reg'},
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
        if(formData.password.length<6){
            result.msg='密码不能少于6位！';
            return result;
        };
        if(formData.password !== formData.password_re){
            result.msg='两次密码不同！';
            return result;
        };
        if(!_YG.validate(formData.phone,'require')){
            result.msg='手机号格式错误！';
            return result;
        };
        if(!_YG.validate(formData.email,'require')){
            result.msg='电子邮箱格式错误！';
            return result;
        };
        if(!_YG.validate(formData.Q,'require')){
            result.msg='密码提示问题不能为空！';
            return result;
        };
        if(!_YG.validate(formData.A,'require')){
            result.msg='密码提示问题答案不能为空！';
            return result;
        };
        
        

        //验证通过
        result.status =true;
        result.msg='好像没什么问题啦。';
        return result;


    },
};
$(function(){
    page.init()
})