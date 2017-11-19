// send request
// initialize slider
// inititalize thumbnails
// add navigation
// add loader
// check for reusable
// +bonus: add smooth fade in/ fade out 
// +bonus create buttons on the fly










// При загрузке страницы:

// 1.ajax-запрос на картинки 
// 2.принять запрос, вырезать первые пять [0...5]
// 3. создать оболочку и список для элементов галлереи
// 4. Создать пять элементов галлереи
// 5. создать кнопки управления галлерей
// 6. создать миниатюры для этих пяти картинок



// При нажатии на кнопку даллеЖ


// 1. вырезать из запроса следующие пять картинок [5...10]
// 2. создать следующие пять элементов галлереи
// 3. создать миниатюры для этих пяти картинок

// Ограничения:

// --когда достигнут предел картинок, остановиться и ничего не создавать
// --когда грузяться следующие пять картинок, показать прелоадер


// фичи:

// проклацывание по миниатюрам больших фото
// увеличенные фото на весь экран при нажатии на большое фото


export default class Gallery {

  constructor(settings) {

    this.settings = settings;
    this.id = 0;
    this.dataAmount = settings.galleryAmount;
    this.parsedResponse=[];
    this.startOfDataSet = 0;
    this.endOfDataSet = 0;
    this.portionOfData = [];
    this.data = [];
    this.galleryWrapper = settings.container;
    this.gallery = settings.gallery;
    this.galleryList;
    this.slides;
    this.thumbsList;
    this.galleryItemToSlide = settings.galleryItemSelector;
    this.prevSlideBtn = settings.prevSlide || 'js-gallery-prev';
    this.nextSlideBtn = settings.nextSlide || 'js-gallery-next';
    this.currentSlide = 0 || settings.initialSlide;
    this.currentIndex = 0;
    this.thumbsHeight = 100;
    this.thumbsListHeight=this.thumbsHeight-10;
    this.thumbsItemWidth = 1.15 * this.thumbsHeight;
    this.thumbsWidth = 0;
    this.thumbsListWidth = 0;
    this.thumbTriggers = [];
    this.thumbsListPosition = 0;

    this.initialLoad();

  }

  initialLoad() {

    this.fetch('initial', true);  
    
   

  }

  secondaryLoad() {

    this.initiateData(true);


  }



  createCORSRequest(method, url) {

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


  }

  fetch(order, callback) {

    let self = this;

    let url = 'images.json';

    let xhr = self.createCORSRequest('GET', url);

    if (!xhr) {
      throw new Error('CORS not supported');
    }

    // Response handlers.
    xhr.onload = function() {
      let responseText = xhr.responseText;

      self.handleResponse(responseText);
        
      // console.log( self.parsedResponse);
      
      if (callback && order==='initial') {
        self.initiateData();
      } 
      
    };

    xhr.onerror = function() {

      console.log('Woops, there was an error making the request.');
    };

    xhr.send();

  }

  handleResponse(response) {


    this.parsedResponse = JSON.parse(response);

  
  }


  initiateData(secondary) {

    let status= secondary || false;
    let self = this;

    if (status) {

      self.sliceDataOnPortions(status);
      this.showData(true);

    } else {
      let items = self.parsedResponse;
      // console.log('caca');
      // console.log(items);
      let limittedArray = items.slice(0, this.dataAmount);
  
  
      limittedArray.map(function(el) {
  
        self.data.push(el);
  
      });
  
     
      self.sliceDataOnPortions();
      this.showData();
    }

  

   

  }


