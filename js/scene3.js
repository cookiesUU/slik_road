let city;
let scene3Bg=new Image();
let camelSpriteSheet=new Image(); 
let camelSprite;
let lastTimeCamel = 0;
let intervalCamel = 1000 / 24;
let progress = 0; // 加载进度
let progressBarWidth = 400; 
let progressBarHeight = 40; 
let progressBarX = canvas.width / 2 - progressBarWidth / 2; 
let progressBarY = canvas.height / 2 + 100; 

function onCamelImgLoad() {
    
    camelSprite = new Sprite('camel', new SpriteSheetPainter(camelCells, camelSpriteSheet), [runCamel, moveToRight]);
    
    camelSprite.width=camelCells[0].width/5;
    camelSprite.height=camelCells[0].height/5;
    camelSprite.left = progressBarX;
    camelSprite.top = progressBarY-camelSprite.height;
    camelSprite.visible = true;
    
    id=requestAnimationFrame(animateCamel); // 开始动画
  }
  // 绘制进度条
function drawProgressBar(context) {
    let progressBar = new Rect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);
    progressBar.paint(context, '#c26E3', 0);
    let progressBarFill = new Rect(progressBarX, progressBarY, progressBarWidth * progress, progressBarHeight);
    progressBarFill.paint(context, '#f19c4c', true, 0);
    progressBar.setText(context,{text:'loading'+Math.floor(progress*100)+'%',color:'#552e0f',fontSize:24,font:'Arial'})
}
  
  function animateCamel() {
    let now = +new Date();
    if(progress<=1){
    if(now-lastTimeCamel>intervalCamel){
        context.clearRect(0,0,canvas.width,canvas.height);
        context.drawImage(scene3Bg, 0, 0, canvas.width, canvas.height);
        camelSprite.update(context, now);  
        camelSprite.paint(context);  
        const moveDistance = moveToRight.V ;
        const progressIncrement = moveDistance / progressBarWidth; 
        if (progress < 1) {
            progress += progressIncrement; 
          }
        drawProgressBar(context);
        drawAudioControl(context)
        lastTimeCamel=now;
    } 
    id = requestAnimationFrame(animateCamel); 
  }
  else{
    cancelAnimationFrame(id);
    setTimeout(function(){
      context.clearRect(0,0,canvas.width,canvas.height);
      bgm.pause();  
        audio_control.isBgmPlay = 0
      window.location.href = `${city}.html`; 
    },500)
    

  }
  }
function scene3Init(cityIndex){
    city=cityIndex;
    camelSpriteSheet.src=IMAGE_URL['scene3_sprite_sheet'];
    scene3Bg.src=IMAGE_URL['scene3_bg'];
    resourcesLoaded = 0;
    totalResources = 2; // 需要加载的资源总数
    camelSpriteSheet.onload = judgeResourceLoad(onCamelImgLoad);
    scene3Bg.onload = judgeResourceLoad(onCamelImgLoad);

}
