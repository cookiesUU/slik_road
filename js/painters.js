//打字机文字绘制器
let TextPainter = {
  paint: function(sprite, context) {
    // 设置文本样式
    if(sprite.style===undefined){    
    context.font = '20px Arial';
    context.fillStyle = 'blue';
    context.textAlign='center';
    context.textBaseline='middle';
  }
  else{
    context.font = `${sprite.style.fontSize}px ${sprite.style.font}`;
    context.fillStyle = sprite.style.color;
    context.textAlign=sprite.style.align;
    context.textBaseline=sprite.style.baseline;
  }
  let currentAlpha = context.globalAlpha;
  context.globalAlpha = 1;
  context.save();
  context.globalAlpha = currentAlpha;
    // 绘制文字
    if (sprite.index === undefined)
    context.fillText(sprite.name, sprite.left, sprite.top);
    else{
      if(sprite.width=== undefined)
        context.fillText(sprite.name.substring(0, sprite.index), sprite.left, sprite.top);
      else{
        // 如果设置了文本宽度，考虑换行
        let text = sprite.name.substring(0, sprite.index);
        let line = '';
        let lineHeight = parseInt(context.font, 10)*1.5;
        let yPos = sprite.top;
        let words = text.split('');   
        for (let i = 0; i < words.length; i++) {
          let testLine = line + words[i];
          let metrics = context.measureText(testLine);      
          // 如果文本超过宽度，则换行
          if (metrics.width > sprite.width && line !== '') {
            context.fillText(line, sprite.left, yPos);
            line = words[i];  // 开始新的一行
            yPos += lineHeight;
          } else {
            line = testLine;
          }
        }
        // 绘制最后一行
        context.fillText(line, sprite.left, yPos);
      }
    }
    
    
    context.restore();
    
  }
};

  // 汽车绘制器
  var CarPainter = function(imageUrl){
    this.image=new Image();
    this.image.src=imageUrl;
  }
   CarPainter.prototype={
      image:undefined,
      paint:function(sprite,context){
        if(this.image!==undefined){
          if(!this.image.complete){
            this.image.onload=()=>{
              if(sprite.width===undefined)  
                sprite.width = this.image.width;
              if (sprite.height===undefined)  
                sprite.height = this.image.height;
              context.save();
              context.translate(sprite.left+sprite.width/2,sprite.top+sprite.height/2);
              context.rotate(sprite.rotation);
              context.drawImage(this.image,-sprite.width/2,-sprite.height/2,sprite.width,sprite.height);
              context.restore(); 
            }
          }  
          else{
          if(sprite.width===undefined)  
            sprite.width = this.image.width;
          if (sprite.height===undefined)  
            sprite.height = this.image.height;
          context.save();
          context.translate(sprite.left+sprite.width/2,sprite.top+sprite.height/2);
          context.rotate(sprite.rotation);
          context.drawImage(this.image,-sprite.width/2,-sprite.height/2,sprite.width,sprite.height);
          context.restore();
          }
        }
      }
      
  }