var Overview = function(store) {
	
	this.initialize = function() {
		this.el = $('<div/>');
		this.el.on('click', '.menu-btn', this.moveContent);
		//this.showNews();
	};
	
	this.newsEvents = function() {
		this.el.html(Overview.mainPageTPL());
		return this;
	};
	
	this.moveContent = function() {
		this.changelisticon;
		if ($('.stage-center .contentWrap').hasClass('move-left')) {
			$('.stage-center .contentWrap').removeClass('move-left').addClass('move-center');
		} else {
			$('.stage-center .contentWrap').removeClass('move-center').addClass('move-left');
		}
	};
	
	/*this.changelisticon = function(){
		console.log('here?');
	}*/
	
	this.initialize();
}

Overview.mainPageTPL = Handlebars.compile($("#main-page-tpl").html());