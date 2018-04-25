require('./index.css');
var _YG= require('util/YG.js');
//通用头部
var header ={
    init :function(){
        this.onLord();
        this.bindEvent();
    },
    onLord:function(){
        var keyword = _YG.getUrlParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    bindEvent:function(){
        var _this=this
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //回车实现按钮
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    //submit
    searchSubmit:function(){
        //去空格
        var keyword =$.trim($('#search-input').val());
        if(keyword){
            //有keyword则生产url并打开
            window.location.href='./list.html?keyword='+keyword;

        }else{
            //没有就打开主页
            _YG.goHome();
        }
    }
};
header.init();