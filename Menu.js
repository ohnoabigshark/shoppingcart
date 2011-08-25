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
	var items = document.createElement('div');
	items.className = "items";
	for(var i=0; i < this.menuitems.length; i++){
		items.appendChild(this.menuitems[i].draw());
		// var t = document.createElement('div');
		// t.className = "tt";
		// items.appendChild(t);
	}
	var cart = document.createElement('div');
	cart.className = "cart";

	menu.appendChild(items);
	menu.appendChild(cart);
	return menu;
}