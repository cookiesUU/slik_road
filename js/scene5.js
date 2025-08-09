let totalResources=4;//资源总数
let resourcesLoaded=0;
let isLoaded=false;
let canvasIndex;
let canvasesBg=[new Image(),new Image(),new Image(),new Image()];
function scene5Loaded(){
    isLoaded=true;
    blockCanvas();
}
function blockCanvas(){
    //console.log('blockCanvas'+canvasIndex);
    contexts[canvasIndex].drawImage(canvasesBg[canvasIndex],0,0,canvases[canvasIndex].width,canvases[canvasIndex].height);
    //调整画布是否可见
    canvases.forEach((canvas,index)=>{
        if(index!==canvasIndex){
            canvas.style.display='none';
        }
        else{
            canvas.style.display='block';
        }
    });
    id=requestAnimationFrame(scene5Animate);
}
function scene5Animate(){
  
            scene5Part1Init();
            scene5Part2Init();
            scene5Part3Init();
            scene5Part4Init();
    
}

function scene5Init(currentindex){
    canvasIndex=currentindex;
    
    //资源加载完毕，开始绘制    
    if(isLoaded){      
            blockCanvas();  
    }
    else{
//加载资源
    canvasesBg.forEach((canvasBg,index)=>{    
            canvasBg.src=IMAGE_URL['canvas'+index+'_bg'];
            canvasBg.onload=judgeResourceLoad(scene5Loaded);
    });}



    
}