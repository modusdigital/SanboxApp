var Profile = function(store) {
	
	this.initialize = function() {
		this.el = $('<div/>');
		this.el.on('click', '#updtProfile', store.UpdateProfile);
		//app.MainPage = true;
	};
	
	this.showProfile = function() {
		var profile = store.Profile();
		
		this.el.html(Profile.showProfileTPL(profile));
		return this;
	};
	
	this.initialize();
}

Profile.showProfileTPL = Handlebars.compile($("#profile-tpl").html());