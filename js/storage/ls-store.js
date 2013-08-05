var LocalStorageStore = function(successCallback, errorCallback) {
	var registerURL='http://www.modusdigital.co.uk/uel/test-register.php',
			profileUpdate='http://www.modusdigital.co.uk/uel/test-profile.php',
			loginURL='http://www.modusdigital.co.uk/uel/test-login.php',
			newsURL='http://www.campuscloud.co.uk/json-feeds/news.php';
			linksURL='http://www.modusdigital.co.uk/uel/test-links.php';
	
	this.LoginCheck = function(callback) {
		var profile = JSON.parse(window.localStorage.getItem("profile"));
		
		return true;
		if (profile[0].loggedin==0) {
			//app.showAlert("Login", "Screen");
			return false;
		} else {
			return true;
		}
		
	}
	
	this.Register = function(callback) {
		var profile = JSON.parse(window.localStorage.getItem("profile"));
		profile[0].email = $('#email').val();
		profile[0].password = $('#pass').val();
		profile[0].location = $('#location').val();
		profile[0].priv = ($('#private').is(':checked') ? 1 : 0);
		profile[0].linkedin = $('#linkedin').val();
		profile[0].twitter = $('#twitter').val();
		//app.showAlert(JSON.stringify(profile), "");
		
		$.ajax({
			type: "GET",
			url: registerURL,
			dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
			data: { objson: JSON.stringify(profile), appID: 7 },
			success:function(json) {
				if (json.loggedin==1) {
					profile[0].loggedin = 1;
				} else {
					profile[0].loggedin = 0;
					app.showAlert("login or password are empty, please try again.", "Register failed");
				}
				window.localStorage.setItem("profile", JSON.stringify(profile));
				
				// check if login / password are correct
				if (profile[0].loggedin==1) { app.route(); }
			},
			error:function() {
				app.showAlert("Internet access is required to login.", "Login failed");
			}
		});
	}
	
	this.Profile = function(callback) {
		var profile = JSON.parse(window.localStorage.getItem("profile"));
		
		// add new value to object if profile is private
		// required to use 'if' / Handlebars.js
		if (profile[0].priv===1) {
			profile[0].PrivateProfile=1;
		}
		return profile[0];
	}
	
	this.UpdateProfile = function(callback) {
		var profile = JSON.parse(window.localStorage.getItem("profile"));
		profile[0].email = $('#email').val();
		profile[0].password = $('#pass').val();
		profile[0].location = $('#location').val();
		profile[0].priv = ($('#private').is(':checked') ? 1 : 0);
		profile[0].linkedin = $('#linkedin').val();
		profile[0].twitter = $('#twitter').val();
		
		$.ajax({
			type: "GET",
			url: profileUpdate,
			dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
			data: { objson: JSON.stringify(profile), appID: 7 },
			success:function(json) {
				if (json.success==1) {
					window.localStorage.setItem("profile", JSON.stringify(profile));
					app.showAlert("success", "Profile update");
				} else {
					app.showAlert("failed", "Profile update");
				}
				
				// check if login / password are correct
				//if (profile[0].loggedin==1) { app.route(); }
			},
			error:function() {
				app.showAlert("Internet access is required to save changes.", "Profile Update");
			}
		});
	}
	
	this.Login = function(callback) {
		var profile = JSON.parse(window.localStorage.getItem("profile"));
		
		//app.showAlert(JSON.stringify(profile), "");
		profile[0].email = $('#emailLogin').val();
		profile[0].password = $('#passLogin').val();
		//app.showAlert(JSON.stringify(profile), "");
		
		$.ajax({
			type: "GET",
			url: loginURL,
			dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
			data: { objson: JSON.stringify(profile), appID: 7 },
			success:function(json) {
				//app.showAlert(JSON.stringify(json), "");
				if (json.loggedin==1) {
					profile[0].loggedin = 1;
					//app.showAlert("", "Login success");
				} else {
					profile[0].loggedin = 0;
					app.showAlert("Login or password are incorrect.", "Login failed");
				}
				window.localStorage.setItem("profile", JSON.stringify(profile));
				
				// check if login / password are correct
				if (profile[0].loggedin==1) { app.route(); }
			},
			error:function() {
				app.showAlert("Internet access is required to login.", "Login failed");
			}
		});
	}
	
	this.GetLinks = function(callback) {
		var links = JSON.parse(window.localStorage.getItem("links"));
		
		$.ajax({
			type: "GET",
			url: linksURL,
			dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
			data: { LN: links[0].version, appID: 7 },
			success:function(json) {
				if (json[0].version>links[0].version) {
					// get and save new items
					links=json;
					window.localStorage.setItem("links", JSON.stringify(links));
				} else {
					// do nothing, up to date
				}
				var temp=[];
				for(i in links){ 
					if (i!=0)
						temp[i-1]=links[i];
				}
				links=temp;
				
				callLater(callback, links);
			},
			error:function() {
				app.showAlert("Internet access is required to get new items.", "News / Events");
			}
		});
	}
	
	this.GetNews = function(callback) {
		//app.showAlert("Get News", "");
		var news = JSON.parse(window.localStorage.getItem("news"));
		//app.showAlert(JSON.stringify(news), "");
		
		$.ajax({
			type: "GET",
			url: newsURL,
			dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
			data: { LN: news[0].version, appID: 7 },
			success:function(json) {
				if (json[0].version>news[0].version) {
					// get and save new items
					news=json;
					window.localStorage.setItem("news", JSON.stringify(news));
				} else {
					// do nothing, up to date
				}
				callLater(callback);
			},
			error:function() {
				app.showAlert("Internet access is required to get new items.", "News / Events");
			}
		});
	}
	
	this.showNews = function(callback) {
		//app.showAlert("Show News", "");
		this.GetNews(function() {
			var news = JSON.parse(window.localStorage.getItem("news"));
			
			// remove 0 item
			var temp=[];
			for(i in news){ 
				if (i!=0)
					temp[i-1]=news[i];
			}
			news=temp;
			
			callLater(callback, news);
		});
	}
	
	this.getNewsByID = function(id, callback) {
		var news = JSON.parse(window.localStorage.getItem("news"));
		var newsItem = null;
		
		var temp=[];
		for(i in news){ 
			if (i!=0)
				temp[i-1]=news[i];
		}
		news=temp;
		//app.showAlert(JSON.stringify(news), "");
		
		for (var i=0;i<news.length;i++) {
			//app.showAlert(news[i].id, id);
			if (news[i].id == id) {
				newsItem = news[i];
				break;
			}
		}
		//app.showAlert(JSON.stringify(newsItem), "");
		callLater(callback, newsItem);
	}
	
	// Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
	// that use async data access APIs
	var callLater = function(callback, data) {
		if (callback) {
			setTimeout(function() {
				callback(data);
			});
		}
	}
	
	// clear all data
	// window.localStorage.clear();
	
	var profile = JSON.parse(window.localStorage.getItem("profile"));
	if (!profile) {
		// profile doesn't exist
		var profile = [
				{
					"id": 1,
					"loggedin": 0,
					"email": "", // wo@uel.co.uk
					"password": "", // modus
					"location": "", // Worcester
					"priv": 1,
					"linkedin":"",
					"twitter": ""
				}
			];
		window.localStorage.setItem("profile", JSON.stringify(profile));
	}
	
	var news = JSON.parse(window.localStorage.getItem("news"));
	if (!news) {
		// news doesn't exist
		var news = [
				{ "version": 0 },
				{ "id": 1, "type": "event", "title": "Title", "date": "2013-07-17 10:00:00", "description": "short description", "content": "Lipsum" }
			];
		window.localStorage.setItem("news", JSON.stringify(news));
	}
	
	var links = JSON.parse(window.localStorage.getItem("links"));
	if (!links) {
		// links doesn't exist
		var links = [
				{ "version": 0 },
				{ "url": "http://www.moduscreative.co.uk/", "name": "modus creative", "description": "modus creative, modus creative" }
			];
		window.localStorage.setItem("links", JSON.stringify(links));
	}
	//this.GetNews();
	
	callLater(successCallback);
	
}