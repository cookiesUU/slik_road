let part3BgSpriteSheet=new Image();
let part3CharSpriteSheet=new Image();
let part3Bg2SpriteSheet=new Image();
let part3BgSprites;
let part3CharSprites;
let part3Bg2Sprites;
let part3BgTextSprites;
let part3TitleTextSprites;
let bgHeight;
let upBehaviors=[new upBehavior(),new upBehavior(PART3_UP_SPEEG*1.4),new upBehavior(PART3_UP_SPEEG),new upBehavior()];
let isScene5Part3Animate=true;
let tipsRect=new Rect();
let charBgIndex=-1;
let part3ClickTimes;
function part3Loaded(){
    for(let i=0;i<4;i++){
    part3BgSprites.push(new Sprite('part3BgSprite'+i,new SpriteSheetPainter([part3Bg1Cells[i]],part3BgSpriteSheet),[upBehaviors[i],fadeIn]));
    part3CharSprites.push(new Sprite('part3CharSprite'+i,new SpriteSheetPainter([part3CharCells[i]],part3CharSpriteSheet)));
    part3Bg2Sprites.push(new Sprite('part3Bg2Sprite'+i,new SpriteSheetPainter([part3Bg2Cells[i]],part3Bg2SpriteSheet),[fadeIn]));
    part3BgTextSprites.push(new Sprite(part3BgTexts[i].text,TextPainter,[new TextTypingBehavior(1000/30)]));
    part3TitleTextSprites.push(new Sprite(part3TitleTexts[i].text,TextPainter,[fadeIn]));
    
    part3BgSprites[i].left=0;

    part3Bg2Sprites[i].top=0;
    part3Bg2Sprites[i].left=0;

    part3CharSprites[i].left=part3CharCells[i].left;
    part3CharSprites[i].top=part3CharCells[i].top;

    part3BgTextSprites[i].left=part3BgTexts[i].x;
    part3BgTextSprites[i].top=part3BgTexts[i].y;
    part3BgTextSprites[i].width=part3BgTexts[i].width;
    part3BgTextSprites[i].style=part3BgTexts[i];

    part3TitleTextSprites[i].left=part3TitleTexts[i].x;
    part3TitleTextSprites[i].top=part3TitleTexts[i].y;
    part3TitleTextSprites[i].style=part3TitleTexts[i];


    
      
}
    part3BgSprites[0].top=0;
    part3BgSprites[1].top=part3Bg1Cells[1].height*0.7;
    part3BgSprites[2].top=part3Bg1Cells[2].height*0.6;
    part3BgSprites[3].top=0;

    if(canvases[2].style.display!=='none')
    id=requestAnimationFrame(scene5Part3Animate);
    
}
function scene5Part3Animate(){
    now=+Date.now();
    contexts[2].clearRect(0,0,canvases[0].width,canvases[0].height);
    part3BgSprites.forEach(sprite=>{
        sprite.update(contexts[2],now);
        sprite.paint(contexts[2]);
    })
    tipsRect.paint(contexts[2],'rgb(179, 197, 148)',false,1);
    tipsRect.setText(contexts[2],{text:'了解更多',color:'rgb(179, 197, 148)',fontSize:20,font:FONT_STYLE['main_body']});

    if(isScene5Part3Animate)
        id=requestAnimationFrame(scene5Part3Animate);
    else{
        cancelAnimationFrame(id);
        id=requestAnimationFrame(scene5part3Animate2);
    }
       
    
}
function scene5part3Animate2(){
    
    contexts[2].drawImage(canvasesBg[2],0,0,canvases[2].width,bgHeight,0,canvases[2].height-bgHeight,canvases[2].width,bgHeight);
    bgHeight+=5;
    if(bgHeight>=720){        
        cancelAnimationFrame(id);
        id=requestAnimationFrame(scene5part3Animate3);
    }
    else{
    id=requestAnimationFrame(scene5part3Animate2);
}
}
function scene5part3Animate3(){
    now=+Date.now();
    contexts[2].clearRect(0,0,canvases[2].width,canvases[2].height);
    contexts[2].drawImage(canvasesBg[2],0,0,canvases[2].width,bgHeight,0,canvases[2].height-bgHeight,canvases[2].width,bgHeight);
    
    if(charBgIndex>-1){   
        part3Bg2Sprites[charBgIndex].update(contexts[2],now);   
        part3Bg2Sprites[charBgIndex].paint(contexts[2]);
        part3TitleTextSprites[charBgIndex].update(contexts[2],now);
        part3TitleTextSprites[charBgIndex].paint(contexts[2]);
        if(part3Bg2Sprites[charBgIndex].animating===false){
            part3BgTextSprites[charBgIndex].update(contexts[2],now);
            part3BgTextSprites[charBgIndex].paint(contexts[2]);
        }
    }  
    part3CharSprites.forEach(sprite=>{
        sprite.paint(contexts[2]);
    });
    if(part3ClickTimes>4){
        cancelAnimationFrame(id);
    }
    else
    id=requestAnimationFrame(scene5part3Animate3);
}

function tipsRectClick(e){
    let point=convertWindowToCanvas(canvases[2],{x:e.clientX,y:e.clientY});
    if(point.x>tipsRect.x&&point.x<tipsRect.x+tipsRect.w&&point.y>tipsRect.y&&point.y<tipsRect.y+tipsRect.h){
        isScene5Part3Animate=false;
        canvases[2].onclick=partCharSpritesClick;  
    }

}
function partCharSpritesClick(e){
    let point=convertWindowToCanvas(canvases[2],{x:e.clientX,y:e.clientY});
    
    for(let i=0;i<4;i++){
        if(point.x>part3CharSprites[i].left&&point.x<part3CharSprites[i].left+part3CharSprites[i].width&&point.y>part3CharSprites[i].top&&point.y<part3CharSprites[i].top+part3CharSprites[i].height){
            fadeIn.init();
            charBgIndex=i;
            
            part3ClickTimes++;
            break;
        }
    }
}
function scene5Part3Init(){
    part3BgSprites=[];
    part3Bg2Sprites=[];
    part3CharSprites=[];
    part3BgTextSprites=[];
    part3TitleTextSprites=[];
    bgHeight=260;
    part3ClickTimes=0;
    charBgIndex=-1;
    part3BgSpriteSheet.src=IMAGE_URL['canvas2_bg_sheet'];
    part3CharSpriteSheet.src=IMAGE_URL['canvas2_character_sheet'];
    part3Bg2SpriteSheet.src=IMAGE_URL['canvas2_bg2_sheet']
    part3BgSpriteSheet.onload=function(){
        part3CharSpriteSheet.onload=function(){
            part3Bg2SpriteSheet.onload=part3Loaded;
    }
}
    tipsRect.setSize(canvases[2].width*0.4,canvases[2].height*0.08);
    tipsRect.setPos(canvases[2].width*0.5-tipsRect.w/2,canvases[2].height*0.8);
    canvases[2].onclick=tipsRectClick;
}