

/**
 * 绘制线段路径
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-9-22
 * @param {Object} context 绘制的目标context
 * @param {Object} line 包含绘制线段的起始点(x1,y1)和终止点(x2,y2)
 * @param {*} isNewPath 是否开启新路径  是否开启新路径，true/1表示开启，反之不开启
 */
function drawLinePath(context,line,isNewPath,isClosePath){
    if(isNewPath) context.beginPath();
    //1 直线路径
    context.moveTo(line.startPointX,line.startPointY);  //起始点坐标
    context.lineTo(line.endPointX,line.endPointY);  //终止点坐标
    if(isClosePath) context.closePath();
}

/**
 * 绘制文本
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-9-22
 * @param {Object} context 绘制的目标context
 * @param {Object} text 包括字体及大小的font，起始点水平对齐align，起始点垂直基线baseline，起始点坐标(x,y)等信息
 * @param {String} style 填充色/描边色/其他样式
 * @param {Number} isFill 是否填充，true/1表示填充，反之描边
 * @param {Number} lineWidth 绘制线条的宽度
 */
function drawText(context,text,isFill,lineWidth) {
    context.font=`${text.fontSize}px ${text.font}` ; //设置字体大小
    context.textAlign=text.align;
    context.textBaseline=text.baseline;
    if(isFill){
        context.fillStyle=text.fillStyle;
        context.fillText(text.text, text.x,text.y); //绘制填充文本
    }else{
        context.strokeStyle=text.strokeStyle;
        context.lineWidth=lineWidth || 1;
        context.strokeText(text.text, text.x,text.y); //绘制描边文本
    }
}
/**
 * 在指定的上下文中绘制带有边框的文本
 * @param {CanvasRenderingContext2D} context - 2D 渲染上下文
 * @param {Object} text - 包含文本属性的对象，如字体、大小、对齐方式和颜色
 * @param {boolean} isFill - 是否填充文本
 * @param {boolean} isStroke - 是否绘制文本边框
 * @param {number} lineWidth - 文本边框的线宽
 */
function drawTextWithBorder(context, text,isFill,isStroke,lineWidth) {
    context.save();
    context.font = `${text.fontSize}px ${text.font}`;
    context.textAlign = text.align;
    context.textBaseline = text.baseline;
    if(isStroke){
    context.lineWidth = lineWidth || 1;  
    context.strokeStyle = text.strokeStyle;  
    context.strokeText(text.text, text.x, text.y);
    }
    if(isFill){
    context.fillStyle = text.fillStyle; 
    context.fillText(text.text, text.x, text.y);
    }
    context.restore();
}

/**
 * 根据矩形信息绘制矩形
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-9-22
 * @param {Object} context 绘制的目标context
 * @param {Object} rect 包括绘制起始点坐标(x,y)、宽度width和高度height信息
 * @param {String} style 填充色/描边色/其他样式
 * @param {Boolean} isFill  是否填充，true/1表示填充，反之描边
 * @param {Number} lineWidth 绘制线条的宽度
 */
function drawRect(context,rect,style,isFill,lineWidth) {
    if(isFill){
        context.fillStyle=style;
        context.fillRect(rect.x,rect.y,rect.w,rect.h);
    }else{
        context.strokeStyle=style;
        context.lineWidth=lineWidth;
        context.strokeRect(rect.x,rect.y,rect.w,rect.h);
    }
}

/**
 * 绘制矩形路径
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-9-22
 * @param {Object} context 绘制的目标context
 * @param {Object} rect 包括绘制起始点坐标(x,y)、宽度width和高度height信息
 * @param {*} isNewPath 是否开启新路径  是否开启新路径，true/1表示开启，反之不开启
 */
function drawRectPath(context,rect,isNewPath) {
   if(isNewPath) context.beginPath();
   context.rect(rect.x, rect.y, rect.w, rect.h);
}

/**
 * 设置路径样式
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-9-22
 * @param {Object} context 绘制的目标context
 * @param {String} style 填充色/描边色/其他样式
 * @param {Number} isFill  是否填充，true/1表示填充，反之描边
 * @param {Number} lineWidth 绘制线条的宽度
 */
function putColorOnPath(context,style,isFill,lineWidth) {
    if(isFill){
        context.fillStyle=style;
        context.fill(); 
    }else{
        context.strokeStyle=style;
        context.lineWidth=lineWidth || 1;
        context.stroke();
    }
}

/**
 * 清除指定大小的canvas
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-9-22
 * @param {Object} context 绘制的目标context
 * @param {Object} rect 指定要清除的矩形大小，包括起始点(x,y)和宽度w，高度h的信息
 */
function clearCanvas(context,rect) {
    context.clearRect(rect.x, rect.y, rect.w, rect.h);   
}

/**
 * 绘制圆形路径
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-9-22
 * @param {Object} context 绘制的目标context
 * @param {Object} cirle包括绘制圆心坐标(x,y)、半径r、起始弧度startAngle、终止弧度endAngle和是否顺时针clockwise信息
 * @param {Boolean} isNewPath 是否开启新路径  是否开启新路径，true/1表示开启，反之不开启
 * @param {Boolean} isClosePath 是否闭合路径 true/1表示闭合，反之不闭合
 */
function drawCirclePath(context,circle,isNewPath,isClosePath){
    if(isNewPath) context.beginPath();
    context.arc(circle.x,circle.y,circle.r,circle.sAngle,circle.eAngle,!circle.clockwise);
    if(isClosePath) context.closePath();
}

/**
 * 绘制图像
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-9-22
 * @param {Object} context 绘制的目标canvas
 * @param {Object} image 绘制的图像对象
 * @param {Object} rect 绘制图像的起始点坐标（x,y)和图像大小w和h 
 */
