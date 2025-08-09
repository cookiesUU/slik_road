let rectButtons=[];
let scene4Bg=new Image();
let currentIndex=-1;
let lastIndex=-1;
let buttonWidthScale=0.04;
let lastButtonWidthScale=0.16;

//抽屉动画
function scene4Animate(){
    
        buttonWidthScale+=0.01;
        lastButtonWidthScale-=0.01;
       
    
    bakContext.clearRect(0,0,bakCanvas.width,bakCanvas.height);
    bakContext.drawImage(scene4Bg,0,0,bakCanvas.width,bakCanvas.height);
    rectButtons.forEach((rect,index)=>{
        if(index===currentIndex){
            rect.w=bakCanvas.width*buttonWidthScale;
            rect.paint(bakContext,rectButton[index].color,true,0,true,15,true,{color:'rgba(0, 0, 0, 0.5)',offsetX:5,offsetY:5,blur:10});
            rectButtonText[index].fontSize=36;
            rect.setText(bakContext,rectButtonText[index]);
        }
        else if(index===lastIndex){
            rect.w=bakCanvas.width*lastButtonWidthScale;
            rect.paint(bakContext,rectButton[index].color,true,0,true,15,true,{color:'rgba(0, 0, 0, 0.5)',offsetX:5,offsetY:5,blur:10});
            if(lastButtonWidthScale<=0.04){
                rectButtonText[index].fontSize=30; 
                rect.setVerticalText(bakContext,rectButtonText[index]);  
            }
            else{
                rectButtonText[index].fontSize=36;
                rect.setText(bakContext,rectButtonText[index]);
            }

        }
        else{
            rect.w=bakCanvas.width*0.04;
            rectButtonText[index].fontSize=30;
            rect.paint(bakContext,rectButton[index].color,true,0,true,15,true,{color:'rgba(0, 0, 0, 0.5)',offsetX:5,offsetY:5,blur:10});
            rect.setVerticalText(bakContext,rectButtonText[index]);
        }
    });
    if(buttonWidthScale>=0.16){
        buttonWidthScale=0.04;
        lastButtonWidthScale=0.16;
        lastIndex=currentIndex;
        cancelAnimationFrame(id);   
        scene5Init(currentIndex);
    }
    else{
        id=requestAnimationFrame(scene4Animate);
    }
}
function OnBakCanvasClick(e){
    let point=convertWindowToCanvas(bakCanvas,{x:e.clientX,y:e.clientY});
    rectButtons.forEach((rect,index)=>{
        if(rect.isClicked(point.x,point.y)){
            currentIndex=index;
        }
    });
    if(currentIndex!=-1){       
            id=requestAnimationFrame(scene4Animate);
            
    }
}
function onScene4BgLoaded(){
    bakContext.drawImage(scene4Bg,0,0,bakCanvas.width,bakCanvas.height);
    for(let i=0;i<4;i++){
        rectButtons.push(new Rect(rectButton[i].left,rectButton[i].top,bakCanvas.width*0.04,bakCanvas.height*0.18));
        rectButtons[i].paint(bakContext,rectButton[i].color,true,0,true,15,true,{color:'rgba(0, 0, 0, 0.5)',offsetX:5,offsetY:5,blur:10});
        rectButtons[i].setVerticalText(bakContext,rectButtonText[i]);  
    }
    bakCanvas.onclick=OnBakCanvasClick;
}
function scene4Init(){
    console.log('scene4');
    scene4Bg.src=IMAGE_URL['scene4_bg'];
    scene4Bg.onload=onScene4BgLoaded;
}
scene4Init();