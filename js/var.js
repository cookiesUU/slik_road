let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');


let id;
let resourcesLoaded;
let totalResources; 

let scene1_text={
    x:canvas.width/20,
    y:canvas.height/6.5,    
    text:'丝路遗韵·西北风光',
    color:TEXT_COLOR['headline'],
    align:'left',
    baseline:'top',
    fontSize:FONT_SIZE['headline'],
    font:FONT_STYLE['headline']
};
let audio_control={
    left:canvas.width/50,
    top:canvas.height/1.1,
    width:50,
    height:50,
    isBgmPlay:1,
    loop:true,
    volume:0.3
}
let scene2_tips_text={
    x:canvas.width/1.4,
    y:canvas.height/3.2,  
    text:'车辆所在的地标点击回车',
    color:TEXT_COLOR['main_body'],
    fontSize:FONT_SIZE['main_body'],
    font:FONT_STYLE['main_body']
};


// 键盘控制汽车精灵变量
let keys = {
    forward: false,
    backward: false,
    a: false,
    d: false
  };
//城市在地图上的位置
let cityLocation=[
    {name:"XiAn",left:945,right:990,top:585,bottom:600},
    {name:"ZhangYe",left:610,right:660,top:360,bottom:370},
    {name:"DunHuang",left:350,right:410,top:290,bottom:305}
]
let scene1Cells=[
    {left:0,top:0,width:4368,height:1614},
    {left:0,top:1614,width:4368,height:857},
    {left:0,top:2471,width:4368,height:724},
    {left:0,top:3195,width:2175,height:548},
    {left:4117,top:3641,width:251,height:105},
]
let camelCells=[
    {left:0,top:0,width:450,height:320},
    {left:450,top:0,width:450,height:320},
    {left:900,top:0,width:450,height:320},
    {left:1350,top:0,width:450,height:320},
    {left:1800,top:0,width:450,height:320},
    {left:2250,top:0,width:450,height:320},
    {left:0,top:320,width:450,height:320},
    {left:450,top:320,width:450,height:320},
    {left:900,top:320,width:450,height:320},
    {left:1350,top:320,width:450,height:320},
    {left:1800,top:320,width:450,height:320},
    {left:2250,top:320,width:450,height:320},
    {left:0,top:640,width:450,height:320},
    {left:450,top:640,width:450,height:320},
    {left:900,top:640,width:450,height:320},
    {left:1350,top:640,width:450,height:320},
    {left:1800,top:640,width:450,height:320},
    {left:2250,top:640,width:450,height:320},
    {left:0,top:960,width:450,height:320},
    {left:450,top:960,width:450,height:320},
    {left:900,top:960,width:450,height:320},
    {left:1350,top:960,width:450,height:320},
    {left:1800,top:960,width:450,height:320},
    {left:2250,top:960,width:450,height:320},

]
