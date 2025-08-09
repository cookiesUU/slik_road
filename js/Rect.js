class Rect {
    constructor(x, y, width, height) {
      this.x = x;      // 矩形的x坐标
      this.y = y;      // 矩形的y坐标
      this.w = width;  // 矩形的宽度
      this.h = height; // 矩形的高度
    }
  
    // 设置大小
    setSize(w, h) {
      this.w = w;
      this.h = h;
    }
  
    // 设置位置
    setPos(x, y) {
      this.x = x;
      this.y = y;
    }
  
    //设置矩形提示文本
    setText(context,text) {
      context.save();
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = text.color;
      context.font = `${text.fontSize}px ${text.font}`;
      context.fillText(text.text, this.x + this.w / 2, this.y + this.h / 2, this.w);
      context.restore();
    }

    setVerticalText(context,text){
      context.textAlign = 'center';
    context.textBaseline ='middle';
    context.fillStyle = text.color;
    context.font = `${text.fontSize}px ${text.font}`;
    const textToDraw = text.text;
    const xPos = this.x + this.w / 2; // 可以根据实际需求调整文本在矩形内横向的起始位置
    let yPos = this.y +text.fontSize/2;  // 初始纵向位置，可以按需调整
    for (let i = 0; i < textToDraw.length; i++) {
        context.fillText(textToDraw.charAt(i), xPos, yPos);
        yPos += text.fontSize; // 根据字体大小来调整纵向间隔，使文字逐行往下排列，竖着显示
    }
    context.restore();
    }
  
    paint(context,style, isFill,lineWidth=1, rounded = false, radius = 0,isShadow=false,shadow=undefined) {  
      context.save();
      if(isShadow){
        context.shadowColor=shadow.color;
        context.shadowOffsetX=shadow.offsetX;
        context.shadowOffsetY=shadow.offsetY;
        context.shadowBlur=shadow.blur;
      }
      
      // 设置圆角状态
      this.rounded = rounded;
      this.radius = radius;

      if (isFill) {//填充
        context.fillStyle = style;
      if (this.rounded) {
        // 绘制圆角矩形
        this.setRoundedCorners(context, this.radius);
        context.fill(); 
      } else {
        // 绘制普通矩形
        context.fillRect(this.x, this.y, this.w, this.h);
      }
      }
      else{//描边
        context.lineWidth = lineWidth ;
        context.strokeStyle = style;
      if (this.rounded) {
        // 绘制圆角矩形
        this.setRoundedCorners(context, this.radius);
        context.stroke(); 
      } else {
        // 绘制普通矩形
        context.strokeRect(this.x, this.y, this.w, this.h);
      }
      }
      context.restore();
    }
  
    // 判断是否选中了该区域
    isClicked(x, y) {
      return x >= this.x && x <= this.x + this.w &&
        y >= this.y && y <= this.y + this.h;
    }
  
    // 打印矩形的信息
    toString() {
      return `Rect(x: ${this.x}, y: ${this.y}, width: ${this.w}, height: ${this.h})`;
    }
  
    //新增的方法：
    // 设置圆角矩形
  setRoundedCorners(context, radius) {
    // 确保半径不会超过矩形的宽度或高度的 1/2
    radius = Math.min(radius, this.w / 2, this.h / 2);

    context.beginPath();
    // 绘制四个圆角
    context.moveTo(this.x + radius, this.y); // 移动到左上角
    context.arcTo(this.x + this.w, this.y, this.x + this.w, this.y + this.h, radius); // 右上角
    context.arcTo(this.x + this.w, this.y + this.h, this.x, this.y + this.h, radius); // 右下角
    context.arcTo(this.x, this.y + this.h, this.x, this.y, radius); // 左下角
    context.arcTo(this.x, this.y, this.x + this.w, this.y, radius); // 左上角
    context.closePath();
  }
    //精灵填充矩形
    fillWithSprite(context, sprite) {
      // 确保精灵的位置和大小与矩形一致
        sprite.left = this.x;
        sprite.top = this.y;
        sprite.width = this.w;
        sprite.height = this.h;
      if (sprite.painter && sprite.painter.image.complete) {
        // 如果精灵的图像已经加载完成
        
        sprite.paint(context);
      } else {
        // 如果图像尚未加载完成，等图像加载后再绘制
        const img = sprite.painter.image;
        img.onload = () => {
          sprite.paint(context);
        };
      }
    }
    // 线性渐变填充矩形
    linearGradientFill(context, startX, startY, endX, endY, colors) {
        // startX、startY、endX、endY定义线性渐变的起止坐标，colors颜色数组
        const gradient = context.createLinearGradient(startX, startY, endX, endY);
        for (let i = 0; i < colors.length; i++) {
            const stop = i / (colors.length - 1);
            gradient.addColorStop(stop, colors[i]);
        }
        context.fillStyle = gradient;
        context.fillRect(this.x, this.y, this.w, this.h);
    }
  
    // 辐射渐变填充矩形
    radialGradientFill(context, cx, cy, radius, innerRadius, colors) {
      // cx、cy是圆心坐标，radius是半径，innerRadius是内圆半径，colors颜色数组  
      const gradient = context.createRadialGradient(cx, cy, innerRadius, cx, cy, radius);
        for (let i = 0; i < colors.length; i++) {
            const stop = i / (colors.length - 1);
            gradient.addColorStop(stop, colors[i]);
        }
        context.fillStyle = gradient;
        context.fillRect(this.x, this.y, this.w, this.h);
    }
  
    // 以矩形中心点为基准，按照给定比例缩放矩形
    scaleFromCenter(scaleX, scaleY) {
      let centerX = this.x + this.w / 2;
      let centerY = this.y + this.h / 2;
      this.w *= scaleX;
      this.h *= scaleY;
      this.x = centerX - this.w / 2;
      this.y = centerY - this.h / 2;
      return this;
  }
  
  }
  
  