function Cookie(name,value,exdate) {
	this.name = name;
	this.value = value;
	this.exdate = exdate;
}
Cookie.prototype.init = function() {
	var d = new Date();
	d.setTime(d.getTime()+(this.exdate*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = this.name + "=" + this.value + "; " + expires;
}

function getCookie(name) {
	var cname = name + "=";
	var ca = document.cookie.split(';');
	var value;
	var cookie;
	for(var i=0; i<ca.length; i++) 
  	{
  		var c = ca[i].trim();
  		if (c.indexOf(cname)==0)
		{
			value = c.substring(cname.length,c.length);
			cookie = new Cookie(name,value,7);
			return cookie;
		}
  	}

	return null;
}

function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = new String();
    for (var i = 1 ; i <= theCookies.length; i++) {
        alert( i + ' ' + theCookies[i-1]);
    }
}

Cookie.prototype.toString = function() {
	return this.name+"="+this.value+" ("+this.exdate+" days)";

}