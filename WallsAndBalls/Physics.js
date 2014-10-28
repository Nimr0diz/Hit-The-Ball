/*

*/

//#-- Vector2d class --#

//#- Constructor -#
var Vector2d = function(x,y)
{
	this.x = x||0;
	this.y = y||0;
};

//#- Basic Methods -#
Vector2d.prototype = {
	reset: function()
	{
		this.x = 0;
		this.y = 0;
		return this;
	},
	
	magnitude: function()
	{
		return Math.sqrt(this.x*this.x + this.y*this.y);
	},
	
	normalize: function()
	{
		var mag = this.magnitude();
		this.x /= mag;
		this.y /= mag;
		return this;
	},
	
	dot: function(vec)
	{
		return this.x*vec.x + this.y*vec.y;
	},
	
	add: function(vec)
	{
		this.x += vec.x;
		this.y += vec.y;
		return this;
	},
	
	negative: function()
	{
		this.x = -this.x;
		this.y = -this.y;
		return this;
	},
	
	multiple: function(num)
	{
		this.x *= num;
		this.y *= num;
		return this;
	},
	
	toString: function()
	{
		return "("+this.x+","+this.y+")";
	}
};



