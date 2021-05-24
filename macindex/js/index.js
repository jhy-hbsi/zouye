
var box = document.getElementById('box'); //舞台
var imgBox=box.getElementsByClassName('img-box')[0];  //内容区域
var dotBox=box.getElementsByClassName('dots')[0];   //按钮区域
var dots=dotBox.getElementsByTagName('li'); //所有按钮
var dotNum=dots.length;//按钮数量and图片数量
var arrowBox=box.getElementsByClassName('arrows')[0];   //箭头
var arrows = arrowBox.getElementsByTagName('a');//所有箭头
var arrowLeft=arrows[0]; //左箭头
var arrowRight = arrows[1];  //右箭头
var imgWidth=590;   //图片宽度
var index=0;
var t=null;//定时器全局变量
var speed = 1;//自动切换图片的时间间隔，以秒为单位

function showImg(n){//n指定 为第几个图，n从0开始
    //每个图片的宽度是590W
    //显示第一个图，n=0，left=0
    //显示第二个图，n=1，left=-590
    //显示第二个图，n=2，left=-1180
    //显示第三个图，n=3，left=-1770
    imgBox.style.left=-imgWidth*n+'px';
}
function showBtn(m,n){//给指定的按钮添加特殊样式，n指定第几个按钮，n从0开始
    // for(var i=0;i<dotNum;i++){  //全清
    //     dots[i].className='';
    // }
    // dots[n].className='active'; //单设
    dots[m].removeAttribute('class');
    dots[n].className='active';
}
//设置完之后可以更改变得样式 但是得执行一次这行代码
for(var i=0;i<dotNum;i++){
    dots[i].idx=i; //当前索引
    dots[i].onmouseover=function(){
        var oldIndex=index;
        index=this.idx;//当前索引赋值给index
        showImg(index);
        showBtn(oldIndex,index);
    }
}
arrowLeft.onclick=function(){   //给左箭头绑定事件
                                //会切换到上个图片
                                //图片对应的按钮有特殊样式，其他按钮样式正常
    var oldIndex=index;
    index--;//索引值--
    if(index<0){
        index=dotNum-1;
    }
    showImg(index);
    showBtn(oldIndex,index);
}
arrowRight.onclick=function(){  //给右箭头绑定事件
    //会切换到下个图片
    //图片对应的按钮有特殊样式，其他按钮样式正常
    var oldIndex=index;
    index++;
    if(index>dotNum-1){
        index=0;
    }
    showImg(index);
    showBtn(oldIndex,index);
}
box.onmouseover=function(){ //鼠标滑过整体盒子的事件处理
    //停止自动切换图片、清楚设置的定时器
    clearInterval(t);
}
box.onmouseout=function(){  //鼠标离开整体盒子的事件处理
    //开始自动切换图片，设置定时器，每个指定时间，自动切换到下一个图 / 自动点击一次右箭头
    t=setInterval(function(){
        arrowRight.onclick();
    },speed*1000);
}
box.onmouseout();