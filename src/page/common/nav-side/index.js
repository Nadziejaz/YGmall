//通用引用
require('./index.css');
var _YG= require('util/YG.js');
var templateIndex= require('./index.string');
//编写渲染模块
var navSide={
    option:{
        name: '',
        navList:[
           {name:'user-center',desc:'个人中心',href:'./user-center.html'}, 
           {name:'order-list',desc:'我的订单',href:'./order-list.html'}, 
           {name:'user-newpsw',desc:'修改密码',href:'./user-newpsw.html'}, 
           {name:'about',desc:'关于YGmall',href:'./about.html'}, 
        ]
    },
    init : function(option){
        // 合并选项
        $.extend(this.option, option);
        this.renderNav();
    },
    //渲染nav
    renderNav:function(){
        //ilength做缓存
        for(var i=0,iLength=this.option.navList.length;i<iLength;i++){
            if(this.option.navList[i].name===this.option.name){
                this.option.navList[i].isActive=true;//===也可==，但是=不行 =为赋值操作符号
            }
        };
        var navHtml=_YG.renderHtml(templateIndex,{
            navList:this.option.navList
        });
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;