let bakCanvas = document.getElementById("bakCanvas");
let bakContext = bakCanvas.getContext("2d");
let canvases = [
    document.getElementById("canvas1"),
    document.getElementById("canvas2"),
    document.getElementById("canvas3"),
    document.getElementById("canvas4")
];
let contexts=[
    canvases[0].getContext("2d"),
    canvases[1].getContext("2d"),
    canvases[2].getContext("2d"),
    canvases[3].getContext("2d")
];
let id;
let rectButton=[
    {color:'#a28567',left:0,top:bakCanvas.height*0.08},
    {color:'#844138',left:0,top:bakCanvas.height*0.3},
    {color:'#a1b8ae',left:0,top:bakCanvas.height*0.52},
    {color:'#c4753c',left:0,top:bakCanvas.height*0.74}
];
let rectButtonText=[
    {text:'丝路印记',color:'white',fontSize:30,font:FONT_STYLE['headline']},
    {text:'文化遗珍',color:'white',fontSize:30,font:FONT_STYLE['headline']},
    {text:'秦岭四宝',color:'white',fontSize:30,font:FONT_STYLE['headline']},
    {text:'美食拼贴',color:'white',fontSize:30,font:FONT_STYLE['headline']}
]
let part1Cells=[
    {left:0,top:0,width:250,height:385},
    {left:250,top:0,width:200,height:350},
]
let dialogTips=[
    {text:'->点击此处',fillStyle:'rgb(30, 24, 17)',x:810 ,y:500,allign:'left',baseline:'top',fontSize:16,font:FONT_STYLE['main_body']},
    {text:'->继续',fillStyle:'rgb(30, 24, 17)',x:810,y:500,allign:'left',baseline:'top',fontSize:16,font:FONT_STYLE['main_body']}
]
let dialogText=[
    {x:DIALOG_TEXT_X,y:DIALOG_TEXT_Y,text:'        “吾乃张骞，昔日奉大汉天子之命，离了这长安，踏入茫茫西域，黄沙漫卷，驼铃悠悠，只为寻那通商结盟之途。彼时一路艰险，却也满心壮志。”',
        color:'rgb(30, 24, 17)',align:'left',baseline:'top',fontSize:18,font:FONT_STYLE['main_body']},
    {x:DIALOG_TEXT_X,y:DIALOG_TEXT_Y,text:'        “贫僧玄奘，自小在这长安佛寺研习佛法，深感经义难解，听闻天竺有更精深佛典，便毅然决然踏上西行路，追那佛法真义，亦是循着先辈踏出的丝路而行。”',
        color:'rgb(30, 24, 17)',align:'left',baseline:'top',fontSize:18,font:FONT_STYLE['main_body']},
    {x:DIALOG_TEXT_X,y:DIALOG_TEXT_Y,text:'        “法师此举亦是壮举，吾当年见那西域诸国风俗迥异，商贸往来渐盛，不想后世佛法因丝路愈发昌盛，长安亦成举世佛都。”',
        color:'rgb(30, 24, 17)',align:'left',baseline:'top',fontSize:18,font:FONT_STYLE['main_body']},
    {x:DIALOG_TEXT_X,y:DIALOG_TEXT_Y,text:'        “张公奠基之功不可没，若无先驱辟路，贫僧西行难矣，丝路之功，泽被万世，这长安城便是见证。”',
        color:'rgb(30, 24, 17)',align:'left',baseline:'top',fontSize:18,font:FONT_STYLE['main_body']},

]
let bgText=[
    {x:BG_TEXT_X,y:BG_TEXT_Y,text:'        西汉建元二年（前 139 年），匈奴势大，扰攘边境，长安虽繁华却难安。汉武帝欲联合大月氏抗匈，遣我率百余人出使。出陇西即遭匈奴扣押，被困十余载，然未改初心。后逃脱西行，经大宛、康居至大月氏。元朔三年（前 126 年）归汉，此行打通中原与西域信息阻隔，葡萄、苜蓿等物渐入长安，丝路贸易隐现萌芽。',
        color:'rgb(30, 24, 17)',align:'left',baseline:'top',fontSize:14,font:FONT_STYLE['main_body']},
    {x:BG_TEXT_X,y:BG_TEXT_Y,text:'        大唐贞观元年（627 年），长安佛风盛但经文讹误多。我决心西行求法，悄然离城，偷渡玉门关，穿越流沙、葱岭。贞观五年（631 年）抵天竺那烂陀寺，师从戒贤，研习经论。贞观十九年（645 年）携大量梵典归唐，于慈恩寺译经讲学。法相宗因之兴起，佛塔融合天竺风格更精巧，绘画添西域晕染技法，长安成佛教文化新中心。',
        color:'rgb(30, 24, 17)',align:'left',baseline:'top',fontSize:14,font:FONT_STYLE['main_body']},
    {x:BG_TEXT_X,y:BG_TEXT_Y,text:'        自汉至唐，丝路在隋开皇九年（589 年）全国一统后更畅，唐时长安为丝路核心。各国商旅汇聚西市，胡风弥漫，胡服、胡乐、胡舞流行。新罗、日本僧众来长安求法，佛教宗派多元发展，长安凭丝路声名远播，文化商贸盛景空前。',
        color:'rgb(30, 24, 17)',align:'left',baseline:'top',fontSize:14,font:FONT_STYLE['main_body']},
    {x:BG_TEXT_X,y:BG_TEXT_Y,text:'        长安，这座古老的都市，承载着张骞开拓丝路的坚毅无畏，见证了玄奘取经归来的智慧传承，二者皆借丝绸之路在历史长河中留下浓墨重彩，丝路如纽带，串起往昔繁华，让长安以包容之姿屹立于世界东方，其文化交流、商贸互鉴之景，永载史册，后世传颂不绝。',
        color:'rgb(30, 24, 17)',align:'left',baseline:'top',fontSize:14,font:FONT_STYLE['main_body']},

]

