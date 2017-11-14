



// send request
// initialize slider
// inititalize thumbnails
// add navigation
// add loader
// check for reusable
// +bonus: add smooth fade in/ fade out 


document.addEventListener('DOMContentLoaded', function(event) {

  var gallery = new Gallery({

    galleryId: '1',
    galleryAmount: '200'

  });

  // console.log(gallery);

  gallery.getData();

}); 





function Gallery(settings) {

  this.settings=settings;
  this.id=settings.galleryId;
  this.dataAmount=settings.galleryAmount;
  this.data=[];

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

    self.initiateData(responseText);


      
    self.showData(self.data);
  


  };

  xhr.onerror = function() {

    console.log('Woops, there was an error making the request.');
  };

  xhr.send();

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

  this.data = this.getArrayWithLimitedLength(1);

  this.data.push(items.slice(0,this.dataAmount));



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
  console.log(data);

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

    galleryItem.style.maxWidth=galleryMaxWidth+'px';

    galleryItem.innerHTML='<img src="'+items[j].url+'" class="gallery__img"> ';
    
    galleryList.appendChild(galleryItem);

  }

  // console.log(galleryList);


  galleryContainer.appendChild(galleryList);

 
  let slides = document.querySelectorAll('.js-gallery-item');
  let controlls;
  let currentSlide = 0;
  let slideInterval = setInterval(nextSlide,2000);

  function nextSlide() {
    slides[currentSlide].classList.toggle('is-visible');
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].classList.toggle('is-visible');
  }








 
};

