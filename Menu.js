Menu.prototype = {};
Menu.constructor = Menu;
 
function Menu ( name ) {
	this.name = name;
	this.menuitems = [];
	Object.call(this);
}
 
Menu.prototype.getMenuItems = function ( ) {
	var items = [];
	for ( var i=0; i< this.menuitems.length; i++ ) {
		if( this.menuitems[i].qty > 0 ) {
			items.push(this.menuitems[i]);
		}
	}
	return items; //should do this without passing whole objects but this is fine for now
}

Menu.prototype.addMenuItem = function ( name, abv, icon, desc ) {
	this.menuitems.push(new MenuItem(this,name,abv,icon,desc));
}
 
Menu.prototype.updateCart = function ( ) {
	var menu = document.getElementById("menu");
	var cart = document.getElementById("cart");
	menu.removeChild(cart);
	menu.appendChild(this.drawCart());
}

Menu.prototype.draw = function ( ) {
	var menu = document.createElement('div');
	menu.className = "menu";
	menu.id = "menu";
	var items = document.createElement('div');
	items.className = "items";
	for(var i=0; i < this.menuitems.length; i++){
		items.appendChild(this.menuitems[i].draw());
	}
	
	

	menu.appendChild(items);
	menu.appendChild(this.drawCart());
	return menu;
}

//can reduce coupling here if we pass in menuitems which would make sense
Menu.prototype.drawCart = function ( ) {
	var cart = document.createElement('div');
	cart.className = "cart";
	cart.id = "cart";
	var items = this.getMenuItems();
	for ( var i = 0; i<items.length; i++) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(items[i].name+' '+items[i].qty));
		cart.appendChild(div);
	}
	return cart;
}