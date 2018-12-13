var canvas= document.getElementById('canvas');
var context = canvas.getContext('2d');
var eraserEnable=false
var lineWidth=4
var points=[]
var beginPoint=null
//初始化画笔
context.fillStyle='blue'
context.strokeStyle='blue'
context.lineJoin = 'round';
context.lineCap = 'round';
autoSetCanvasSize(canvas)
listenToUser(canvas)
setTimeout(() => {
  var tools=document.querySelector('.tools')
  tools.classList.remove('show')
}, 3000);



function listenToUser(canvas){
  var using=false
  var lastPoint={x:undefined,y:undefined}
  //特性检测
  if(document.body.ontouchstart!==undefined){
    //在触屏设备上使用
    canvas.ontouchstart=function(pos){
      using=true
      var x=pos.clientX
      var y=pos.clientY    
      points.push[{x,y}]
      if(eraserEnable){
        context.clearRect(x-10,y-10,20,20)
      }else{
        beginPoint ={x:x,y:y}
        drawCircle(x,y,(lineWidth/2))
      }
    }
      canvas.ontouchmove=function(pos){
        var x=pos.clientX
        var y=pos.clientY
        points.push({x,y})
        if(!using){return}
        if(eraserEnable){
            context.clearRect(x-10,y-10,20,20)
        }else{
            if (points.length > 3) {
              const lastTwoPoints = points.slice(-2);
              const controlPoint = lastTwoPoints[0];
              const endPoint = {
                  x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
                  y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
              }
              drawLine(beginPoint, controlPoint, endPoint);
              beginPoint = endPoint;
          }
        }
      }
    canvas.ontouchend=function(){
      using=false
    }
  }else{
//在PC上使用的程序

      canvas.onmousedown=function(pos){
        using=true
        var x=pos.clientX
        var y=pos.clientY
        
        points.push[{x,y}]
        if(eraserEnable){
          context.clearRect(x-10,y-10,20,20)
        }else{
          beginPoint ={x:x,y:y}
          drawCircle(x,y,(lineWidth/2))
        }
      }
      
      canvas.onmousemove=function(pos){
        var x=pos.clientX
        var y=pos.clientY
        points.push({x,y})
        if(!using){return}
        if(eraserEnable){
            context.clearRect(x-10,y-10,20,20)
        }else{
            if (points.length > 3) {
              const lastTwoPoints = points.slice(-2);
              const controlPoint = lastTwoPoints[0];
              const endPoint = {
                  x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
                  y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
              }
              drawLine(beginPoint, controlPoint, endPoint);
              beginPoint = endPoint;
          }
        }
      }
      canvas.onmouseup=function(pos){
        using=false
      }
    }

  }

/*****************/
  
function drawCircle(x,y,radius){
  context.beginPath()
  context.arc(x,y,radius,0,Math.PI*2)
  context.fill()
}

function drawLine(beginPoint, controlPoint, endPoint) {
  context.beginPath();
  context.moveTo(beginPoint.x, beginPoint.y);
  context.lineWidth=lineWidth
  context.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
  context.stroke();
  context.closePath();
}

