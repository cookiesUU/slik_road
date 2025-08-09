let part4CharSprites;
let part4CharSpriteSheet=new Image();
let isDragging = false;
let offsetX, offsetY, draggedSpriteIndex;
function part4Loaded(){
    for(let i=0;i<16;i++){
        part4CharSprites.push(new Sprite('part4CharSprite'+i,new SpriteSheetPainter([part4Cells[i]],part4CharSpriteSheet)));
        part4CharSprites[i].left=part4Cells[i].left;
        part4CharSprites[i].top=part4Cells[i].top;
        part4CharSprites[i].width=part4Cells[i].width;
        part4CharSprites[i].height=part4Cells[i].height;
    }
    if(canvases[3].style.display!=='none'){
        id=requestAnimationFrame(scene5Part4Animate);
    }

}
function scene5Part4Animate(){
   contexts[3].clearRect(0,0,canvases[3].width,canvases[3].height);
   contexts[3].drawImage(canvasesBg[3],0,0,canvases[3].width,canvases[3].height);
    part4CharSprites.forEach(sprite=>{
        sprite.paint(contexts[3]);
    });
}
function onMouseDown(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    part4CharSprites.forEach((sprite, index) => {
        if (
            mouseX >= sprite.left && mouseX <= sprite.left + sprite.width &&
            mouseY >= sprite.top && mouseY <= sprite.top + sprite.height
        ) {
            isDragging = true;
            draggedSpriteIndex = index;
            offsetX = mouseX - sprite.left;   
            offsetY = mouseY - sprite.top;
        }
    });
}

function onMouseMove(event) {
    if (isDragging) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;       
        const sprite = part4CharSprites[draggedSpriteIndex];
        sprite.left = mouseX - offsetX;
        sprite.top = mouseY - offsetY;

        contexts[3].clearRect(0, 0, canvases[3].width, canvases[3].height);
        scene5Part4Animate();
    }
}

function onMouseUp() {
    isDragging = false;  
    draggedSpriteIndex = null;  
}
function scene5Part4Init(){
    part4CharSprites=[];
    part4CharSpriteSheet.src=IMAGE_URL['canvas3_sprite_sheet'];
    part4CharSpriteSheet.onload=part4Loaded;
    canvases[3].onmousedown = onMouseDown;
    canvases[3].onmousemove = onMouseMove;
    canvases[3].onmouseup = onMouseUp;
    canvases[3].onmouseleave = onMouseUp;

}