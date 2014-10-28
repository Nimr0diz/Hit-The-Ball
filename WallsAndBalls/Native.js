//Global Variables
var isComputer = false;
var width = Math.min(640,$(window).width());
var height = Math.min(640,$(window).height());
var speed = 5;
var radius = 10;
var mouseSize = 30;
var borderWidth = 25;
var numberOfHoles = 10;
var holesSize = 20;
var holesFrequency = {min: 15,max: 25};

//Static Variables
var isPlaying;

var ctx;
var pos;
var vel;
var mouse;

var isCollide;
var holes;
var nextHole;

var highScore;
var startTime;
var currTime;
function init(isInfinity)
{
if(isInfinity)
{
	$("div").css({"cursor" : "none"});
}
isPlaying = isInfinity;
if(inRange(1024))
	isComputer=false;
//isComputer=false;
if(isComputer)
	$("#cont").css({"margin-left" : width*-0.5});
else
{	//Smatphones and Tablets
	console.log("abc");
	$('.Titles').css({"width": width});
	width = $(window).width();
	height = $(window).height();
	var mouseSize = 40;
	if(!inRange(640))//Only Tablets
	{
		radius = 20;
		borderWidth = 35;
		holesSize = 45;
	}
	else //Only Smartphones
	{
	
	
	}
}
var cnvs = document.getElementById("cnvs");
cnvs.width = width;
cnvs.height = height;

//Cookies And Stuff
var c = getCookie('score');
	if(c != null)
	{
		highScore = getTime(c.value);
	}
	else
	{
		highScore= new Time();
		var newC = new Cookie('score',0,7);
		newC.init();
	}

ctx = cnvs.getContext("2d");
pos = new Vector2d(width/2,height/2);
vel = new Vector2d(Math.random()-0.5,Math.random()-0.5).normalize().multiple(speed); //new Vector2d();
mouse = new Vector2d();
isCollide = false;
holes = new Array();
nextHole= Math.random()*5000+5000;

startTime = new Date();

currTime = new Time();
loop(isInfinity);
/*End Of Game*/
}

function loop(isInfinity)
{
	
	document.getElementById("time-score").innerHTML=currTime.toString();
	currTime = getTime(new Date() - startTime);
	
	
	ctx.clearRect(0,0,width,height);
	ctx.beginPath();
	ctx.lineWidth = borderWidth;
	ctx.rect(0,0,width,height);
	ctx.strokeStyle = "#A47065";
	ctx.fillStyle = "#F4ECE1";
	ctx.fill();
	ctx.stroke();
	
	
	ctx.lineWidth = 1;
	
	ctx.beginPath();
	ctx.arc(pos.x,pos.y,radius,0,2*Math.PI);
	ctx.fillStyle = "#575757";
	ctx.fill();
	
	ctx.beginPath();
	ctx.arc(mouse.x,mouse.y,mouseSize,0,2*Math.PI);
	ctx.fillStyle = "#258BE5";
	ctx.fill();
	
	if(pos.x+radius-5<=borderWidth || pos.x-radius+5>=width-borderWidth)
	{
		//alert(pos.x);
		//alert((radius+borderWidth)+"|"+(width-(radius+borderWidth)));
		vel.x = -vel.x;
	}
	if(pos.y+radius-5<=borderWidth || pos.y-radius+5>=height-borderWidth)
	{
		//alert(pos.y);
		//alert((radius+borderWidth)+"|"+(height-(radius+borderWidth)));
		vel.y = -vel.y;
	}
	var dis = Distance(mouse,pos);
	if(dis<=radius+mouseSize && !isCollide)
	{
		var tempPos = new Vector2d(pos.x,pos.y);
		var tempMouse = new Vector2d(mouse.x,mouse.y);
		var n = tempMouse.add(tempPos.negative());
		n.normalize();
		var opti = vel.dot(n);
		
		vel = n.multiple(opti).negative();
		isCollide = true;
	}
	
	if(Distance(mouse,pos)>=radius+mouseSize+5)
		isCollide = false;
	
	if(currTime.toInteger()>=nextHole)
	{
		holes.push(new Vector2d(Math.random()*width,Math.random()*height));
		var addition = Math.random()*(1000*holesFrequency['max']-1000*holesFrequency['min'])+holesFrequency['min']*1000;
		nextHole += addition;
	}
	
	for(var i=0;i<holes.length;i++)
	{
		ctx.beginPath();
		ctx.arc(holes[i].x,holes[i].y,holesSize,0,2*Math.PI);
		ctx.fillStyle = "#000000";
		ctx.fill();
		if(Distance(holes[i],pos)<= holesSize+radius)
		{
			vel.reset();
			setTimeout(function(){Blur(15,0.5)},500);
			$("div").css({"cursor" : "auto"});
			$("h2").html("Your Time: "+currTime.toString());
			$("h3").html("Best Time: "+highScore.toString());
			if(currTime.compare(highScore)== -1)
			{
				$("h3").html("Best Time: "+currTime.toString());
				highScore = getTime(currTime.toInteger());
				var newScore = new Cookie('score',highScore.toInteger(),7);
				newScore.init();
			}
			setTimeout(function(){
			$("#scoreTitles").fadeIn(300);
			},1500);
			setTimeout(function(){
			isPlaying = false;
			},2000);
			return;
		}
	}
	pos.add(vel.normalize().multiple(speed));
		setTimeout(function(){if(isInfinity){loop(true);}},8);
}

//PC Events
document.addEventListener('mousemove', function(e){ 
if(isComputer)
{
    var x = e.clientX || e.pageX; 
    var y = e.clientY || e.pageY;
	x = Math.max(Math.min(x,(document.body.clientWidth-width)/2+width),(document.body.clientWidth-width)/2);
	y = Math.min(y,height);
	mouse = new Vector2d(x-(document.body.clientWidth-width)/2,y);
}	
}, false);

document.addEventListener('click',function(e) {
	if(!isPlaying)
	{
		preperGame();
	}
});
//Mobile Events
$(document).on('touchstart',function(e) {
if(e.originalEvent.changedTouches.length==1)
	{
		var touch = e.originalEvent.changedTouches[0];
		mouse = new Vector2d(touch.screenX,touch.screenY);
	}
if(!isPlaying)	
	{
		preperGame();
	}
});
$(document).on('touchmove',function(e) {
	e.preventDefault();
	if(e.originalEvent.changedTouches.length==1)
	{
		var touch = e.originalEvent.changedTouches[0];
		mouse = new Vector2d(touch.screenX,touch.screenY);
	}
});
$(document).on('touchend',function(e) {});
