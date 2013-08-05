var News = function() {
	
	this.initialize = function() {
		this.el = $('<div/>');
		//this.showNews();
		//app.MainPage = true;
	};
	
	this.showNews = function(news) {
		this.el.html(News.showNewsTPL(news));
		return this;
	};
	
	this.showNewsItem = function(newsItem) {
		this.el.html(News.showItemTPL(newsItem));
		return this;
	};
	
	this.initialize();
}

News.showNewsTPL = Handlebars.compile($("#news-list-tpl").html());
News.showItemTPL = Handlebars.compile($("#news-item-tpl").html());