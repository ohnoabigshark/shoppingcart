Menu.prototype = {};
Menu.constructor = Menu;
 
function Menu ( name ) {
	this.name = name;
	this.menuitems = [];
	Object.call(this);
}
 
 
Menu.prototype.addMenuItem = function ( name, abv, icon, desc ) {
	this.menuitems.push(new MenuItem(name,abv,icon,desc));
}
 
Menu.prototype.draw = function ( ) {
	var menu = document.createElement('div');
	menu.className = "menu";
	for(var i=0; i < this.menuitems.length; i++){
		menu.appendChild(this.menuitems[i].draw());
	}
	return menu;
}