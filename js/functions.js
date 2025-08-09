/**
 * 检查资源加载进度
 * 如果所有资源都加载完成，它将调用 callback 函数
 */
function judgeResourceLoad(callback){
    
    resourcesLoaded++;
    // 所有资源加载完成
    if(resourcesLoaded===totalResources){
        callback();
    }
}
function drawAudioControl(context){
    context.drawImage(bgmControl[audio_control.isBgmPlay],audio_control.left,audio_control.top,audio_control.width,audio_control.height);
}
/**
 * 处理背景音乐点击事件
 * 点击音频控制器切换背景音乐的播放状态
 * @param {MouseEvent} e - 鼠标点击事件对象
 */
function onBgmClick(e){
    let ponit=convertWindowToCanvas(canvas,{x:e.clientX,y:e.clientY});
    if(ponit.x>=audio_control.left&&ponit.x<=audio_control.left+audio_control.width&&ponit.y>=audio_control.top&&ponit.y<=audio_control.top+audio_control.height){
        if (audio_control.isBgmPlay === 1) {
            bgm.pause();  
            audio_control.isBgmPlay = 0;     // 更新状态
        } else {
            bgm.play();   
            audio_control.isBgmPlay = 1;     
        }
    }
        
}

/**
 * 获取鼠标在canvas上点击位置的百分比
 * @author liyuan
 * @version 1.0
 * @buildDate 2024-11-9
 * @param {HTMLCanvasElement} canvas - 要获取鼠标位置的canvas元素
 * @param {MouseEvent} event - 鼠标事件对象
 * @returns {Object} - 包含鼠标在canvas上的x和y坐标百分比的对象
 */
function getMousePercentage(canvas, event) {
    
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // 计算相对于canvas宽度和高度的百分比
    var xPercent = (x / canvas.width) * 100;
    var yPercent = (y / canvas.height) * 100;

    return { x: xPercent, y: yPercent };
}



