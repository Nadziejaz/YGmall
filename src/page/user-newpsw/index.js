require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var navSide = require('page/common/nav-side/index.js');
var _YG = require('util/YG.js');
var _user = require('service/user-service.js');
var templateIndex ='#';
var page={
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        navSide.init({name:'user-newpsw'});
    },
    bindEvent:function(){
        var _this=this
        $(document).on('click','btn-submit',function(){
            var userInfo={
               password:$.trim($('#password').val()),
               passwordNew:$.trim($('#password-new').val()),
               passwordConfirm:$.trim($('#password-re').val()),
            },
            validateRusult=_this.formValidate(userInfo);
            if(validateRusult.status){
                _user.updateUserInfo({
                    passwordOld:userInfo.password,
                    passwordNew:userInfo.passwordNew
                },function(res,msg){
                    _YG.successMsg(msg);
                },function(errMsg){
                    _YG.errorMsg(validateRusult.msg)
                })
            }
        })
    },
   formValidate:function(formData){
    var result = {
        status : false,
        msg:'',
    };
    //判断是否为空
    if(!_YG.validate(formData.password,'require')){
        result.msg='原密码不能为空！';
        return result;
    };
    if(!_YG.validate(!formData.passwordNew || formData.passwordConfirm.length<6)){
        result.msg='新密码不能少于六位！';
        return result;
    };
    if(formData.passwordNew!==formData.passwordConfirm){
        result.msg='两次密码不等！';
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