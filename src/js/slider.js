



// send request
// initialize slider
// inititalize thumbnails
// add navigation
// add loader
// check for reusable
// +bonus: add smooth fade in/ fade out 
// +bonus create buttons on the fly



document.addEventListener('DOMContentLoaded', function(event) {


  var app = {

    initialize: function(settings) {

      let gallery = new Gallery(settings);
    
      gallery.initialize();
      
    },

    // getGallery: function(gallery) {
      
    //   gallery.getData();

    //   console.log('getGallery');
    // },

    // showGallery: function(galleryData) {

    //   let gallery = galleryData;
    //   console.log('showGallery');

    //   gallery.showData();


    // }

  };


  app.initialize({

    
    galleryAmount: '10',
    galleryItemSelector: '.js-gallery-item',
    prevSlide: 'js-gallery-prev',
    nextSlide: 'js-gallery-next',
    container: '.js-gallery-wrap',
    gallery: 'js-gallery',
 
    thumbs: true
    // loader: true,
    // fullScreenMode: true

  });


  app.initialize({

    
    galleryAmount: '100',
    galleryItemSelector: '.js-gallery-item',
    prevSlide: 'js-gallery-prev',
    nextSlide: 'js-gallery-next',
    container: '.js-gallery-wrap2',
    gallery: 'js-gallery',
 
    thumbs: true
    // loader: true,
    // fullScreenMode: true

  });


}); 



function Gallery(settings) {

  this.settings=settings;
  this.id=0;
  this.dataAmount=settings.galleryAmount;
  this.data=[];
  this.galleryWrapper=settings.container;
  this.gallery=settings.gallery;
  this.galleryItemToSlide=settings.galleryItemSelector;
  this.prevSlideBtn= 'js-gallery-prev' || settings.prevSlide;
  this.nextSlideBtn= 'js-gallery-next' || settings.nextSlide;
  this.currentSlide=0 || settings.initialSlide;
  this.currentIndex=0;
  this.thumbsHeight=100;
  this.thumbsItemWidth=1.15*this.thumbsHeight;
  this.thumbsWidth=0;
  this.thumbTriggers=[];
  this.thumbsListPosition=0;


}





