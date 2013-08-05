var UserLogin = function(store) {
	
	this.initialize = function() {
		this.el = $('<div/>');
		this.el.on('click', '#sendLogin', store.Login);
		//this.el.on('click', '#logReg', this.slidePage(new UserRegister(app.store).registerP));
	};
	
	this.loginP = function() {
		this.el.html(UserLogin.loginTPL());
		return this;
	};
	
	this.initialize();
}

UserLogin.loginTPL = Handlebars.compile($("#login-tpl").html());