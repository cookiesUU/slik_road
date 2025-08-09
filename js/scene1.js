let scene1Sprites=[];
let scene1SpriteSheet=new Image();
let scene1Background=new Image();
let bgmControl=[new Image(),new Image()];
let bgm=new Audio();
let scene1Text=new Sprite(scene1_text.text,TextPainter,[new TextTypingBehavior(1000/4),fadeIn]);
scene1Text.left=scene1_text.x;
scene1Text.top=scene1_text.y;
scene1Text.style=scene1_text;


function onSheetLoad(){
    scene1Sprites.push(new Sprite('sprite1', new SpriteSheetPainter([scene1Cells[0]], scene1SpriteSheet)));
    scene1Sprites.push(new Sprite('sprite2', new SpriteSheetPainter([scene1Cells[1]], scene1SpriteSheet), [new ShakingBehavior(1,canvas.width/2,canvas.height/1.43)]));
    scene1Sprites.push(new Sprite('sprite3', new SpriteSheetPainter([scene1Cells[2]], scene1SpriteSheet), [new ShakingBehavior(-1,canvas.width/2,canvas.height/1.17)]));
    scene1Sprites.push(new Sprite('sprite4', new SpriteSheetPainter([scene1Cells[3]], scene1SpriteSheet), [fadeIn]));
    scene1Sprites.push(new Sprite('sprite5', new SpriteSheetPainter([scene1Cells[4]], scene1SpriteSheet)));
    //设置精灵尺寸
    scene1Sprites.forEach((sprite, index) => {
        sprite.height = scene1Cells[index].height/START_RAWPICTURE_HEIGHT*canvas.height;
        sprite.width = scene1Cells[index].width/START_RAWPICTURE_HEIGHT*canvas.height;
        
    });
    //设置精灵位置
    scene1Sprites[0].left=0;
    scene1Sprites[0].top=0;
    scene1Sprites[1].height*=1.13;
    scene1Sprites[1].left=0;
    scene1Sprites[1].top=scene1Sprites[0].height;
    scene1Sprites[2].height*=1.13;
    scene1Sprites[2].left=0;
    scene1Sprites[2].top=scene1Sprites[0].height+scene1Sprites[1].height;
    scene1Sprites[3].left=147;
    scene1Sprites[3].top=282;
    scene1Sprites[4].width=scene1Cells[4].width/2.5;
    scene1Sprites[4].height=scene1Cells[4].height/2.5;
    scene1Sprites[4].left=canvas.width/1.1;
    scene1Sprites[4].top=canvas.height/2.6;

    //播放背景音乐
    bgm.play();

    // 开始动画
    id=requestAnimationFrame(scene1Animate);

}
function scene1Animate(){
    now=+Date.now();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(scene1Background,0,0,canvas.width,canvas.height);
    
    scene1Sprites.forEach((sprite)=>{
        sprite.update(context,now);
        sprite.paint(context);
    });
    scene1Text.update(context,now);
    scene1Text.paint(context);
    drawAudioControl(context);

   
    id=requestAnimationFrame(scene1Animate);

}
function scene2(){    
    console.log('scene2');
    scene2Init();
}
function scene3(cityIndex){
    console.log('welcome to '+cityIndex+'!');
    scene3Init(cityIndex);
}
function onKeydown(event){
    if (event.key === "Enter") {    
        cancelAnimationFrame(id);   
        context.clearRect(0, 0, canvas.width, canvas.height);
        window.onkeydown = null;
        scene2();  
    }
}

function init(){
    
    // 加载图片和音频资源
    scene1SpriteSheet.src=IMAGE_URL['scene1_sprites_sheets'];
    scene1Background.src=IMAGE_URL['scene1_background'];
    bgmControl[0].src=IMAGE_URL['sound_turn_off'];
    bgmControl[1].src=IMAGE_URL['sound_turn_on'];
    bgm.src=AUDIO_URL;
    // 监听图片加载
    resourcesLoaded = 0;
    totalResources = 5; // 需要加载的资源总数
    scene1SpriteSheet.onload=judgeResourceLoad(onSheetLoad);
    scene1Background.onload=judgeResourceLoad(onSheetLoad);
    bgmControl[0].onload=judgeResourceLoad(onSheetLoad);
    bgmControl[1].onload=judgeResourceLoad(onSheetLoad); 
    bgm.oncanplaythrough=judgeResourceLoad(onSheetLoad);
      
    window.onkeydown=onKeydown;
    canvas.onclick=onBgmClick;
}
init();