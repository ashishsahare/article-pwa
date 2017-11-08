(function() {
  'use strict';

  var app = {
    isLoading: true,
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main')
  };

  var articlesData = {};
  
  app.renderData = function(data){
	 
    if (data) {		

		data = JSON.parse(data);
	  
	    for (var i = 0; i < data.length; i++) {
			var card = document.querySelector('.cardTemplate').cloneNode(true);
		    card.classList.remove('cardTemplate');
			card.querySelector('.description').textContent = data[i].body;
			card.querySelector('.title').textContent = data[i].title;
			card.querySelector('.routes').setAttribute('href', '/article/' + i);
		    card.removeAttribute('hidden');
		    app.container.appendChild(card);
			
		}
    }
	
	
	
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  }
  
  app.saveFetchedData = function(articlesData) {
    localStorage.articlesData = JSON.stringify(articlesData);
  };
  
  var userSelection = document.getElementsByClassName('routes');

	for(let i = 0; i < userSelection.length; i++) {
	  userSelection[i].addEventListener("click", function() {
		console.log("Clicked index: " + i);
		app.getArticle();
	  })
	}

    

  app.getArticles = function() {

  	if(localStorage.articlesData){
  		app.renderData(localStorage.articlesData);
  	}else{

  		var url = 'https://jsonplaceholder.typicode.com/posts';	
    
		// Fetch the latest data.
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
		  if (request.readyState === XMLHttpRequest.DONE) {
			if (request.status === 200) {
				//console.log(request.response);
			  app.saveFetchedData(JSON.parse(request.response));
			  app.renderData(request.response);
			  
			}
		  } 
		  
		};
		request.open('GET', url);
		request.send();
  	}	
    
  };
  
  //Load Articles
  app.getArticles();

//SERVICE WORKER REGISTRATION
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

})();
