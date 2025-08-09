const pieceWidth = 144; 
const pieceHeight = 144; 
let pieces = []; 
let emptyPieceIndex;
let isFinished = false; 
let puzzleImg=new Image();
let part2SpriteSheet=new Image();
let ispart2SpriteSheetLoaded=false;
let part2Sprites=[];
let clickSpriteTimes=0;
let part2BgText=[];
let part2BgTextIndex;

// 拼图块类
class PuzzlePiece {
    constructor(x, y,left,top,index) {
    this.x = x; 
    this.y = y; 
    this.left=left;
    this.top=top;
    this.index = index; 
    this.width = pieceWidth;
    this.height = pieceHeight;
    }
}

// 初始化拼图
function initPuzzle() {
    pieces = [];  // 每次初始化时清空拼图块数组
    emptyPieceIndex = null;  
    isFinished = false;  

        // 切割图片为9个小块
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                let puzzleIndex = row * 3 + col;
                let x = col * pieceWidth;
                let y = row * pieceHeight;
                
                let piece = new PuzzlePiece(x, y,0,0,puzzleIndex);
                pieces.push(piece);
            }
        }
        emptyPieceIndex = pieces.length - 1; 
        shufflePieces(); // 打乱小块顺序
        if(canvases[1].style.display!=='none')
        drawPieces(); // 绘制初始拼图
    
}
// 打乱拼图块
function shufflePieces() {
    for (let i = pieces.length - 1; i > 0; i--) {
        if (pieces[i].index === 8) continue; // 跳过空白块
        const j = Math.floor(Math.random() * i);
        if (pieces[j].index === 8) continue; // 跳过空白块
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]]; // 交换位置
    }
    
    // 确保空白块在最后
    let emptyPiece = pieces.find(piece => piece.index === 8);
    let emptyPieceIndex = pieces.indexOf(emptyPiece);
    [pieces[emptyPieceIndex], pieces[pieces.length - 1]] = [pieces[pieces.length - 1], pieces[emptyPieceIndex]];
}


// 绘制所有拼图小块
function drawPieces() {
    contexts[1].clearRect(0, 0, canvases[1].width, canvases[1].height);
    contexts[1].drawImage(canvasesBg[1],0,0, canvases[1].width, canvases[1].height);
    drawText(contexts[1],skipText,1,0);
    pieces.forEach((piece,i) => {    
        if (i !== emptyPieceIndex) {
            piece.left = canvases[1].width*0.3+parseInt(i%3)*piece.width;
            piece.top = canvases[1].height*0.1+parseInt(i/3)*piece.height;
            contexts[1].drawImage(puzzleImg, piece.x, piece.y, piece.width, piece.height, piece.left,piece.top, piece.width, piece.height);
    }
    else{
        piece.left = canvases[1].width*0.3+parseInt(i%3)*piece.width;
        piece.top = canvases[1].height*0.1+parseInt(i/3)*piece.height;
    }
    
   });
   console.log(pieces);
    
}

// 检查点击位置并交换
function checkClick(e) {
    let point = convertWindowToCanvas(canvases[1], { x: e.clientX, y: e.clientY });  
    for (let i = 0; i < pieces.length; i++) {
        let piece = pieces[i];
        if (i === emptyPieceIndex) continue;     
        // 检查坐标是否在拼图块内
        if (point.x >= piece.left && point.x < piece.left + piece.width && point.y >= piece.top && point.y < piece.top + piece.height) {
            
            // 判断是否与空白块相邻
            const dx = Math.round(Math.abs(piece.left - pieces[emptyPieceIndex].left));
            const dy = Math.round(Math.abs(piece.top - pieces[emptyPieceIndex].top));
            if ((dx === pieceWidth && dy === 0) || (dx === 0 && dy === pieceHeight)) {
                [pieces[i], pieces[emptyPieceIndex]] = [pieces[emptyPieceIndex], pieces[i]];  // 交换位置
                emptyPieceIndex = i;
                drawPieces();  // 重新绘制拼图
                if (checkWin()) {  // 检查拼图是否完成
                    isFinished = true;
                    canvases[1].onclick = clickSprites;
                    setTimeout(() => {
                        id = requestAnimationFrame(scene5Part2Animate); 
                    }, 1000); 
                }
            }
            break;
        }
    }
    // 判断点击是否在跳过按钮区域
    if (point.x > skipText.x && point.x < skipText.x + skipText.fontSize * 2 && point.y > skipText.y && point.y < skipText.y + skipText.fontSize) {

        isFinished = true;
        completePuzzle();
        canvases[1].onclick = clickSprites;
        setTimeout(() => {
            id = requestAnimationFrame(scene5Part2Animate); 
        }, 1000);
        
    }
}