let part2Cells=[
    {left:0,top:0,width:432,height:432},
    {left:432,top:0,width:178,height:420},
    {left:610,top:0,width:140,height:320},
]
let part3Bg1Cells=[
    {left:0,top:0,width:924,height:542},
    {left:924,top:10,width:924,height:532},
    {left:0,top:552,width:924,height:532},
    {left:924,top:542,width:924,height:542}
]
let part3Bg2Cells=[
    {left:0,top:0,width:924,height:542},
    {left:924,top:0,width:924,height:542},
    {left:0,top:542,width:924,height:542},
    {left:924,top:542,width:924,height:542}
]

let part3CharCells=[
    {left:0,top:0,width:150,height:210},
    {left:774,top:80,width:150,height:210},
    {left:0,top:260,width:150,height:210},
    {left:774,top:332,width:150,height:210}
]
let part4Cells=[
    {left:0,top:0,width:110,height:100},
    {left:0,top:125,width:100,height:125},
    {left:0,top:270,width:155,height:150},
    {left:10,top:440,width:130,height:100},
    {left:180,top:460,width:80,height:75},
    {left:300,top:430,width:110,height:110},
    {left:460,top:410,width:130,height:130},
    {left:650,top:450,width:90,height:90},
    {left:800,top:450,width:120,height:90},
    {left:780,top:300,width:140,height:125},
    {left:740,top:125,width:160,height:140},
    {left:800,top:0,width:90,height:120},
    {left:580,top:0,width:155,height:145},
    {left:430,top:0,width:120,height:115},
    {left:285,top:0,width:120,height:90},
    {left:140,top:0,width:120,height:90},

]

let skipText={
    text:'跳过',fillStyle:'rgb(30, 24, 17)',x:810 ,y:500,allign:'left',baseline:'top',fontSize:16,font:FONT_STYLE['main_body']
}