  sliceDataOnPortions(secondary) {
    let status=secondary || false;
    let self = this;
    let items = self.data;

    let step = 5;

    if (status) {
      // console.log(status);
      if (this.startOfDataSet < items.length - step) {
        // console.log(items.length);
        this.startOfDataSet += step;
        this.endOfDataSet = this.startOfDataSet + step;

        // console.log(self.startOfDataSet,self.endOfDataSet);

        let portionArray = items.slice(this.startOfDataSet, this.endOfDataSet);

        self.portionOfData.length=0;

        portionArray.map(function(el) {  

          self.portionOfData.push(el);

        });

      } else {

        self.portionOfData.length = 0;


      }

    } else {

      this.endOfDataSet = this.startOfDataSet + step;
      let portionArray = items.slice(this.startOfDataSet, this.endOfDataSet);

     

      portionArray.map(function(el) {

        self.portionOfData.push(el);

      });
      
    }


    // // if(secondary) { items=self.portionOfData; }
    // console.log(this.startOfDataSet, this.endOfDataSet);
    // console.log(items);


    // console.log(self.portionOfData);


  }


  
  showData(secondary) {
    let status = secondary || false;
    let self = this;

    let galleryItems = self.portionOfData;

    let galleryContainer = [].slice.call(document.querySelectorAll(this.galleryWrapper));

    galleryContainer.forEach(function(el) {


      self.fillGallery(el, galleryItems, status);


      self.addThumbs(el, galleryItems, status);

    });

  }

  fillGallery(el, data, secondary) {

    let status=secondary || false;
    let self=this;
   
    let items = data;

  

    if (!status) {
     
      let itemsAmount = items.length;

      let galleryContainer = el;
      let galleryMinHeight = el.offsetHeight;

      // console.log(el,galleryMinHeight);

      let gallery = document.createElement('div');

      gallery.classList.add('gallery', 'js-gallery');
      gallery.style.minHeight = (galleryMinHeight - this.thumbsHeight) + 'px';



      galleryContainer.appendChild(gallery);


      this.thumbsWidth = gallery.offsetWidth;


      let galleryList = document.createElement('ul');

      galleryList.classList.add('gallery__list', 'js-gallery-list');
      galleryList.style.minHeight = (galleryMinHeight - this.thumbsHeight) + 'px';

      self.galleryList=galleryList;


      


      // let slidesNodeList = self.galleryList.childNodes;

      // console.log(slidesNodeList);
  
      // let slides = [].slice.call(slidesNodeList);

      // // console.log(slides);
      // self.slides=slides;

      // // console.log(slides);
  
      // let firstSlides = slides.filter(function(el) {
  
      //   if (el.getAttribute('id') === 'slide1') return el;
  
      // });
  
  
      // // console.log(firstSlides);
  
      // firstSlides.forEach(function(el) {
  
      //   el.classList.add('is-visible');
  
      // });
















      // this.addBtnToGallery(galleryContainer);

      this.thumbsListWidth = this.thumbsItemWidth * (itemsAmount + 1);

      this.addItemsToGallery(galleryList, items);

      // console.log(galleryList, items);

      gallery.appendChild(galleryList);
      
      this.navigation(galleryContainer, this.galleryList);
    
    } else {

      // console.log(self.galleryList);
      self.addItemsToGallery(self.galleryList, items);

      // self.navigation(el, this.galleryList, status);

    }

 

  }




  addItemsToGallery(list, items) {

    // console.log(list);
    let galleryList = list;
    let data = items;
    let dataLength = data.length;
    let galleryMaxWidth = this.thumbsWidth;


  
    for (let j = 0; j < dataLength; j++) {

      let galleryItem = document.createElement('li');
      galleryItem.classList.add('gallery__item', 'js-gallery-item');

      let galleryItemID = 'slide' + data[j].id;
      galleryItem.setAttribute('id', galleryItemID);

      galleryItem.style.maxWidth = galleryMaxWidth + 'px';

      galleryItem.innerHTML = '<img src="' + data[j].url + '" class="gallery__img"> ';

      galleryList.appendChild(galleryItem);

    }


  }







