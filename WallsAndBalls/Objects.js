
var Hole = function(trigger,pos)
{
	this.trigger = trigger;
	this.pos = pos;
};

var Time = function(min,sec,mill)
{
	this.min = min || 0;
	this.sec = sec || 0;
	this.mill = mill || 0;
}

Time.prototype = {
	toString: function()
	{
		var sectxt, milltxt;
		sectxt = this.sec < 10 ? "0"+this.sec : this.sec;
		milltxt = parseInt(this.mill / 100);
		return this.min + ":" + sectxt + "." + milltxt;
	},
	
	toInteger: function()
	{
		return (this.min*60 + this.sec)*1000 + this.mill;
	},
	
	tick: function(size)
	{
		var Tick = size || 1;
		this.mill+=Tick;
		if(this.mill >= 1000)
		{
			this.mill=0;
			this.sec++;
		}
		if(this.sec == 60)
		{
			this.sec=0;
			this.min++;
		}
	},
	
	compare: function(other)
	{
		//return -1 if this bigger, 1 if other and 0 if equal;
		if(this.toInteger() > other.toInteger())
			return -1;
		if(this.toInteger() < other.toInteger())
			return 1;
		return 0;
		
	}
};

function getTime(num)
{
	var newTime = new Time();
	newTime.min = parseInt(num/60000);
	num -= newTime.min*60000;
	newTime.sec = parseInt(num/1000);
	num -= newTime.sec*1000;
	newTime.mill = num;
	
	return newTime;
}
