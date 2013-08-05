var Links = function(store) {
	
	this.initialize = function() {
		this.el = $('<div/>');
		//this.showNews();
		//app.MainPage = true;
	};
	
	this.showLinks = function(links) {
		this.el.html(Links.showLinksTPL(links));
		return this;
	};
	
	this.initialize();
}

Links.showLinksTPL = Handlebars.compile($("#links-tpl").html());