let part2BgTexts=[
    {x:200,y:50,text:'        骆驼载乐俑是唐三彩中的经典之作。骆驼身姿高大，四肢有力，头部上扬。其背上铺有色彩绚丽且有精美图案的毛毯，毛毯上有多个乐俑，乐俑们形态各异，或弹奏乐器，或引吭高歌，生动展现了唐代西域与中原文化交流融合的场景，也体现了丝绸之路的繁荣。',
        width:650,color:'rgb(30, 24, 17)',align:'left',baseline:'top',fontSize:16,font:FONT_STYLE['main_body']},
    {x:180,y:190,text:'        仕女俑:该侍女俑身姿婀娜、面容端庄，身着色彩和谐的蓝黄彩釉服饰，双手交叠，姿态优雅。其丰腴造型体现唐代审美，反映了高超的制陶技艺，也可从侧面看出丝绸之路促进了制陶工艺的交流与发展。',
        width:650,color:'rgb(30, 24, 17)',align:'left',bajiseline:'top',fontSize:16,font:FONT_STYLE['main_body']},
    {x:150,y:400,text:'        乐伎俑：该乐伎俑专注地演奏乐器，服饰与配饰刻画精美，釉色使其栩栩如生。它反映了唐代音乐文化的繁荣，同时也从侧面体现出丝绸之路带来的文化交流，使这种音乐文化在唐三彩中得以展现。',
        width:650,color:'rgb(30, 24, 17)',align:'left',baseline:'top',fontSize:16,font:FONT_STYLE['main_body']},

]
let part2Tip={
    text:'>点击唐三彩',fillStyle:'rgb(30, 24, 17)',x:810 ,y:500,allign:'left',baseline:'top',fontSize:16,font:FONT_STYLE['main_body']
}

let part3BgTexts=[
    {x:150,y:70,text:'          大熊猫：体肥似熊，黑白毛色，黑眼圈显著。居竹林，食竹，行动缓，独居，繁殖期聚集。国宝级，为易危物种，是生态关键种。',
        width:500,color:'rgb(172, 95, 95)',align:'left',baseline:'top',fontSize:16,font:FONT_STYLE['main_body']},
    {x:250,y:150,text:'        朱鹮：大型涉禽，白色羽略沾粉，头、嘴、腿带朱红。喜湿地，食水生动物，集群栖息于高大树木，曾濒危，是湿地生态指示物种。',
        width:500,color:'rgb(75, 78, 115)',align:'left',bajiseline:'top',fontSize:16,font:FONT_STYLE['main_body']},
    {x:150,y:350,text:'        羚牛：体大如牛，毛色金黄或棕褐，角粗大弯曲。高山群居动物，夏季草甸、冬季山谷活动，食草叶枝，性暴躁。国家一级保护动物，在高山生态系统中有重要地位。',
        width:500,color:'rgb(69, 60, 35)',align:'left',baseline:'top',fontSize:16,font:FONT_STYLE['main_body']},
    {x:200,y:450,text:'        金丝猴：秦岭亚种毛色金黄，头有黑冠，耳白唇红，尾长。树栖群居，食野果枝叶，善穿梭树林。国家一级保护动物，对森林生态系统完整性意义重大。',
        width:500,color:'rgba(65, 95, 130, 0.89)',align:'left',baseline:'top',fontSize:16,font:FONT_STYLE['main_body']},
]
let part3TitleTexts=[
    {x:430,y:270,text:'春',
        color:'rgb(236, 196, 196)',align:'left',baseline:'top',fontSize:64,font:FONT_STYLE['headline']},
    {x:430,y:270,text:'夏',
        color:'rgb(255, 255, 255)',align:'left',bajiseline:'top',fontSize:64,font:FONT_STYLE['headline']},
    {x:430,y:270,text:'秋',
        color:'rgb(140, 130, 95)',align:'left',baseline:'top',fontSize:64,font:FONT_STYLE['headline']},
    {x:430,y:270,text:'冬',
        color:'rgba(79, 128, 183, 0.89)',align:'left',baseline:'top',fontSize:64,font:FONT_STYLE['headline']},
]
