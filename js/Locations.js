var Locations = function() {
	
	this.initialize = function() {
		this.el = $('<div/>');
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	};
	
	this.showLocations = function() {
		this.el.html(Locations.showLocationsTPL());
		return this;
	};
	

	function setup() {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}
	
	function onSuccess(position) {
		 
	    var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	    createMap(myLocation);
	    
	    var service = new google.maps.places.PlacesService(map); 
		service.nearbySearch(request, callback);
	}
	
	function onError() {
		var mapCenter = new google.maps.LatLng(51.507113, 0.068965);
		//console.log('Map Whooops');
		createMap(mapCenter);
	}
	
	function createMap(Sentlocation){
		map  = new google.maps.Map(document.getElementById('geoLocation'), {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: Sentlocation,
		zoom: 15
	    });
	}

	this.initialize();

}

Locations.showLocationsTPL = Handlebars.compile($("#locations-tpl").html());