  navigation(galleryContainer, galleryList, secondary) {

    let status= secondary || false;
    let self = this;
    let thisGalleryWrapper = galleryContainer;
    let thisGalleryList = galleryList;
    let prevBtn, nextBtn; 
    // let slides=self.slides;

    let thisGalleryChildren = [].slice.call(thisGalleryWrapper.children);

    // console.log(thisGalleryChildren);

    // console.log(status);

    if ((self.prevSlideBtn === 'js-gallery-prev') && (self.nextSlideBtn === 'js-gallery-next')) {

      thisGalleryWrapper.classList.add('add-controllers');

      prevBtn = document.createElement('div');
      prevBtn.classList.add('control-btn', 'control-btn__left', 'js-gallery-prev');

      prevBtn.innerHTML = '<button class="icon-btn icon-btn_left"></button>';


      nextBtn = document.createElement('div');
      nextBtn.classList.add('control-btn', 'control-btn__right', 'js-gallery-next');

      nextBtn.innerHTML = '<button class="icon-btn icon-btn_right"></button>';


      thisGalleryWrapper.appendChild(prevBtn);
      thisGalleryWrapper.appendChild(nextBtn);

    } else {

      nextBtn = thisGalleryChildren.filter(function(el) {

        if (el.classList.contains(self.nextSlideBtn)) { return el; }

      });


      // console.log(nextSlideButton);


      prevBtn = thisGalleryChildren.filter(function(el) {

        if (el.classList.contains(self.prevSlideBtn)) { return el; }

      });


    }


    let slidesNodeList = thisGalleryList.childNodes;
    // console.log(thisGalleryList);

    let slides = [].slice.call(slidesNodeList);

    self.slides=slides;

    let firstSlides = slides.filter(function(el) {

      if (el.getAttribute('id') === 'slide1') return el;

    });


    // console.log(firstSlides);

    firstSlides.forEach(function(el) {

      el.classList.add('is-visible');

    });

    // console.log(slides, this.galleryList.childNodes);

    this.nextSlide(self.slides, nextBtn, thisGalleryList);

    this.prevSlide(self.slides, prevBtn, thisGalleryList);





  }



  nextSlide(allSlides, nextBtn, galleryList) {
    let self = this;
  
    let nextSlideBtn = nextBtn;
    let slides = allSlides;


    let currentSlide = slides.filter(function(el) {

      if (el.classList.contains('is-visible')) { return el; }

    });

    currentSlide.forEach(function(element, index, array) {


      self.currentIndex = slides.indexOf(array[index]);

      // console.log(slides,currentSlide,self.currentIndex);


      nextSlideBtn.forEach(function(e) {

        // console.log(slides,currentSlide);

        e.addEventListener('click', function() {
          // let items = self.portionOfData;

          // let itemsLength = items.length;
          // let list = galleryList;

          // self.startOfDataSet += 5;
          self.secondaryLoad();
          // self.sliceDataOnPortions(self.portionOfData, 5);
          // self.addItemsToGallery(list, items, itemsLength);


          console.log(self.currentIndex);
          slides[self.currentIndex].classList.toggle('is-visible');

          self.currentIndex = (self.currentIndex + 1) % slides.length;

          slides[self.currentIndex].classList.toggle('is-visible');

          // console.log(self.currentIndex);
          self.changeThumbnails();
        });



      });


    });
  }

