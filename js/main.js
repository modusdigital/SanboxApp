var app = {

	showAlert: function (message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	},
	
	registerEvents: function() {
		$(window).on('hashchange', $.proxy(this.route, this));
		$('body').on('mousedown', 'a', function(event) {
			$(event.target).addClass('tappable-active');
		});
		$('body').on('mouseup', 'a', function(event) {
			$(event.target).removeClass('tappable-active');
		});
	},
	
	route: function() {
		var self = this;
		var hash = window.location.hash;
		var match = window.location.hash.substring(1).split("/")
		
		//self.showAlert(match[0], "Match");
		if (self.store.LoginCheck() == false) {
			// not logged in
			switch(match[0]) {
				case '':
					/*if (self.homePage) {
						self.slidePage(self.homePage);
					} else {
						self.homePage = new UserLogin(self.store).loginP();
						self.slidePage(self.homePage);
					}*/
					self.slidePage(new UserLogin(self.store).loginP());
					break;
				case 'register':
					self.slidePage(new UserRegister(self.store).registerP());
					break;
				default:
					self.slidePage(new UserLogin(self.store).loginP());
					break;
			}
		} else {
			// logged in
			switch(match[0]) {
				case '':
					if (self.homeContent) {
						self.slideContent(self.homeContent);
					} else {
						self.slidePage(new Overview().newsEvents());
						
						self.store.showNews(function(news) {
							self.slideContent(new News().showNews(news));
						});
					}
					break;
				case 'news':
					this.store.getNewsByID(match[1], function(newsItem) {
						self.slideContent(new News().showNewsItem(newsItem));
					});
					break;
				case 'profile':
					self.slideContent(new Profile(self.store).showProfile());
					break;
				case 'links':
					self.store.GetLinks(function(links) {
						self.slideContent(new Links().showLinks(links));
					});
					break;
				case 'locations':
					self.slideContent(new Locations(self.store).showLocations(self.store));
					break;
				default:
					
					break;
			}
		}
	},
	
	slideContent: function(content) {
		var	currentContentDest,
				self = this;
		
		// If there is no current page (app just started) -> No transition: Position new page in the view port
		if (!this.homeContent) {
			$(content.el).attr('class', 'content stage-left');
			$('.contentWrap').append(content.el);
			this.currentContent = content;
			//return;
		}
		
		// Cleaning up: remove old pages that were moved out of the viewport
		$('.stage-right, .stage-left').not('.homeContent').remove();
		
		if (content === app.homeContent) {
			// Always apply a Back transition (slide from left) when we go back to the search page
			$(content.el).attr('class', 'content stage-left');
			currentContentDest = "stage-right";
		} else {
			// Forward transition (slide from right)
			$(content.el).attr('class', 'content stage-right');
			currentContentDest = "stage-left";
		}
		
		if (!this.homeContent) { this.homeContent = content; }
		$('.contentWrap').append(content.el);
		
		setTimeout(function() {
			$('.stage-center .contentWrap').removeClass('move-left').addClass('move-center');
			$(self.currentContent.el).attr('class', 'content transition ' + currentContentDest);
			$(content.el).attr('class', 'content stage-center transition');
			self.currentContent = content;
		});
	},
	
	slidePage: function(page) {
		var	currentPageDest,
				self = this;
		
		if (self.homeContent) { return; }
		
		// If there is no current page (app just started) -> No transition: Position new page in the view port
		if (!this.currentPage) {
			$(page.el).attr('class', 'page stage-center');
			$('body').append(page.el);
			this.currentPage = page;
			return;
		}
		
		// Cleaning up: remove old pages that were moved out of the viewport
		$('.stage-right, .stage-left').not('.homePage').remove();
		
		if (page === app.homePage) {
			// Always apply a Back transition (slide from left) when we go back to the search page
			$(page.el).attr('class', 'page stage-left');
			currentPageDest = "stage-right";
		} else {
			// Forward transition (slide from right)
			$(page.el).attr('class', 'page stage-right');
			currentPageDest = "stage-left";
		}
		
		$('body').append(page.el);
		
		// Wait until the new page has been added to the DOM...
		setTimeout(function() {
			// Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
			$(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
			// Slide in the new page
			$(page.el).attr('class', 'page stage-center transition');
			self.currentPage = page;
		});
	},
	
	initialize: function() {
		var self = this;
		this.registerEvents();
		this.store = new LocalStorageStore(function() {
			//self.showAlert("Username: wo@uel.co.uk, password: modus.", "Login details");
			self.route();
		});
	}

};


//app.initialize();


// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
     var ref = window.open('http://apache.org', '_blank', 'location=yes');
     ref.addEventListener('loadstart', function() { alert('start: ' + event.url); });
     ref.addEventListener('loadstop', function() { alert('stop: ' + event.url); });
     ref.addEventListener('exit', function() { alert(event.type); });
}


