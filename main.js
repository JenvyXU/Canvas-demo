var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var eraserEnable=false

autoSetCanvasSize(yyy)
listenToUser(yyy)

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
          drawCircle(x,y,1)
        }
    }
      canvas.ontouchmove=function(aaa){
        var x=aaa.touches[0].clientX
        var y=aaa.touches[0].clientY

        var newPoint={x:x, y:y}
        if(!using){return}     
        if(eraserEnable){
            context.clearRect(x-5,y-5,10,10)   
            console.log(x,y)    
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
        console.log('在PC上使用的程序')
        using=true
        var x=aaa.clientX
        var y=aaa.clientY
        if(eraserEnable){
          context.clearRect(x-10,y-10,20,20)
        }else{
          lastPoint={x:x,y:y}
          drawCircle(x,y,1)
        }
      }
      
      canvas.onmousemove=function(aaa){
        var x=aaa.clientX
        var y=aaa.clientY
        var newPoint={x:x, y:y}
        if(!using){return}
        
        if(eraserEnable){
            context.clearRect(x-5,y-5,10,10)
        
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
  context.fillStyle='black'
  context.arc(x,y,radius,0,Math.PI*2)
  context.fill()
}
function drawLine(x1,y1,x2,y2){
  context.beginPath()
  context.strokeStyle='black'
  context.moveTo(x1,y1)//起点
  context.lineWidth=5
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
  }
}

eraser.onclick=function(){
  eraserEnable=true
  actions.className='actions x'
}
brush.onclick=function(){
  eraserEnable=false
  actions.className='actions'
}
