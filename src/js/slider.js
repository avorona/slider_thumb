



// send request
// initialize slider
// inititalize thumbnails
// add navigation
// add loader
// check for reusable
// +bonus: add smooth fade in/ fade out 




document.addEventListener('DOMContentLoaded', function(event) {


  var app = {

    initialize: function(settings) {

      let gallery = new Gallery(settings);

      gallery.getData();

      if (settings.loader === true) { gallery.addLoader(); };

      if (settings.thumbs === true) { gallery.addThumbs(); };

      if (settings.fullScreenMode === true) { gallery.fullScreenMode();};

    },



  };


  app.initialize({

    galleryId: '1',
    galleryAmount: '10',
    galleryItemSelector: '.js-gallery-item',
    prevSlide: '.js-gallery-prev',
    nextSlide: '.js-gallery-next',
    // loader: true,
    thumbs: true
    // fullScreenMode: true

  });


}); 



function Gallery(settings) {

  this.settings=settings;
  this.id=settings.galleryId;
  this.dataAmount=settings.galleryAmount;
  this.data;
  this.galleryItemToSlide=settings.galleryItemSelector;
  this.prevSlideBtn=settings.prevSlide;
  this.nextSlideBtn=settings.nextSlide;
  this.currentSlide=0;

}



Gallery.prototype.getArrayWithLimitedLength = function(length) {
   
  var array = new Array();

  array.push = function() {

    if (this.length >= length) {
      this.shift();
    }
    return Array.prototype.push.apply(this,arguments);
  };

  return array;


};

Gallery.prototype.getData = function(callback) {

  let self=this;

  let url='images.json';

  let xhr = self.createCORSRequest('GET', url);

  if (!xhr) {
    throw new Error('CORS not supported');
  }

  // Response handlers.
  xhr.onload = function() {
    let responseText = xhr.responseText;

    // console.log(parsedJSON);
    self.handleResponse(responseText);
  
  };

  xhr.onerror = function() {

    console.log('Woops, there was an error making the request.');
  };

  xhr.send();

};


Gallery.prototype.handleResponse = function(response) {
  let self= this;

  self.initiateData(response);
      
  self.showData(self.data);
};



Gallery.prototype.showData = function(array) {
  let self=this;

  let galleryItems=array;
  // console.log(array);
  let galleryContainer=[].slice.call(document.querySelectorAll('.js-gallery-wrap'));


  galleryContainer.forEach(function(el) {

    
    self.fillGallery(el,galleryItems);


  });


};



/* method: User::initiatePlans()
 * parses plans from JSON representation and initiates a new Plan for
 * each of them
 */


Gallery.prototype.initiateData = function(imagesString) {
 

  var items = JSON.parse(imagesString);

  let limitedArray = this.getArrayWithLimitedLength(1);

  this.data = limitedArray.map(function(el) {return el;});

  this.data.push(items.slice(0,this.dataAmount));

  console.log(this.data);

};



Gallery.prototype.createCORSRequest = function(method,url) {


  let xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != 'undefined') {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  // console.log(xhr);
  return xhr;

};



Gallery.prototype.fillGallery = function(el,data) {


  let items=data[0];
  let itemsAmount=items.length;
  // console.log(data);

  let galleryContainer=el;

  let galleryMaxWidth=el.offsetWidth;
  // console.log(galleryMaxWidth);

  let galleryList=document.createElement('ul');
  galleryList.classList.add('gallery', 'js-gallery-list');



  // let galleryItem=document.createElement('li');
  // galleryItem.classList.add('gallery__item', 'js-gallery-item');



  for (let j=0; j<itemsAmount;j++) {

   

    let galleryItem=document.createElement('li');
    galleryItem.classList.add('gallery__item', 'js-gallery-item');
    let galleryItemID='slide'+items[j].id;
    galleryItem.setAttribute('id', galleryItemID);
    galleryItem.style.maxWidth=galleryMaxWidth+'px';

    galleryItem.innerHTML='<img src="'+items[j].url+'" class="gallery__img"> ';
    
    galleryList.appendChild(galleryItem);

  }

  // console.log(galleryList);


  galleryContainer.appendChild(galleryList);

  this.navigation();
 
};


Gallery.prototype.navigation = function() {

  let slides = document.querySelectorAll(this.galleryItemToSlide);
  let currentSlide = this.currentSlide;


  slides[currentSlide].classList.add('is-visible');


  this.nextSlide(slides);
  this.prevSlide(slides);


};





Gallery.prototype.nextSlide = function(allSlides) {

  let currentSlide=this.currentSlide;

  let nextSlideBtn=document.querySelectorAll(this.nextSlideBtn);

  nextSlideBtn.forEach(function(el) {


    el.addEventListener('click', function(event) {

      allSlides[currentSlide].classList.toggle('is-visible');
      currentSlide = (currentSlide+1)%allSlides.length;
      allSlides[currentSlide].classList.toggle('is-visible');

    });


  });
 
  
};



Gallery.prototype.prevSlide = function(allSlides) {
  
  // console.log(arguments);
  let currentSlide=this.currentSlide;
  let lastSlide=allSlides.length-1;
  let prevSlideBtn=document.querySelectorAll(this.prevSlideBtn);

  prevSlideBtn.forEach(function(el) {


    el.addEventListener('click', function(event) {

      allSlides[currentSlide].classList.toggle('is-visible');

      if (currentSlide <= 0) {

        currentSlide = lastSlide;

      } else if ( currentSlide <= lastSlide) {
        currentSlide--;
      }
      
      allSlides[currentSlide].classList.toggle('is-visible');

    });


  });

 
  
};





Gallery.prototype.addThumbs = function() {

  let self=this;

  let thumbsUrl = new Array;
 





  thumbsUrl = self.data.map(function(el) {

    return el;


  });


  console.log(thumbsUrl);



};



Gallery.prototype.addLoader = function() {
  


  
};



Gallery.prototype.fullScreenMode = function() {
  


  
};
