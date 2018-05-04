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
    data:{
        username:'',
        question:'',
        answer:'',
        token:'',
    },
    init:function(){
        this.bindEvent();
        this.onLoad();
    },
    onLoad:function(){
        this.loadUsername();

    },
    bindEvent:function(){
        var _this=this;
        //btn
        $('#user-submit').click(function(){
            var username = $.trim($('#username').val());
            if(username){
                _user.getQuestion(username,
                    function(res){
                        _this.data.username=username;
                        _this.data.question=res;
                        _this.loadQA
                    },
                    function(errMsg){
                        formError.show(errMsg);
                    })
            }else{
                formError.show('请输入用户名！')
            }
        });
        $('#answer-submit').click(function(){
            var answer = $.trim($('#answer').val());
            if(answer){
                _user.checkAnswer({
                    username:_this.data.username,
                    question:_this.data.question,
                    answer:answer,
                },
                    function(res){
                        _this.data.answer=answer;
                        _this.data.token=res;
                        _this.loadpassword();
                    },
                    function(errMsg){
                        formError.show(errMsg);
                    })
            }else{
                formError.show('请输入密码提示问题答案！')
            }
        });
        $('#password-submit').click(function(){
            var password = $.trim($('#password').val());
            if(password && password.length >=6){
                _user.resetPassword({
                    username:_this.data.username,
                    passwordNew:password,
                    forgetToken:_this.data.token,
                },
                    function(res){
                       window.location.href='./result.html'
                    },
                    function(errMsg){
                        formError.show(errMsg);
                    })
            }else{
                formError.show('请输入不少于6位的新密码！')
            }
        });
        //enter
        $('.user-content').keyup(function(e){
            if(e.keycode === 13){
                _this.submit();
            }
        });
    },
    loadUsername:function(){
        $('.step-username').show();
    },
    loadQA:function(){
        formError.hide();
        $('.step-username').hide() //隐藏第一步
         .siblings('.step-QA').show() //显示第二部
         .find('.question').text(this.data.question) //显示问题
    },
    loadpassword:function(){
        formError.hide();
        $('.step-QA').hide() //隐藏第2步
         .siblings('.step-fixpsw').show() //显示第3部
    },
};
$(function(){
    page.init()
})