function autoSetCanvasSize(canvas){
    setCanvasSize()
    window.onresize=function(){
    setCanvasSize()
  }
  function setCanvasSize(){
    var pageWidth=document.documentElement.clientWidth
    var pageHeight=document.documentElement.clientHeight
    canvas.width=pageWidth
    canvas.height=pageHeight
    context.fillStyle='white'
    context.fillRect(0,0,pageWidth,pageHeight)
  }
}
pen.onclick=function(){
  console.log(2)
  eraserEnable=false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick=function(){
  eraserEnable=true
  eraser.classList.add('active')
  pen.classList.remove('active')
}


var currentColor=document.getElementById('currentColor')
var colors=['color1','color2','color3','color4','color5','color6']


color1.onclick=function(){
  color1.classList.add('active')
  color2.classList.remove('active')
  color3.classList.remove('active')
  color4.classList.remove('active')
  color5.classList.remove('active')
  color6.classList.remove('active')
  colors.map(function(color){
    if(color!=='color1'){
      currentColor.classList.remove(color)
    } 
  })
  currentColor.classList.add('color1')
  context.fillStyle='black';
  context.strokeStyle='black';
}
color2.onclick=function(){
  color2.classList.add('active')
  color1.classList.remove('active')
  color3.classList.remove('active')
  color4.classList.remove('active')
  color5.classList.remove('active')
  color6.classList.remove('active')
  colors.map(function(color){
    if(color!=='color2'){
      currentColor.classList.remove(color)
    } 
  })
  currentColor.classList.add('color2')
  context.fillStyle='blue';
  context.strokeStyle='blue';
}
color3.onclick=function(){
  color3.classList.add('active')
  color2.classList.remove('active')
  color1.classList.remove('active')
  color4.classList.remove('active')
  color5.classList.remove('active')
  color6.classList.remove('active')
  colors.map(function(color){
    if(color!=='color3'){
      currentColor.classList.remove(color)
    } 
  })
  currentColor.classList.add('color3')
  context.fillStyle='red';
  context.strokeStyle='red';
}
color4.onclick=function(){
  color4.classList.add('active')
  color2.classList.remove('active')
  color3.classList.remove('active')
  color1.classList.remove('active')
  color5.classList.remove('active')
  color6.classList.remove('active')
  colors.map(function(color){
    if(color!=='color4'){
      currentColor.classList.remove(color)
    } 
  })
  currentColor.classList.add('color4')
  context.fillStyle='#549B77';
  context.strokeStyle='#549B77';
}
color5.onclick=function(){
  color5.classList.add('active')
  color2.classList.remove('active')
  color3.classList.remove('active')
  color4.classList.remove('active')
  color1.classList.remove('active')
  color6.classList.remove('active')
  colors.map(function(color){
    if(color!=='color5'){
      currentColor.classList.remove(color)
    } 
  })
  currentColor.classList.add('color5')
  context.fillStyle='#FEAA39';
  context.strokeStyle='#FEAA39';
}
color6.onclick=function(){
  color6.classList.add('active')
  color2.classList.remove('active')
  color3.classList.remove('active')
  color4.classList.remove('active')
  color5.classList.remove('active')
  color1.classList.remove('active')
  colors.map(function(color){
    if(color!=='color6'){
      currentColor.classList.remove(color)
    } 
  })
  currentColor.classList.add('color6')

  context.fillStyle='#CD2256';
  context.strokeStyle='#CD2256';
}










/**
 *
 * red.onclick=function(){
  red.classList.add('active')
  blue.classList.remove('active')
  green.classList.remove('active')

  context.fillStyle='red';
  context.strokeStyle='red';
}
blue.onclick=function(){
  blue.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  context.fillStyle='blue';
  context.strokeStyle='blue';
}
green.onclick=function(){
  green.classList.add('active')
  blue.classList.remove('active')
  red.classList.remove('active')
  context.fillStyle='green';
  context.strokeStyle='green';
} 
 * 
 */

thin.onclick=function(){
  lineWidth=2
  thin.classList.add('active')
  middle.classList.remove('active')
  thick.classList.remove('active')
}
middle.onclick=function(){
  lineWidth=4
  middle.classList.add('active')
  thin.classList.remove('active')
  thick.classList.remove('active')
}
thick.onclick=function(){
  lineWidth=8
  thick.classList.add('active')
  middle.classList.remove('active')
  thin.classList.remove('active')
}
clear.onclick=function(){
  context.clearRect(0,0,canvas.width,canvas.height)
}
download.onclick=function(){
  var url=canvas.toDataURL("image/png")
  var a=document.createElement('a')
  a.href=url
  a.download='myPainting'
  a.target ='_blank'
  a.click()
}