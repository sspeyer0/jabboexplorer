var services, categories;

categories = {
	"musiques": {
		"id": "musiques",
		"name": "Musiques"
	},
	"reseauxsociaux": {
		"id": "reseauxsociaux",
		"name": "Réseaux sociaux"
	},
	"messagerieinstantanee": {
		"id": "messagerieinstantanee",
		"name": "Messagerie instantanée"
	},
	"videos": {
		"id": "videos",
		"name": "Vidéos"
	},
	"vod": {
		"id": "vod",
		"name": "Vidéos à la demande"
	}
};

services = {
	"facebook": {
		"id": "facebook",
		"name":"Facebook",
		"url":"https://www.facebook.com/",
		"img": "facebook.png",
		"open": false,
		"categorie": "reseauxsociaux"
	},
	"discord": {
		"id": "discord",
		"name":"Discord",
		"url":"https://discord.com/login",
		"img": "discord.png",
		"open": false,
		"categorie": "messagerieinstantanee"
	},
	"youtube": {
		"id": "youtube",
		"name":"Youtube",
		"url":"https://www.youtube.com/",
		"img": "youtube.png",
		"open": false,
		"categorie": "videos"
	},
	"netflix": {
		"id": "netflix",
		"name":"Netflix",
		"url":"https://www.netflix.com/fr/login",
		"img": "netflix.png",
		"open": false,
		"categorie": "vod"
	},
	"deezer": {
		"id": "deezer",
		"name":"Deezer",
		"url":"https://www.deezer.com/fr/login",
		"img": "deezer.png",
		"open": false,
		"categorie": "musiques"
	},
	"twitch": {
		"id": "twitch",
		"name":"Twitch",
		"url":"https://www.twitch.tv",
		"img": "twitch.png",
		"open": false,
		"categorie": "videos"
	},
	"spotify": {
		"id": "spotify",
		"name":"Spotify",
		"url":"https://open.spotify.com",
		"img": "spotify.png",
		"open": false,
		"categorie": "musiques"
	},
	"skype": {
		"id": "skype",
		"name":"Skype",
		"url":"https://web.skype.com/",
		"img": "skype.png",
		"open": false,
		"categorie": "messagerieinstantanee"
	},
	"disney": {
		"id": "disney",
		"name":"Disney+",
		"url":"https://www.disneyplus.com/",
		"img": "disney.png",
		"open": false,
		"categorie": "vod"
	},
	"telegram": {
		"id": "telegram",
		"name":"Telegram",
		"url":"https://web.telegram.org/#/login",
		"img": "telegram.png",
		"open": false,
		"categorie": "messagerieinstantanee"
	},
	"whatsapp": {
		"id": "whatsapp",
		"name":"Whatsapp",
		"url":"https://web.whatsapp.com",
		"img": "whatsapp.png",
		"open": false,
		"categorie": "messagerieinstantanee"
	}
};

function refreshServicesList(){
	var servicesList, serviceButton, serviceCategorie;

	servicesList = document.getElementById("services-list");
	servicesList.innerHTML = "";

	Object.values(categories).forEach(categorie => {
		serviceCategorie = '<span class="categorie" id="'+categorie.id+'">'+categorie.name+'</span>';
		servicesList.insertAdjacentHTML('beforeend', serviceCategorie);

		Object.values(services).forEach(service => {
			if(service.open == false && service.categorie == categorie.id){
				serviceButton = '<img class="icon" src="imgs/services/'+service.img+'" onclick="addService(\''+service.id+'\')">';
		  		servicesList.insertAdjacentHTML('beforeend', serviceButton);
			} 
		});
	});

	checkEmptyCat();
}

function checkEmptyCat(){
	var openServiceInCat, totalServiceInCat;


	Object.values(categories).forEach(categorie => {
		openServiceInCat = 0;
		totalServiceInCat = 0;

		Object.values(services).forEach(service => {
			if(service.categorie == categorie.id){
				totalServiceInCat++;

				if(service.open == true){
					openServiceInCat++;
				}
			} 
		});

		if(openServiceInCat == totalServiceInCat){
			document.getElementById(categorie.id).outerHTML = "";
		}
	});
}

function openService(tabName) {
  var i, tabs;

  tabs = document.getElementsByClassName("tab");
  for (i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";

    if(tabs[i].id == tabName){
    	tabs[i].style.display = "flex";
    }
  }
}

function deleteService(serviceName){
	var i, openedServices, tabs;

	openedServices = document.getElementsByClassName("service");
	for (i = 0; i < openedServices.length; i++) {
	  if(openedServices[i].id == serviceName){
	    openedServices[i].outerHTML = "";
	  }
	}

	tabs = document.getElementsByClassName("tab");
	for (i = 0; i < tabs.length; i++) {

	  if(tabs[i].style.display == "flex" && tabs[i].id == serviceName){
	  	openService("jabbo");
	  }

	  if(tabs[i].id == serviceName){
	   tabs[i].outerHTML = "";
	  }
	}

	services[serviceName].open = false;

	refreshServicesList();	
}

function hideBanner(){
  document.getElementById("banner").outerHTML = "";
}

function addService(serviceToAdd){
	var openedServices, openedTabs, newService, newTab, url, img;

	openedServices = document.getElementById("opened-services");
	openedTabs = document.getElementById("opened-tabs");

	url = services[serviceToAdd].url;
	img = services[serviceToAdd].img;

	services[serviceToAdd].open = true;

	newService = '<div class="service" id="'+serviceToAdd+'"><div class="service-icon"><img src="imgs/services/'+img+'" onclick="openService(\''+serviceToAdd+'\')"><img src="imgs/icons/services/close.png" class="close" onclick="deleteService(\''+serviceToAdd+'\')"></div></div>';
	newTab = '<div class="tab" id="'+serviceToAdd+'"><webview class="webview-full" src="'+url+'"></webview></div>';
	openedServices.insertAdjacentHTML('afterend', newService);
	openedTabs.insertAdjacentHTML('afterend', newTab);

	openService(serviceToAdd);
	refreshServicesList();
}

openService("jabbo");
refreshServicesList();