Gallery.prototype.initialize = function() {
  
  this.getData();

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


Gallery.prototype.getData = function() {

  let self=this;

  let url='images.json';

  let xhr = self.createCORSRequest('GET', url);

  if (!xhr) {
    throw new Error('CORS not supported');
  }

  // Response handlers.
  xhr.onload = function() {
    let responseText = xhr.responseText;

    self.handleResponse(responseText);
    // console.log(parsedJSON);
    
  
  };

  xhr.onerror = function() {

    console.log('Woops, there was an error making the request.');
  };

  xhr.send();

};


Gallery.prototype.handleResponse = function(response) {

  let self= this;

  self.initiateData(response);

  self.showData();
   

};



Gallery.prototype.showData = function() {
  let self=this;

  let galleryItems=self.data;
  
  let galleryContainer=[].slice.call(document.querySelectorAll(this.galleryWrapper));


  galleryContainer.forEach(function(el) {

    
    self.fillGallery(el,galleryItems);

    self.addThumbs(el,galleryItems);


  });


};



/* method: User::initiateData()
 * parses data from JSON representation 
 */


Gallery.prototype.initiateData = function(imagesString) {
 
  let self=this;

  let items = JSON.parse(imagesString);



  let limittedArray = items.slice(0,this.dataAmount);

  // console.log(limittedArray);


  limittedArray.map(function(el) {

    self.data.push(el);

  });

  // console.log(self.data);

};




Gallery.prototype.fillGallery = function(el,data) {

  let galleryId=this.id;
  galleryId++;

  let items=data;
  let itemsAmount=items.length;

  let galleryContainer=el;
  let galleryMinHeight=el.offsetHeight;

  // console.log(el,galleryMinHeight);

  let gallery=document.createElement('div');
  
  gallery.classList.add('gallery', 'js-gallery');
  gallery.style.minHeight=(galleryMinHeight - this.thumbsHeight)+'px';



  galleryContainer.appendChild(gallery);


  let galleryMaxWidth=gallery.offsetWidth;
  
 

  let galleryList=document.createElement('ul');

  galleryList.classList.add('gallery__list', 'js-gallery-list');
  galleryList.style.minHeight=(galleryMinHeight- this.thumbsHeight)+'px';

  for (let j=0; j<itemsAmount;j++) {

   

    let galleryItem=document.createElement('li');
    galleryItem.classList.add('gallery__item', 'js-gallery-item');

    let galleryItemID='slide'+items[j].id;
    galleryItem.setAttribute('id', galleryItemID);

    galleryItem.style.maxWidth=galleryMaxWidth+'px';

    galleryItem.innerHTML='<img src="'+items[j].url+'" class="gallery__img"> ';
    
    galleryList.appendChild(galleryItem);

  }


  this.thumbsWidth=this.thumbsItemWidth*itemsAmount;

 
  // console.log(galleryList);



  gallery.appendChild(galleryList);


  // if (!this.prevSlide) {

  //   let prevSlideBtn=document.createElement('button');
  //       prevSlideBtn.classList.add(this.prevSlide)
  // }



  

  this.navigation(galleryContainer,galleryList);
 
};



Gallery.prototype.navigation = function(galleryContainer,galleryList) {

  let self=this;


  let thisGalleryWrapper=galleryContainer;
  let thisGalleryList=galleryList;
  // console.log(thisGalleryWrapper);

  let thisGalleryChildren=[].slice.call(thisGalleryWrapper.children);

  // console.log(thisGalleryChildren);



  
  let nextSlideButton= thisGalleryChildren.filter(function(el) {

    if(el.classList.contains(self.nextSlideBtn)) { return el; }

  });


  // console.log(nextSlideButton);


  let prevSlideButton= thisGalleryChildren.filter(function(el) {

    if(el.classList.contains(self.prevSlideBtn)) { return el; }

  });

  // console.log(prevSlideButton);

  let gallery = thisGalleryChildren.filter(function(el) {

    if(el.classList.contains(self.gallery)) {return el;}

  });

  let slidesNodeList=thisGalleryList.childNodes;
  // console.log(thisGalleryList);

  let slides = [].slice.call(slidesNodeList);


  let firstSlides= slides.filter(function(el) {

    if(el.getAttribute('id')==='slide1') return el;

  });


  // console.log(firstSlides);

  firstSlides.forEach(function(el) {

    el.classList.add('is-visible');

  });
 


  this.nextSlide(slides,nextSlideButton);

  this.prevSlide(slides,prevSlideButton);

 


};



Gallery.prototype.nextSlide = function(allSlides,nextBtn) {

  let nextSlideBtn=nextBtn;
  let slides=allSlides;
  let self=this; 
  // let self.currentIndex= self.self.currentIndexndex;
  // let currentSlide=self.currentSlide;

  let currentSlide=slides.filter(function(el) {

    if(el.classList.contains('is-visible')) { return el;}

  });

  currentSlide.forEach(function(element, index, array) {


    self.currentIndex=slides.indexOf(array[index]);

    // console.log(slides,currentSlide,self.currentIndex);


    nextSlideBtn.forEach(function(e) {

    // console.log(slides,currentSlide);

      e.addEventListener('click', function(event) {

        slides[self.currentIndex].classList.toggle('is-visible');

        self.currentIndex = (self.currentIndex+1)%slides.length;

        slides[self.currentIndex].classList.toggle('is-visible');

        console.log(self.currentIndex);

      });



    });


  });

 

};


Gallery.prototype.prevSlide = function(allSlides, prevBtn) {


  let self=this;
  let slides=allSlides;
  // let self.currentIndex= self.self.currentIndexndex;
  let lastSlide=slides.length-1;

  let prevSlideBtn=prevBtn;


  let currentSlider=slides.filter(function(el) {

    if(el.classList.contains('is-visible')) { return el;}

  });



  currentSlider.forEach(function(element, index, array) {


    self.currentIndex=slides.indexOf(array[index]);

  
    prevSlideBtn.forEach(function(el) {


      el.addEventListener('click', function(event) {

        
        // console.log(slides);


        slides[self.currentIndex].classList.toggle('is-visible');

        if (self.currentIndex <= 0) {

        
          self.currentIndex = lastSlide;


        } else if ((self.currentIndex > 0) && (self.currentIndex <= lastSlide)) {

         
          self.currentIndex--;

        } 
      
        slides[self.currentIndex].classList.toggle('is-visible');


        console.log(self.currentIndex);

      });

    });

  });
  
};

 





Gallery.prototype.addThumbs = function(galleryContainer, galleryItems) {

  let self=this;
  // let thumbsUrl = [];
  let data= galleryItems;
  let container=galleryContainer;

  // console.log(data);


  let thumbsUrl = data.map(function(el) {

    return el.thumbnailUrl;

  });


  let thumbsHTML=document.createElement('div');

  thumbsHTML.style.minHeight=self.thumbsHeight+'px';
  thumbsHTML.classList.add('g-thumbnails');

 

  let thumbsHTMLList=document.createElement('ul');
  let thumbsHTMLListWidth=(this.thumbsWidth);
  thumbsHTMLList.style.width=thumbsHTMLListWidth+'px';

  let thumbsHTMLListHeight=(self.thumbsHeight-10);
  thumbsHTMLList.style.height=thumbsHTMLListHeight+'px';
 
  thumbsHTMLList.classList.add('g-thumbnails__list');


  this.thumbsListPosition=self.currentIndex*self.thumbsItemWidth+5;

  for (let i=0; i < thumbsUrl.length; i++ ) {

    let thumbsHTMLItem=document.createElement('li');

    let thumbsHTMLItemWidth=(this.thumbsItemWidth);
    thumbsHTMLItem.style.width=thumbsHTMLItemWidth+'px';
    thumbsHTMLItem.style.height=thumbsHTMLListHeight+'px';
    let thumbsHTMLItemPosition=self.currentIndex*thumbsHTMLItemWidth;

    thumbsHTMLItem.classList.add('g-thumbnails__item');


    let thumbsHTMLItemWrap=document.createElement('div');
    thumbsHTMLItemWrap.setAttribute('data-thumb', i);
    thumbsHTMLItemWrap.classList.add('g-thumbnails__item-wrap','js-thumb-slide');


    
    self.thumbTriggers.push(thumbsHTMLItemWrap);

    thumbsHTMLItemWrap.innerHTML='<img src="'+thumbsUrl[i]+'" class="g-thumbnails__img"'+
      ' style="max-width: 100%;">';


    thumbsHTMLItem.appendChild(thumbsHTMLItemWrap);

    thumbsHTMLList.appendChild(thumbsHTMLItem);




  }

  // console.log(self.thumbTriggers);


  thumbsHTML.appendChild(thumbsHTMLList);

  // console.log(container);
  container.appendChild(thumbsHTML);

  this.moveThumbnails(thumbsHTMLList,self.currentIndex);

  this.toggleThumbs();

};



Gallery.prototype.toggleThumbs = function() {


  let self=this;
  
  let thumbTrigger=self.thumbTriggers;

  let thumbTriggersList= thumbTrigger[0].closest('.g-thumbnails__list');

  // console.log(thumbTriggersList);

  thumbTrigger.forEach(function(el) {


    el.addEventListener('click', function(event) {


      thumbTrigger.forEach(function(element) {
        element.classList.remove('is-active');
      });


      el.classList.toggle('is-active');


      let triggerSiblingSlides = el.closest('.g-thumbnails').previousSibling.childNodes;

      // console.log(triggerSiblingSlides);

      let slides = triggerSiblingSlides[0].childNodes;

      let indexToTrigger= +event.currentTarget.getAttribute('data-thumb');

      slides[self.currentIndex].classList.toggle('is-visible');

      self.currentIndex=indexToTrigger;

      self.moveThumbnails(thumbTriggersList,self.currentIndex);

      slides[self.currentIndex].classList.toggle('is-visible');


      // console.log(self.currentIndex);
    });
  });



};



Gallery.prototype.moveThumbnails = function(thumbs,index) {
  
  let self=this;

  let left=index*self.thumbsItemWidth+5;  

  let positionLeft='calc( -'+left+'px'+' + 15px)';


  // console.log(thumbs, this.thumbsListPosition, positionLeft);


  thumbs.style.left=positionLeft;

};



Gallery.prototype.addLoader = function() {
  


  
};



Gallery.prototype.fullScreenMode = function() {
  


  
};