// 检查是否完成拼图
function checkWin() {
    for (let i = 0; i < pieces.length; i++) {
        
        if (pieces[i].index !== i) {
            return false;
        }
    }
    return true;
}
// 跳过拼图步骤，直接完成拼图
function completePuzzle() {
    
    for (let i = 0; i < pieces.length; i++) {
       
            pieces[i].left = canvases[1].width*0.3+parseInt(pieces[i].index%3)*pieces[i].width;
            pieces[i].top = canvases[1].height*0.1+parseInt(pieces[i].index/3)*pieces[i].height;
            if(i!==8)
            contexts[1].drawImage(puzzleImg, pieces[i].x, pieces[i].y, pieces[i].width, pieces[i].height, pieces[i].left,pieces[i].top, pieces[i].width, pieces[i].height);
    }
    
    
}
function clickSprites(e){
    let point = convertWindowToCanvas(canvases[1], { x: e.clientX, y: e.clientY });
    part2Sprites.forEach((sprite,index)=>{
        if(point.x>=sprite.left&&point.x<=sprite.left+sprite.width&&point.y>=sprite.top&&point.y<=sprite.top+sprite.height){
            part2BgTextIndex=index;
            clickSpriteTimes++;
        }
    })
}

function scene5Part2Animate(){
    now=+Date.now();
    contexts[1].clearRect(0,0,canvases[1].width,canvases[1].height);
    contexts[1].drawImage(canvasesBg[1],0,0,canvases[1].width,canvases[1].height);
    
    if(ispart2SpriteSheetLoaded){
        console.log(part2Sprites[0].animating);
        if(part2Sprites[0].animating){
        part2Sprites[0].update(contexts[1],now);
        part2Sprites[0].paint(contexts[1]);
        }
        else{
            part2Sprites.forEach(sprite=>{
                sprite.paint(contexts[1]);
            });
            drawText(contexts[1],part2Tip,1,0);
        }
        if(part2BgTextIndex!==-1){
        part2BgText[part2BgTextIndex].update(contexts[1],now);
        part2BgText[part2BgTextIndex].paint(contexts[1]);
        }
    }
    if(clickSpriteTimes>3){
        cancelAnimationFrame(id);
        clickSprites=null;
        part2BgText.forEach(text=>{
            text.paint(contexts[1]);
        });
    }
    else{
     id=requestAnimationFrame(scene5Part2Animate);
    }
}




function scene5Part2Init(){
    console.log('part1Init');
    part2Sprites=[];
    part2BgText=[];
    clickSpriteTimes=0;
    part2BgTextIndex=-1;
    for(let i=0;i<3;i++){
    part2BgText.push(new Sprite(part2BgTexts[i].text,TextPainter,[new TextTypingBehavior(1000/30)]));
    part2BgText[i].left=part2BgTexts[i].x;
    part2BgText[i].top=part2BgTexts[i].y;
    part2BgText[i].width=part2BgTexts[i].width;
    part2BgText[i].style=part2BgTexts[i];
    }
    puzzleImg.src = IMAGE_URL['canvas1_character']; 
    part2SpriteSheet.src=IMAGE_URL['canvas1_sprite_sheet'];
    part2SpriteSheet.onload=function(){
        ispart2SpriteSheetLoaded=true;
        part2Sprites.push(new Sprite('part2Sprite1',new SpriteSheetPainter([part2Cells[0]],part2SpriteSheet),[lessen,moveToTopLeft]));
        part2Sprites.push(new Sprite('part2Sprite2',new SpriteSheetPainter([part2Cells[1]],part2SpriteSheet)));
        part2Sprites.push(new Sprite('part2Sprite3',new SpriteSheetPainter([part2Cells[2]],part2SpriteSheet)));
        part2Sprites[0].left=canvases[1].width*0.3;
        part2Sprites[0].top=canvases[1].height*0.1;
        part2Sprites[1].left=canvases[1].width*0.9;
        part2Sprites[1].top=canvases[1].height*0.25;
        part2Sprites[1].width=part2Cells[1].width*0.5;
        part2Sprites[1].height=part2Cells[1].height*0.5;
        part2Sprites[2].left=canvases[1].width*0.03;
        part2Sprites[2].top=canvases[1].height*0.6;
        part2Sprites[2].width=part2Cells[1].width*0.47;
        part2Sprites[2].height=part2Cells[1].height*0.47;
    };

    
    puzzleImg.onload=initPuzzle;
    canvases[1].onclick=checkClick;
}