  prevSlide(allSlides, prevBtn, galleryList) {

    let self = this;
    let slides = allSlides;
    let lastSlide = slides.length - 1;
    let list = galleryList;
    let prevSlideBtn = prevBtn;


    let currentSlider = slides.filter(function(el) {

      if (el.classList.contains('is-visible')) { return el; }

    });



    currentSlider.forEach(function(element, index, array) {


      self.currentIndex = slides.indexOf(array[index]);


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
          self.changeThumbnails();
        });

      });

    });
  }

  addThumbs(galleryContainer, galleryItems, secondary) {

    let self = this;
    let status=secondary || false;
    let data = galleryItems;
    let container = galleryContainer;


    let thumbsUrl = data.map(function(el) {

      return el.thumbnailUrl;

    });

    if (!status) {

      let thumbsHTML = document.createElement('div');
      
      thumbsHTML.style.minHeight = self.thumbsHeight + 'px';
      thumbsHTML.classList.add('g-thumbnails');
      
      
      let thumbsList = document.createElement('ul');
      let thumbsListWidth = (this.thumbsListWidth);
      thumbsList.style.width = thumbsListWidth + 'px';
      
      let thumbsListHeight =  self.thumbsListHeight;
      thumbsList.style.height = thumbsListHeight + 'px';
      
      thumbsList.classList.add('g-thumbnails__list');
      
      self.thumbsList=thumbsList;

      // self.thumbsListHeight=thumbsListHeight;


      this.thumbsListPosition = self.currentIndex * self.thumbsItemWidth + 5;
      
      self.addThumbsItem(thumbsUrl, self.thumbsList, self.thumbsListHeight);

      thumbsHTML.appendChild(thumbsList);
    
      // console.log(container);
      container.appendChild(thumbsHTML);


      this.moveThumbnails(thumbsList, self.currentIndex);
      
      this.toggleThumbs();



    } else {

      self.addThumbsItem(thumbsUrl, self.thumbsList, self.thumbsListHeight);
      
      this.moveThumbnails(self.thumbsList,self.currentIndex);
      
      this.toggleThumbs();

    }
   
  }


  addThumbsItem(URLs,list,height) {

    let self=this;
    let thumbs=URLs;
    let data=self.portionOfData;
    let thumbsList=list;
    let thumbsHeight=height;
    // console.log(thumbs, data, height);

  
    for (let i = 0; i < data.length; i++) {
      
      let thumbsHTMLItem = document.createElement('li');
      
      let thumbsHTMLItemWidth = (this.thumbsItemWidth);
      thumbsHTMLItem.style.width = thumbsHTMLItemWidth + 'px';
      thumbsHTMLItem.style.height = thumbsHeight + 'px';
      
      
      // let thumbsHTMLItemPosition = self.currentIndex * thumbsHTMLItemWidth;
      
      
      thumbsHTMLItem.classList.add('g-thumbnails__item');
      
      
      let thumbsHTMLItemWrap = document.createElement('div');
      thumbsHTMLItemWrap.setAttribute('data-thumb', data[i].id);
      thumbsHTMLItemWrap.classList.add('g-thumbnails__item-wrap', 'js-thumb-slide');
      
    
      
      self.thumbTriggers.push(thumbsHTMLItemWrap);
      
      thumbsHTMLItemWrap.innerHTML = '<img src="' + thumbs[i] + '" class="g-thumbnails__img"' +
              ' style="max-width: 100%;">';
      
      
      thumbsHTMLItem.appendChild(thumbsHTMLItemWrap);
      
      thumbsList.appendChild(thumbsHTMLItem);
      
    }

  }


  toggleThumbs() {


    let self = this;

    let thumbTrigger = self.thumbTriggers;

    // console.log(thumbTriggersList);

    thumbTrigger.forEach(function(el) {


      el.addEventListener('click', function(event) {


        let triggerSiblingSlides = el.closest('.g-thumbnails').previousSibling.childNodes;

        // console.log(triggerSiblingSlides);

        let slides = triggerSiblingSlides[0].childNodes;

        let indexToTrigger = +event.currentTarget.getAttribute('data-thumb');

        slides[self.currentIndex].classList.toggle('is-visible');

        self.currentIndex = indexToTrigger;


        self.changeThumbnails();


        slides[self.currentIndex].classList.toggle('is-visible');


        // console.log(self.currentIndex);

      });
    });

  }


  changeThumbnails(thumbs) {

    let self = this;

    let thumbTrigger = self.thumbTriggers;
    let index = self.currentIndex;

    let thumbTriggersList = thumbTrigger[0].closest('.g-thumbnails__list');

    self.moveThumbnails(thumbTriggersList, self.currentIndex);


    thumbTrigger.forEach(function(el) {

      el.classList.remove('is-active');

      let thumbDataAttr = +el.getAttribute('data-thumb');

      // console.log(thumbDataAttr);

      if (thumbDataAttr === index) {

        el.classList.toggle('is-active');
      }


    });


  }

  moveThumbnails(thumbs, index) {

    let self = this;

    let left = index * self.thumbsItemWidth + 5;

    let totalWidth = thumbs.offsetWidth;
    let visibleWidth = self.thumbsWidth;
    let stopPoint = totalWidth - visibleWidth;

    // console.log(left,totalWidth,visibleWidth,stopPoint);

    if (left >= stopPoint) {

      left = stopPoint;
    }

    let positionLeft = 'calc( -' + left + 'px' + ' + 15px)';

    thumbs.style.left = positionLeft;

  }


  addLoader() {

  }

  fullScreenMode() {



  }


}
