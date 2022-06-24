window.onload=function (){

    updateZJ();
    //当前页面加载完成，我们需要绑定各种事件
    //根据id获取到表格
    var fruitTbl = document.getElementById("tbl_list");
    //获取表格中的所有行
    var rows = fruitTbl.rows;

    for (var i = 1;i < rows.length-1;i++){
        var tr = rows[i];
        //1.绑定鼠标悬浮以及离开时设置背景颜色事件
        tr.onmouseover=showBGColor;
        tr.onmouseout=clearBGColor;
        //获取tr这一行的所有单元格
        var cells = tr.cells;
        var priceTD = cells[1];
        //2.绑定鼠标悬浮在单价单元格变手势的事件
        priceTD.onmouseover = showHand;
        //3.绑定鼠标点击单价单元格的事件
        priceTD.onclick = editPrice;
    }
}
//当鼠标点击单价单元格时进行价格编辑
function editPrice() {
    if (event && event.srcElement && event.srcElement.tagName=="TD"){
        var priceTD = event.srcElement;
        //priceTD.firstChild.nodeType == 3表示为文本节点
        if (priceTD.firstChild && priceTD.firstChild.nodeType==3){
            //innerText表示设置或者获取当前节点的内部文本
            var oldPrice = priceTD.innerText;
            //innerHTML表示设置当前节点的内部HTML
            priceTD.innerHTML="<input type='text' size='1'/>";
            var input = priceTD.firstChild;
            if (input.tagName=="INPUT") input.value = oldPrice;
            //选中输入框内部的文本(自动选中)
            input.select();
            //4.绑定输入框失去焦点事件，更新单价
            input.onblur = updatePrice;
        }
    }
}
//更新单价
function updatePrice() {
    if (event && event.srcElement && event.srcElement.tagName=="INPUT"){
        var input = event.srcElement;
        var newPrice = input.value;

        var priceTD = input.parentElement;
        priceTD.innerText = newPrice;

        //执行完updatePrice()方法后，由于单价变化，则该行对应的小计也应该变化
        //更新当前行小计单元格的值
        updateXJ(priceTD.parentElement);
    }
}
//更新指定行的小计
function updateXJ(tr) {
    if (tr && tr.tagName=="TR"){
        var tds = tr.cells;
        //innerText获取到的值是字符串类型,需要进行类型转换
        tds[3].innerText = parseInt(tds[1].innerText)*parseInt(tds[2].innerText);
    }
    //更新总计
    updateZJ();
}
//更新当前表格的总计
function updateZJ() {
    //根据id获取到表格
    var fruitTbl = document.getElementById("tbl_list");
    //获取表格中的所有行
    var rows = fruitTbl.rows;
    var sum = 0;
    for (var i = 1; i < rows.length - 1; i++) {
        var tr = rows[i];
        //获取tr这一行的所有单元格
        // var cells = tr.cells;
        // var XJ = parseInt(cells[3].innerText);
        var XJ = parseInt(tr.cells[3].innerText);
        sum = sum + XJ;
    }
    // var res = rows[rows.length-1].cells;
    // res[1].innerText = sum;
    rows[rows.length-1].cells[1].innerText = sum;
}
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