MenuItem.prototype = {};
MenuItem.constructor = MenuItem;
 
function MenuItem ( name, abbreviation, icon, description ) {
	this.name = name;
	this.abv = abbreviation;
	this.icon = icon || "http://placehold.it/75x75";
	this.desc = description;
	this.qty = 0;
}
 
MenuItem.prototype.increaseQty = function () {
	++this.qty;
	//this.updateQty();
}
 
MenuItem.prototype.decreaseQty = function ( ) {
	(this.qty>0)?--this.qty:this.qty=0;
	//this.updateQty();
}
 
MenuItem.prototype.setQty = function ( q ) {
	if ( !(q instanceof Number) )
		return false;
	if(q>144) {
		q = 144;
		//ordering this many? let's talk!
	}
	if(q<0) {
		q = 0;
	}
	this.qty = q;
}
 
MenuItem.prototype.startHoldInc = function ( ) {
	var that = this;
	this.intervalID = window.setInterval(function(){that.increaseQty();that.updateQty();},100);
}
 
MenuItem.prototype.startHoldDec = function ( ) {
	var that = this;
	this.intervalID = window.setInterval(function(){that.decreaseQty();that.updateQty();},100);
}
 
MenuItem.prototype.endHold = function ( ) {
	if(this.intervalID)
		window.clearInterval(this.intervalID);
}
 
MenuItem.prototype.drawText = function ( ) {
	alert(this.qty);
}
 
MenuItem.prototype.updateQty = function ( ) {
	var div = document.getElementById(this.abv);
	for(var i=0;i<div.childNodes.length;i++){
		if(div.childNodes[i].className === "qty") {
			div.childNodes[i].removeChild(div.childNodes[i].childNodes[0]);
			div.childNodes[i].appendChild(document.createTextNode(this.qty));
			return;
		}
	}
}
 
MenuItem.prototype.draw = function ( ) { 
	var that = this;
	var menuitem = document.createElement('div');
	menuitem.id = this.abv;
	menuitem.className = "menuitem";
 
	var overlay = document.createElement('div');
	overlay.className = "overlay";
	var up = document.createElement('div');
	up.className = "up";
	//up.addEventListener("click",function(){that.increaseQty();that.updateQty();});
	up.addEventListener("mousedown",function(){that.startHoldInc();});
	up.addEventListener("mouseup",function(){that.endHold();});
	var down = document.createElement('div');
	down.className = "down";
	//down.addEventListener("click",function(){that.decreaseQty();that.updateQty();});
	down.addEventListener("mousedown",function(){that.startHoldDec();});
	down.addEventListener("mouseup",function(){that.endHold();});
	overlay.appendChild(up);
	overlay.appendChild(down);
 
	
	var qty = document.createElement('div');
	qty.className = "qty";
	qty.appendChild(document.createTextNode(this.qty));
	qty.addEventListener("click",function(){that.drawText();});
 
	var content = document.createElement('div');
	content.className = "content";
	var controls = document.createElement('div');
	controls.className = "controls";
	var icon = document.createElement('div');
	icon.className = "icon";
	var name = document.createElement('div');
	name.className = "name";
	name.appendChild(document.createTextNode(this.name));
	var description = document.createElement('div');
	description.className = "description";
	description.appendChild(document.createTextNode(this.desc));
 
	content.appendChild(controls);
	content.appendChild(icon);
	content.appendChild(name);
	content.appendChild(description);
 
	menuitem.appendChild(overlay);
	menuitem.appendChild(qty);
	menuitem.appendChild(content);
 
	
	return menuitem;
}