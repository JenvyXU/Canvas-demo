var canvas= document.getElementById('canvas');
var context = canvas.getContext('2d');
var eraserEnable=false
var lineWidth=4
autoSetCanvasSize(canvas)
listenToUser(canvas)
context.fillStyle='blue'
context.strokeStyle='blue'

function listenToUser(canvas){
  var using=false
  var lastPoint={x:undefined,y:undefined}
  //特性检测
  if(document.body.ontouchstart!==undefined){
    //在触屏设备上使用
    
    canvas.ontouchstart=function(aaa){
      using=true
        var x=aaa.touches[0].clientX
        var y=aaa.touches[0].clientY
        if(eraserEnable){
          context.clearRect(x-10,y-10,20,20)
        }else{
          lastPoint={x:x,y:y}
          drawCircle(x,y,(lineWidth/2))
        }
    }
      canvas.ontouchmove=function(aaa){
        var x=aaa.touches[0].clientX
        var y=aaa.touches[0].clientY

        var newPoint={x:x, y:y}
        if(!using){return}     
        if(eraserEnable){
            context.clearRect(x-10,y-10,20,20)   
        }else{

            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
            lastPoint=newPoint
        }
      }
    canvas.ontouchend=function(){
      using=false
    }
  }else{
//在PC上使用的程序

      canvas.onmousedown=function(aaa){
        using=true
        var x=aaa.clientX
        var y=aaa.clientY
        if(eraserEnable){
          context.clearRect(x-10,y-10,20,20)
        }else{
          lastPoint={x:x,y:y}
          drawCircle(x,y,(lineWidth/2))
        }
      }
      
      canvas.onmousemove=function(aaa){
        var x=aaa.clientX
        var y=aaa.clientY
        var newPoint={x:x, y:y}
        if(!using){return}
        
        if(eraserEnable){
            context.clearRect(x-10,y-10,20,20)
        
        }else{

            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
            lastPoint=newPoint

        }
      }
      canvas.onmouseup=function(aaa){
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
function drawLine(x1,y1,x2,y2){
  context.beginPath()
  context.moveTo(x1,y1)//起点
  context.lineWidth=lineWidth
  context.lineTo(x2,y2)//终点
  context.stroke()
  context.closePath()
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

eraser.onclick=function(){
  eraserEnable=true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
pen.onclick=function(){
  eraserEnable=false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
red.onclick=function(){
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