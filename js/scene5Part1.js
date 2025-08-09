let part1SpriteSheet=new Image();
let part1Sprites=[];
let dialogRect=new Rect()
let dialogKey=-1;
let dialogueTextSprites=[];
let bgTextSprites=[];
let diaTextBehavior=new TextTypingBehavior(1000/20);
let bgTextBehavior=new TextTypingBehavior(1000/30);
function scene5Part1Click(e){
    let point=convertWindowToCanvas(canvases[0],{x:e.clientX,y:e.clientY});
    if(point.x>dialogTips[0].x&&point.x<dialogTips[0].x+dialogTips[0].fontSize*6&&point.y>dialogTips[0].y&&point.y<dialogTips[0].y+dialogTips[0].fontSize){
        dialogKey++;
        console.log(dialogKey);
        id=requestAnimationFrame(scene5Part1Animate);
    }

}
function part1Loaded(){
    part1Sprites.push(new Sprite('part1Sprite1',new SpriteSheetPainter([part1Cells[0]],part1SpriteSheet)));
    part1Sprites.push(new Sprite('part1Sprite2',new SpriteSheetPainter([part1Cells[1]],part1SpriteSheet)));
    
    part1Sprites[0].left=0;
    part1Sprites[0].top=canvases[0].height-part1Cells[0].height*0.65;
    part1Sprites[1].left=canvases[0].width-part1Cells[1].width;
    part1Sprites[1].top=canvases[0].height-part1Cells[1].height*0.65;
    if(canvases[0].style.display!=='none')
    id=requestAnimationFrame(scene5Part1Animate);
}
function scene5Part1Animate(){
    now=+Date.now();
    contexts[0].clearRect(0,0,canvases[0].width,canvases[0].height);
    contexts[0].drawImage(canvasesBg[0],0,0,canvases[0].width,canvases[0].height);
    part1Sprites[0].paint(contexts[0]);
    part1Sprites[1].paint(contexts[0]);
    dialogRect.paint(contexts[0],'rgba(241, 212, 157, 0.5)',true,0,true,15,true,{color:'rgba(0,0,0,0.5)',offsetX:5,offsetY:5,blur:10});
    if(dialogKey>-1&&dialogKey<4){
        drawText(contexts[0],dialogTips[1],1,0);
        bgTextSprites[dialogKey].update(contexts[0],now);
        bgTextSprites[dialogKey].paint(contexts[0]);
        dialogueTextSprites[dialogKey].update(contexts[0],now);
        dialogueTextSprites[dialogKey].paint(contexts[0]);
    }
    else{
    drawText(contexts[0],dialogTips[0],1,0);
    }
        


    if(dialogKey>3){
        dialogKey=-1;
        cancelAnimationFrame(id);
    }
    else
    id=requestAnimationFrame(scene5Part1Animate);

}
function scene5Part1Init(){
    console.log('part1Init');
    part1Sprites=[];
    dialogKey=-1;
    dialogRect.setPos(0,canvases[0].height*0.8);
    dialogRect.setSize(canvases[0].width,canvases[0].height*0.2);
    part1SpriteSheet.src=IMAGE_URL['canvas0_sprite_sheet'];
    console.log(canvases[0].width,canvases[0].height)
    for(let i=0;i<4;i++){
        dialogueTextSprites.push(new Sprite(dialogText[i].text,TextPainter,[diaTextBehavior]));
        bgTextSprites.push(new Sprite(bgText[i].text,TextPainter,[bgTextBehavior]));
        dialogueTextSprites[i].left=dialogText[i].x;
        dialogueTextSprites[i].top=dialogText[i].y;
        dialogueTextSprites[i].width=DIALOG_TEXT_WIDTH;
        dialogueTextSprites[i].style=dialogText[i];
        bgTextSprites[i].left=bgText[i].x;
        bgTextSprites[i].top=bgText[i].y; 
        bgTextSprites[i].width=BG_TEXT_WIDTH; 
        bgTextSprites[i].style=bgText[i];
    }
    part1SpriteSheet.onload=part1Loaded;
    canvases[0].onclick=scene5Part1Click;
}