require('./index.css');
require('page/common/nav-s/index.js');
var _YG = require('util/YG.js');
$(function(){
    var type = _YG.getUrlParam('type') ||'default',
    x=$('.'+type+'-success');
    x.show();
})