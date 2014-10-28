function Distance(v1,v2)
{
return Math.sqrt( Math.pow(v1.x-v2.x,2) + Math.pow(v1.y-v2.y,2) );
}

function Blur(size,time)
{
 var filterVal = 'blur(' + size + 'px)';
     $("#realGame")
         .css('filter', filterVal)
         .css('webkitFilter', filterVal)
         .css('mozFilter', filterVal)
         .css('oFilter', filterVal)
         .css('msFilter', filterVal)
         .css('transition', 'all '+ time +'s ease-out')
         .css('-webkit-transition', 'all '+ time +'s ease-out')
         .css('-moz-transition', 'all '+ time +'s ease-out')
         .css('-o-transition', 'all '+ time +'s ease-out');
}

function inRange(max)
{
	return ($(window).width()<=max && Math.abs(window.orientation)==90) || ($(window).height()<=max && Math.abs(window.orientation-90)==90);
}

function preperGame()
{
	$("div").css({"cursor" : "none"});
	setTimeout(function(){Blur(0,0.5)},500);
	$("#scoreTitles").fadeOut(500);
	$("#MainMenu").fadeOut(500);
	setTimeout(function(){init(true)},600);
}