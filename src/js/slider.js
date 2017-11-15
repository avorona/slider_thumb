



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
  this.self.currentIndexndex=0;
  this.thumbsHeight=150;
  this.thumbsWidth=0;


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
  
  this.thumbsWidth=galleryMaxWidth;

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

 
  // console.log(thisGalleryList);

  let slides = [].slice.call(thisGalleryList.childNodes);


  // console.log(slides);



  // let firstSlides;


  // if(self.currentSlide===0) {


  //   slides.forEach(function(el,i) {

  //     firstSlides.push(i[0]);

  //   });

 
  // } else if (self.currentSlide >= 0) {



  //   firstSlides= slides.filter(function(el) {

  //     if(el.getAttribute('id')==='slide1') return el;

  //   });




  // }

  
  let firstSlides= slides.filter(function(el) {

    if(el.getAttribute('id')==='slide1') return el;

  });





  // console.log(firstSlides);

  // let currentSlide = this.currentSlide;


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

  let currentSlider=slides.filter(function(el) {

    if(el.classList.contains('is-visible')) { return el;}

  });

  currentSlider.forEach(function(element, index, array) {


    self.currentIndex=slides.indexOf(array[index]);

    // console.log(slides,currentSlide,self.currentIndex);


    nextSlideBtn.forEach(function(e) {

    // console.log(slides,currentSlide);

      e.addEventListener('click', function(event) {

        slides[self.currentIndex].classList.toggle('is-visible');

        self.currentIndex = (self.currentIndex+1)%slides.length;

        slides[self.currentIndex].classList.toggle('is-visible');

        console.log(self.self.currentIndexndex);

      });



    });


  });





   
 
  
 

};


Gallery.prototype.prevSlide = function(allSlides, prevBtn) {


  let self=this;
  let slides=allSlides;
  // let self.currentIndex= self.self.currentIndexndex;
  let lastSlider=slides.length-1;

  let prevSlideBtn=prevBtn;


  let currentSlider=slides.filter(function(el) {

    if(el.classList.contains('is-visible')) { return el;}

  });



  currentSlider.forEach(function(element, index, array) {


    self.currentIndex=slides.indexOf(array[index]);

  
    prevSlideBtn.forEach(function(el) {


      el.addEventListener('click', function(event) {

        console.log(self.currentIndex);



        console.log(slides);


        slides[self.currentIndex].classList.toggle('is-visible');

        if (self.currentIndex < 0) {

          console.log('<0');
          self.currentIndex = lastSlider;


        } else if ((self.currentIndex > 0) && (self.currentIndex < lastSlider)) {

          console.log('>0');
          self.currentIndex--;

        } else if ( self.currentIndex = lastSlide) {
          self.currentIndex=0;
        }
      
        slides[self.currentIndex].classList.toggle('is-visible');


        // console.log(self.currentIndex);

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

  thumbsHTML.style.minHeight=this.thumbsHeight+'px';
  thumbsHTML.classList.add('g-thumbnails');





  let thumbsHTMLList=document.createElement('ul');

  thumbsHTML.style.minHeight=this.thumbsHeight+'px';
  thumbsHTML.classList.add('g-thumbnails__list');


  for (let i=0; i < thumbsUrl.length; i++ ) {

    let thumbsHTMLItem=document.createElement('li');

    thumbsHTML.style.maxWidth=this.thumbsWidth+'px';
    thumbsHTML.classList.add('g-thumbnails__item');


  }




  thumbsHTML.appendChild(thumbsHTMLList);


  // console.log(container);


  container.appendChild(thumbsHTML);


};



Gallery.prototype.addLoader = function() {
  


  
};



Gallery.prototype.fullScreenMode = function() {
  


  
};
>>>>>>> origin/oopStyle
