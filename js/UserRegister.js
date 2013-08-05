var UserRegister = function(store) {
	
	this.initialize = function() {
		this.el = $('<div/>');
		this.el.on('click', '#sendReg', store.Register);
	};
	
	this.registerP = function() {
		this.el.html(UserRegister.registerTPL());
		return this;
	};
	
	this.initialize();
}

UserRegister.registerTPL = Handlebars.compile($("#register-tpl").html());
UserRegister.updateTPL = Handlebars.compile($("#update-tpl").html());