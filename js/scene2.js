//扩展的汽车类
class Car extends Sprite {
    constructor(name, painter, behaviors) {
      super(name, painter, behaviors); 

      // 汽车特有的属性
      this.speed = 0;              // 当前速度
      this.maxSpeed = 3;           // 最大速度
      this.acceleration = 0.05;     // 加速度
      this.friction = 0.05;        // 摩擦力
      this.rotation = 0;           // 旋转角度
      this.turnSpeed = 0.02;       // 转向速度
    }

    updateMovement(context,keys) {
      for (var i = this.behaviors.length; i > 0; --i) {
        this.behaviors[i-1].execute(this, context, keys);
     }
    }
    
};

let route=new Sprite("route",new ImagePainter(IMAGE_URL['scene2_bg']));
let car=new Car("car",new CarPainter(IMAGE_URL['scene2_sprite']),[carMove]);
let tips=new Rect();
let cityName;
let jump=false;
// 键盘按下事件
function keyDown(event) {
  switch(event.key) {
    case 'w':
      keys.forward = true;
      break;
    case 's':
      keys.backward = true;
      break;
    case 'a':
      keys.a = true;
      break;
    case 'd':
      keys.d = true;
      break;
  }

};

// 键盘抬起事件
function keyUp(event) {
  switch(event.key) {
    case 'w':
      keys.forward = false;
      break;
    case 's':
      keys.backward = false;
      break;
    case 'a':
      keys.a = false;
      break;
    case 'd':
      keys.d = false;
      break;
    case 'Enter':
    jumpInterface();
    break;
  
}
};
function jumpInterface(){
  if(car.left>cityLocation[0].left&&car.left<cityLocation[0].right&&car.top>cityLocation[0].top&&car.top<cityLocation[0].bottom){
    jump=true;
    cityName=cityLocation[0].name;
  }
  else if(car.left>cityLocation[1].left&&car.left<cityLocation[1].right&&car.top>cityLocation[1].top&&car.top<cityLocation[1].bottom){
    jump=true;
    cityName=cityLocation[1].name;
  }
  else if(car.left>cityLocation[2].left&&car.left<cityLocation[2].right&&car.top>cityLocation[2].top&&car.top<cityLocation[2].bottom){
      jump=true;
      cityName=cityLocation[2].name;
    }
    else {
      jump=false;
    }
    if(jump){
      cancelAnimationFrame(id);
      context.clearRect(0, 0, canvas.width, canvas.height);
      scene3(cityName);
    }
}

function gameloop(){
    context.clearRect(0, 0, canvas.width, canvas.height);
   
    route.paint(context);
    car.updateMovement(context,keys);
    car.paint(context);
    tips.paint(context,'white',1,0, true, 10,true,{color:'rgba(0, 0, 0, 0.5)',offsetX:5,offsetY:5,blur:10});
    tips.setText(context,scene2_tips_text);
    drawAudioControl(context);
    id=requestAnimationFrame(gameloop);
}
function scene2Init(){
    //路线图大小位置初始化
    route.width=route.painter.image.width*canvas.height/route.painter.image.height;
    route.height=canvas.height;
    route.left=canvas.width-route.width;//让路线图的右下角对准canvas的右下角
    route.top=0;
    
    //汽车大小位置初始化
    car.width=543*CAR_SCALE;
    car.height=274*CAR_SCALE;
    car.left=canvas.width*0.85;
    car.top=canvas.height*0.9;

    // 提示框大小位置初始化
    tips.setSize(scene2_tips_text.text.length*FONT_SIZE['main_body']*1.2,FONT_SIZE['main_body']*1.4);
    tips.setPos(scene2_tips_text.x,scene2_tips_text.y);
    
    id=requestAnimationFrame(gameloop);

    window.onkeydown=keyDown;
    window.onkeyup=keyUp;

}