function drawImg(context,image,rect){
    if(image!==undefined && rect!==undefined) 
        context.drawImage(image, rect.x, rect.y, rect.w, rect.h);
}

/**
 * 设置路径阴影
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-9-22
 * @param {Object} context 绘制的目标canvas
 * @param {String} color  阴影颜色
 * @param {*} offsetX 
 * @param {*} offsetY 
 * @param {*} blur 
 */
function putShadowOnPath(context,color,offsetX,offsetY,blur) {
    if(blur!==undefined) context.shadowBlur=blur;
    if(color!==undefined) context.shadowColor=color;
    if(offsetX!==undefined) context.shadowOffsetX=offsetX;
    if(offsetY!==undefined) context.shadowOffsetY=offsetY;
    
}


/**
 * 创建线性渐变对象
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-9-22
 * @param {*} context 绘制目标context对象
 * @param {*} x1  起始点的x坐标
 * @param {*} y1  起始点的y坐标
 * @param {*} x2  终止点的x坐标
 * @param {*} y2  终止点的x坐标
 * @param {*} colors 颜色数组colors=[{pos:0,color:'orange'},...]
 * @returns 
 */
function createLinearGradient(context,x1,y1,x2,y2,colors){
    let grd=context.createLinearGradient(x1, y1, x2, y2);
   
    for(let i=0;i<colors.length;i++){
        grd.addColorStop(colors[i].pos, colors[i].color);
    }
    return grd;  
}

/**
 * 创建辐射渐变对象
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-9-22
 * @param {*} context 绘制目标context对象
 * @param {*} x1 起始圆的x坐标
 * @param {*} y1 起始圆的y坐标
 * @param {*} r1 起始圆的r
 * @param {*} x2 终止圆的x坐标
 * @param {*} y2 终止圆的y坐标
 * @param {*} r2 终止圆的r
 * @param {*} colors 颜色数组colors=[{pos:0,color:'orange'},...]
 * @returns 
 */
function createRadialGradient(context,x1,y1,r1,x2,y2,r2,colors){
    let grd=context.createRadialGradient(x1, y1, r1, x2, y2, r2);
   
    for(let i=0;i<colors.length;i++){
        grd.addColorStop(colors[i].pos, colors[i].color);
    }
    return grd;  
}
/**
 * 创建图案对象
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-9-22
 * @param {*} context 绘制目标context对象
 * @param {*} img 图案对应的Image对象
 * @param {*} repeat 图案的平铺模式
 * @returns 
 */
function createPattern(context,img,repeat){
    let pattern=context.createPattern(img, repeat);
    return pattern;
}

/**
 * 设置阴影效果
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-9-22
 * @param {*} context 绘制目标context对象
 * @param {*} color 阴影色
 * @param {*} offsetX 阴影的x轴偏移
 * @param {*} offsetY 阴影的y轴偏移
 * @param {*} blur 阴影的模糊度
 */
function setShadowEffect(context,color,offsetX,offsetY,blur){
    context.shadowColor=color;
    context.shadowOffsetX=offsetX;
    context.shadowOffsetY=offsetY;
    context.shadowBlur=blur;
}

/**
 * 绘制平方贝塞尔曲线
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-10-12
 * @param {*} context 绘制目标context对象
 * @param {*} p1 起始点(x,y)
 * @param {*} p2 控制点(x,y)
 * @param {*} p3 终止点(x,y)
 * @param {*} isNewPath 是否开启新路径
 * @param {*} isClosePath 是否闭合新路径
 */
function drawQuadraticCurve(context,p1,p2,p3,isNewPath,isClosePath){
    if(isNewPath) context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.quadraticCurveTo(p2.x, p2.y, p3.x, p3.y);
    if(isClosePath) context.closePath();
}


/**
 * 绘制立方贝塞尔曲线
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-10-12
 * @param {*} context 绘制目标context对象
 * @param {*} p1 起始点(x,y)
 * @param {*} p2 控制点1(x,y)
 * @param {*} p3 控制点2(x,y)
 * @param {*} p4 终止点(x,y)
 * @param {*} isNewPath 是否开启新路径
 * @param {*} isClosePath 是否闭合新路径
 */
function drawBezierCurve(context,p1,p2,p3,p4,isNewPath,isClosePath){
    if(isNewPath) context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
    if(isClosePath) context.closePath();
}

/**
 * 设置剪切区域
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-10-12
 * @param {*} context 绘制目标context对象
 */
function setClip(context){
   context.clip();
}

/**
 * 获取canvas的位图图像数据
 * @author zjvivi
 * @version 1.0
 * @buildDate 2024-11-3
 * @param {*} context 获取位图所在canvas的绘图环境对象
 * @param {*} rect 获取位图的范围
 * @returns 位图图像数据，含width，height，data像素数组
 */
function getImageData(context,rect){
    let imagedata = context.getImageData(rect.x, rect.y,
        rect.w, rect.h);
    return imagedata;
}
/**
 * 将位图图像数据写回到canvas上显示
* @author zjvivi
 * @version 1.0
 * @buildDate 2024-11-3
 * @param {Object} context 需要显示位图图像数据的canvas的绘图环境对象
 * @param {*} imageData 位图图像数据，含width，height，data像素数组
 * @param {*} x 绘制的起始点x坐标
 * @param {*} y 绘制的起始点y坐标
 * @param {*} rect 可选，所要绘制的脏矩形大小
 */
function restoreImageData(context,imageData,x,y,rect){
    if(rect===undefined || rect===null)
        context.putImageData(imageData, x, y);//3参数用法
    else
        context.putImageData(imageData, x, y,rect.x,rect.y,rect.w,rect.h); //7参数用法
}





