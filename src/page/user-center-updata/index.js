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
        this.bindEvent();
    },
    onLoad:function(){
        navSide.init({name:'user-center'});
        this.loadUserInfo();
    },
    bindEvent:function(){
        var _this=this
        $(document).on('click','btn-submit',function(){
            var userInfo={
               phone:$.trim($('#phone').val()),
               phone:$.trim($('#email').val()),
               phone:$.trim($('#question').val()),
               phone:$.trim($('#answer').val()),
            },
            validateRusult=_this.formValidate(userInfo);
            if(validateRusult.status){
                _user.updateUserInfo(userInfo,function(res,msg){
                    _YG.successMsg(msg);
                    window.location.href="./user-center.html"
                },function(errMsg){
                    _YG.errorMsg(validateRusult.msg)
                })
            }
        })
    },
    loadUserInfo:function(){
        var userHtml='';
        _user.getUserInfo(function(res){
            userHtml =_YG.renderHtml(templateIndex,res);
        },function(errMsg){
            _YG.errorMsg(errMsg)
        });
   },
   formValidate:function(formData){
    var result = {
        status : false,
        msg:'',
    };
    //判断是否为空
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