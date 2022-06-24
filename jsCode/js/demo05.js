//当鼠标悬浮时,显示背景颜色
function showBGColor() {
    //event：当前发生的事件
    //event.srcElement:事件源
    //alert(event.srcElement.tagName);  -->TD
    if (event && event.srcElement && event.srcElement.tagName=="TD"){
        var td = event.srcElement;
        //td.parentElement; 表示获取td的父元素 ->TR
        var tr = td.parentElement;
        //如果想要通过js代码设置某节点的样式, 则需要加上 .style
        tr.style.backgroundColor = "red";
    }
}
//当鼠标离开时,恢复背景颜色
function clearBGColor() {
    if (event && event.srcElement && event.srcElement.tagName=="TD"){
        var td = event.srcElement;
        var tr = td.parentElement;
        tr.style.backgroundColor = "bisque";
    }
}
//当鼠标悬浮时,鼠标变为手指样式
function showHand() {
    if (event && event.srcElement && event.srcElement.tagName=="TD"){
        var td = event.srcElement;
        //cursor
        td.style.cursor = "hand";

    }
}