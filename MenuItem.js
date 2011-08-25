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
	menuitem.className = "menuitem ";//+this.abv;
 
	var overlay = document.createElement('div');
	overlay.className = "overlay";
	var name = document.createElement('div');
	name.className = "name";
	name.appendChild(document.createTextNode(this.name));
	name.style.visibility = 'visible';
	name.style.width = '100px';
	
	document.body.appendChild(name);
	if(name.clientHeight>20){
		overlay.style.top = "71px";
	}
	document.body.removeChild(name);
	name.style.visibility = 'visible';
 	var leftButton = document.createElement('div');
	leftButton.className = "button";
	leftButton.appendChild(document.createTextNode("+ Half Dozen"));
	var rightButton = document.createElement('div');
	rightButton.className = "button";
	rightButton.appendChild(document.createTextNode("+ Dozen"));

	overlay.appendChild(name);

	overlay.appendChild(rightButton);
	overlay.appendChild(leftButton);
	 
	//onmouseover can expand to full name card
	//have to style the name on the element to set width

	menuitem.appendChild(overlay);

	return menuitem;
}