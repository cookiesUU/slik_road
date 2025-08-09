//定义打字机行为
let TextTypingBehavior = function(interval) {
  this.interval = interval || 1000/12;  
  this.lastUpdateTime = 0;          
};

TextTypingBehavior.prototype = {
  execute: function(sprite, context, time) {
      if (!sprite.index) {
          sprite.index = 0;  
      }
      if (time - this.lastUpdateTime > this.interval) {
          sprite.index++;  
          this.lastUpdateTime = time; 
      }
  }
};

//定义淡入行为
let fadeIn = {
  interval: 1000 / 20,
  alpha: 0,
  step: 0.025,
  lastTime: 0,
  lastAlpha: 0,

  init: function() {
    this.alpha = 0;
    this.lastTime = 0;
    this.lastAlpha = 0;
  },

  execute: function(sprite, context, time) {
    if (time - this.lastTime > this.interval) {
      this.alpha += this.step;
      context.globalAlpha = this.alpha;

      if (this.alpha >= 1) {
        this.alpha = 1;
        sprite.animating = false;
      }

      this.lastAlpha = this.alpha;
      this.lastTime = time;
    }

    context.globalAlpha = this.lastAlpha;
  }
};



// 定义摇晃行为
let ShakingBehavior = function(roDirection, centerX, centerY) {
  this.amplitude = 6;       // 振幅
  this.frequency = 0.0035;     // 频率
  this.roDirection = roDirection; // 摇晃方向
  this.centerX = centerX;    // 中心X坐标
  this.centerY = centerY;    // 中心Y坐标
  this.lastTime = 0;         
  this.interval = 1000 / 10; 
};

ShakingBehavior.prototype = {
  execute: function(sprite, context, time) {
      if ((time - this.lastTime) > this.interval) {
          // 计算水平和垂直方向的偏移量
          let offsetX = 2 * this.amplitude * Math.sin(time * this.frequency) * this.roDirection;
          let offsetY = this.amplitude * Math.cos(time * this.frequency) * this.roDirection;

          // 更新精灵的位置
            sprite.left = this.centerX - sprite.width / 2 + offsetX;
            sprite.top = this.centerY - sprite.height / 2 + offsetY;
          this.lastTime = time;
      }
  }
};

// 定义汽车移动行为
let carMove = {
    execute: function (sprite, context, keys) {
      // 加速或减速
      if (keys.forward) {
        if (sprite.speed < sprite.maxSpeed) {
          sprite.speed += sprite.acceleration;
        }
      } else if (keys.backward) {
        if (sprite.speed > -sprite.maxSpeed / 2) { 
          sprite.speed -= sprite.acceleration;
        }
      } else {
        
        if (sprite.speed > 0) {
          sprite.speed -= sprite.friction; // 正向摩擦力逐渐减速
        } else if (sprite.speed < 0) {
          sprite.speed += sprite.friction; // 倒车时的摩擦力
        }
        if (Math.abs(sprite.speed) < sprite.friction) {
          sprite.speed = 0; // 避免速度无限接近0的情况
        }
      }    
      // 控制转向
      if (keys.a) {
        sprite.rotation -= sprite.turnSpeed; // 向左转
      }
      if (keys.d) {
        sprite.rotation += sprite.turnSpeed; // 向右转
      }  
      // 根据当前速度和旋转角度更新汽车的位置
      
      sprite.left -= Math.cos(sprite.rotation) * sprite.speed;
      sprite.top -= Math.sin(sprite.rotation) * sprite.speed;
      

}
  };
  // 向右移动行为
let moveToRight = {
  V: 1.5, // 设置移动速度
  
  execute: function(sprite, context, time) {  
      sprite.left+= this.V ;
  }
};
// 骆驼动画
let runCamel = {
  lastAdvance: 0,
  PAGEFLIP_INTERVAL: 1000/4 , 

  execute: function(sprite, context, time) {
    if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
      sprite.painter.advance();
      this.lastAdvance = time;
    }
  }
};

let lessen={
  lastTime:0,
  interval:1000/30,
  minscale:0.5,//最小缩放比
  scale:0.976,
  originalWidth:undefined,
  execute:function(sprite,context,time){
    if(this.originalWidth===undefined)
      this.originalWidth=sprite.width;
    else{
    if(time-this.lastTime>this.interval){
      if(sprite.height/this.originalWidth<this.minscale)
        sprite.animating=false;
      else{
      sprite.width*=this.scale;
      sprite.height*=this.scale;
      }
      this.lastTime=time;
    }
  }
  }
}
let moveToTopLeft={
  speed:0.7,
  execute:function(sprite,context,time){
    
      sprite.left -= this.speed*5;
      sprite.top -= this.speed/1.2; 
     
  }
}

// 定义上升精灵行为
let upBehavior = function (speed) {
  this.speed = speed || 0; 
};

upBehavior.prototype = {
  lastTime: 0,
  interval: 1000 / 60, 
  execute: function (sprite, context, time) {
    if (time - this.lastTime > this.interval) {
      if(sprite.top>0)
      sprite.top -= this.speed;
      // else
      // sprite.top=0;
      this.lastTime = time;
      }  
  }
};


