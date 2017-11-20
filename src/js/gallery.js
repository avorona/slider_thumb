// send request
// initialize slider
// inititalize thumbnails
// add navigation
// add loader
// check for reusable
// +bonus: add smooth fade in/ fade out 
// +bonus create buttons on the fly






// При загрузке страницы:

// 1.ajax-запрос на картинки   ==+!+==
// 2.принять запрос, вырезать первые пять [0...5]  ==+!+==
// 3. создать оболочку и список для элементов галлереи  ==+!+==
// 4. Создать пять элементов галлереи  ==+!+==
// 5. создать кнопки управления галлерей  ==+!+==
// 6. создать миниатюры для этих пяти картинок  ==+!+==



// При нажатии на кнопку даллеЖ


// 1. вырезать из запроса следующие пять картинок [5...10]  ==+!+==
// 2. создать следующие пять элементов галлереи  ==+!+==
// 3. создать миниатюры для этих пяти картинок  ==+!+==

// Ограничения:

// --когда достигнут предел картинок, остановиться и ничего не создавать ==+!+==
// 


// фичи:

// проклацывание по миниатюрам больших фото ==+!+==
// увеличенные фото на весь экран при нажатии на большое фото
// когда грузяться следующие пять картинок, показать прелоадер




export default class Gallery {

  constructor(settings) {

    this.settings=settings;
    this.dataAmount=settings.galleryAmount;
    this.galleryWrapper=settings.container;
    this.parsedResponse=[];
    this.data=[];
    this.portionOfData=[];
    this.dataSet= {
      start:0,
      step:5,
      end: 0,
      totalLength:0
    };
    
    this.thumbnails = {

      height: 100,
      width: 0,
      itemWidth: 114,
      list:0,
      listHeight: 90,
      url:[],
      triggers: []
    };
    this.gallery= {
      width: 0,
      items: [],
      prevBtnSelector: settings.prevSlide || false,
      prevBtnNode: 0,
      nextBtnSelector: settings.nextSlide || false,
      nextBtnNode: 0
    };
    this.galleryList;
    this.currentIndex=0;
    
    
    

    this.initialLoad();

  }

  initialLoad() {

    // 1.ajax-запрос на картинки 
    // 2.принять запрос,
    //2.2. вырезать указанное количество картинок
    //2.5 отобразить первые пять [0...5]
    // 3. создать оболочку и список для элементов галлереи
    // 4. Создать пять элементов галлереи
    // 5. создать кнопки управления галлерей
    // 6. создать миниатюры для этих пяти картинок





    this.fetch(true);


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

  fetch() {

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
                
    };
    
    xhr.onerror = function() {
    
      console.log('Woops, there was an error making the request.');
    };
    
    xhr.send();
    
  }
    
  handleResponse(response) {
    
    
    this.parsedResponse = JSON.parse(response);
    
    this.initiateData();


  }
    
 

  initiateData(secondary) {
    
    let status= secondary || false;

    let self = this;
    
    if (status) {
    
      self.sliceDataOnPortions(status);
      self.showData(true);
    
    } else {



      let items = self.parsedResponse;
      // console.log(items);
      let limittedArray = items.slice(0, this.dataAmount);
      
      limittedArray.map(function(el) {
      
        self.data.push(el);
      
      });
       
      self.sliceDataOnPortions();
      self.showData();

    }
 
 
  }
  
  sliceDataOnPortions(secondary) {


    let status=secondary || false;
    let self = this;
    let items = self.data;

    let step = this.dataSet.step;
    let start=this.dataSet.start;
    let end=this.dataSet.end;

    end=start+step;
    
    self.dataSet.totalLength=end;
    // console.log(self.dataSet.totalLength);



    if (status) {
      console.log(start,items.length,step);

      if (start < items.length - step) {

        // console.log(items.length);

        start+= step;
        end = start + step;

        // console.log(start, end);

        let portionArray = items.slice(start, end);

        self.portionOfData.length=0;

        portionArray.map(function(el) {  

          self.portionOfData.push(el);

        });
      
        this.dataSet.start=start;
        this.dataSet.end=end;


      } else {

        self.portionOfData.length = 0;


      }

    } else {

 

      let portionArray = items.slice(start, end);


      portionArray.map(function(el) {

        self.portionOfData.push(el);

      });
      



    }


  }

  showData(secondary) {


    let status = secondary || false;


    let self = this;


    let galleryContainer = [].slice.call(document.querySelectorAll(this.galleryWrapper));

    galleryContainer.forEach(function(el) {


      self.fillGallery(el, status);


      self.addThumbs(el, status);

    });

  }


  fillGallery(galleryContainer, secondary) {
      
    let status=secondary || false;
    let self=this;
    let items = self.portionOfData;
    let container = galleryContainer;
       
      
    if (!status) {
           
      let itemsAmount = self.totalLength;   
      let galleryMinHeight = container.offsetHeight;
      let thumbnailsHeight=this.thumbnails.height;
      // console.log(el,galleryMinHeight);
      
      let gallery = document.createElement('div');
      
      gallery.classList.add('gallery', 'js-gallery');

    
      let galleryHeight= galleryMinHeight - thumbnailsHeight;
      gallery.style.minHeight = (galleryHeight) + 'px';
    
      container.appendChild(gallery);
      


      let galleryWidth=gallery.offsetWidth;
    
      self.gallery.width = galleryWidth;
  
      let galleryList = document.createElement('ul');
      
      galleryList.classList.add('gallery__list', 'js-gallery-list');
      galleryList.style.minHeight = (galleryHeight) + 'px';
      
      self.galleryList=galleryList;
      
      

      this.thumbnails.width = this.thumbnails.itemWidth * (itemsAmount + 1);

      
      this.addItemsToGallery(galleryList, items);
      self.showFirstItems(galleryList);
      // console.log(galleryList, items);
      
      gallery.appendChild(galleryList);
            
      this.navigation(container);
          
    } else {
      
      // console.log(self.galleryList);
      self.addItemsToGallery(self.galleryList, items);
      
  
      
    }
      
       

  }



  
  addItemsToGallery(list, items) {
    
    let self=this;

    // console.log(list);
    
    let galleryList = list;
    let data = items;
    let dataLength = data.length;
    let galleryMaxWidth = this.gallery.width;
    
    self.dataSet.totalLength+=data.length;
    
    

    for (let j = 0; j < dataLength; j++) {
    
      let galleryItem = document.createElement('li');
      galleryItem.classList.add('gallery__item', 'js-gallery-item');
    
      let galleryItemID = 'slide' + data[j].id;
      galleryItem.setAttribute('id', galleryItemID);
    
      galleryItem.style.maxWidth = galleryMaxWidth + 'px';
    
      galleryItem.innerHTML = '<img src="' + data[j].url + '" class="gallery__img"> ';
    
      galleryList.appendChild(galleryItem);
    
    }

    let slidesNodeList = list.childNodes;
    
    // console.log(slidesNodeList);
    
    let slides = [].slice.call(slidesNodeList);
    
    // console.log(slides);
    
    self.gallery.items=slides;

  }



  showFirstItems(list) {

    let self=this;

    let slides=self.gallery.items;

    let firstSlides = slides.filter(function(el) {

      if (el.getAttribute('id') === 'slide1') return el;
      

    });


    firstSlides.forEach(function(el) {

      el.classList.add('is-visible');

    });

  }
 

  navigation(galleryContainer) {

    let self = this;
    let thisGalleryWrapper = galleryContainer;
    let thisGalleryList = this.galleryList;
    let prevBtn, nextBtn; 
    
    let thisGalleryChildren = [].slice.call(thisGalleryWrapper.children);
    
    // console.log(thisGalleryChildren);
    
    // console.log(status);
    
    if ((!self.gallery.prevBtnSelector) && (!self.gallery.nextBtnSelector)) {
    
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
    
        if (el.classList.contains(self.gallery.nextBtnSelector)) { return el; }
    
      });
    
    
      // console.log(nextSlideButton);
    
    
      prevBtn = thisGalleryChildren.filter(function(el) {
    
        if (el.classList.contains(self.gallery.prevBtnSelector)) { return el; }
    
      });
    
    
    }
    

    self.gallery.prevBtnNode=prevBtn;
    self.gallery.nextBtnNode=nextBtn;
    

    
    
    this.nextSlide();
    
    this.prevSlide();
    
    
    
    
  }


  

  nextSlide() {

    let self = this;
    let nextSlideBtn = self.gallery.nextBtnNode;
   

    // console.log(slides,currentSlide,self.currentIndex);


    nextSlideBtn.forEach(function(e) {

      // console.log(slides,currentSlide);

      e.addEventListener('click', function() {
 
        let slides = self.gallery.items;
          
        console.log(self.gallery.items);
          
             
        let currentSlide = slides.filter(function(el) {
          
          if (el.classList.contains('is-visible')) { return el; }
          
        });
          
        currentSlide.forEach(function(element, index, array) {
          
          
          self.currentIndex = slides.indexOf(array[index]);

          self.secondaryLoad();

          slides[self.currentIndex].classList.toggle('is-visible');

          self.currentIndex = (self.currentIndex + 1) % slides.length;

          slides[self.currentIndex].classList.toggle('is-visible');

          // console.log(self.currentIndex);
          self.changeThumbnails();
        });



      });


    });
  }

  prevSlide() {

    let self = this;
    let slides = self.gallery.items;
    let lastSlide = slides.length - 1;
    let prevSlideBtn = self.gallery.prevBtnNode;


    let currentSlider = slides.filter(function(el) {

      if (el.classList.contains('is-visible')) { return el; }

    });



    currentSlider.forEach(function(element, index, array) {


      self.currentIndex = slides.indexOf(array[index]);


      prevSlideBtn.forEach(function(el) {


        el.addEventListener('click', function() {

          // console.log(slides);

          slides[self.currentIndex].classList.toggle('is-visible');

          if (self.currentIndex <= 0) {


            self.currentIndex = lastSlide;


          } else if ((self.currentIndex > 0) && (self.currentIndex <= lastSlide)) {


            self.currentIndex--;

          }

          slides[self.currentIndex].classList.toggle('is-visible');


          // console.log(self.currentIndex);
          self.changeThumbnails();
        });

      });

    });
  }


  addThumbs(galleryContainer, secondary) {
    
    let self = this;
    let status=secondary || false;
    let data = self.portionOfData;
    let container = galleryContainer;
    
    
    self.thumbnails.url = data.map(function(el) {
    
      return el.thumbnailUrl;
    
    });
    
    

    if (!status) {
    
      let thumbs = document.createElement('div');
          
      thumbs.style.minHeight = self.thumbsHeight + 'px';
      thumbs.classList.add('g-thumbnails');
          
          
      let thumbsList = document.createElement('ul');
      let thumbsListWidth = (self.thumbnails.width);
      thumbsList.style.width = thumbsListWidth + 'px';
          
      let thumbsListHeight =  self.thumbsListHeight;
      thumbsList.style.height = thumbsListHeight + 'px';
          
      thumbsList.classList.add('g-thumbnails__list');
          
      self.thumbnails.list=thumbsList;
          
      this.addThumbsItem( );
    
      thumbs.appendChild(thumbsList);
        
      // console.log(container);
      container.appendChild(thumbs);
    
    
      this.moveThumbnails();
          
      this.toggleThumbs();
       
    
    } else {
    
      this.addThumbsItem();
          
      this.moveThumbnails();
          
      this.toggleThumbs();
    
    }
       
  }
    

  addThumbsItem() {
    
    let self=this;
    let thumbs=self.thumbnails.url;
    let data=self.portionOfData;
    let thumbsList=self.thumbnails.list;
    let thumbsItemWidth=this.thumbnails.itemWidth;
    let thumbsHeight=self.thumbnails.listHeight;

    // console.log(thumbs, data, thumbsHeight);  
    for (let i = 0; i < data.length; i++) {
          
      let thumbsItem = document.createElement('li');
          
      thumbsItem.style.width = thumbsItemWidth + 'px';
      thumbsItem.style.height = thumbsHeight + 'px';
            
      thumbsItem.classList.add('g-thumbnails__item');
          
      let equalizer=data[i].id-1;

      let thumbsItemWrap = document.createElement('div');
      thumbsItemWrap.setAttribute('data-thumb', equalizer);
      thumbsItemWrap.classList.add('g-thumbnails__item-wrap', 'js-thumb-slide');
          
        
          
      self.thumbnails.triggers.push(thumbsItemWrap);
          
      thumbsItemWrap.innerHTML = '<img src="' + thumbs[i] + '" class="g-thumbnails__img"' +
                  ' style="max-width: 100%;">';
          
      thumbsItem.appendChild(thumbsItemWrap);
          
      thumbsList.appendChild(thumbsItem);
          
    }
    
  }

  toggleThumbs() {
    
    
    let self = this;
    
    let thumbTrigger = self.thumbnails.triggers;
    
    // console.log(thumbTriggersList);
    
    thumbTrigger.forEach(function(el) {
    
      el.addEventListener('click', function(event) {
    
    
        let triggerSiblingSlides = el.closest('.g-thumbnails').previousSibling.childNodes;
    
        console.log(triggerSiblingSlides);
    
        let slides = [].slice.call(triggerSiblingSlides[0].childNodes);
    
        console.log(slides,self.currentIndex);

        let indexToTrigger = +event.currentTarget.getAttribute('data-thumb');
    
        slides[self.currentIndex].classList.toggle('is-visible');
    
        self.currentIndex = indexToTrigger;
    
    
        self.changeThumbnails();
    
    
        slides[self.currentIndex].classList.toggle('is-visible');
      
      });
    });
    
  }


  
  changeThumbnails() {
    
    let self = this;
    let index=self.currentIndex;
    let thumbTrigger = self.thumbnails.triggers;
    
    self.moveThumbnails();
    
    
    thumbTrigger.forEach(function(el) {
    
      el.classList.remove('is-active');
    
      let thumbDataAttr = +el.getAttribute('data-thumb');
    
      // console.log(thumbDataAttr);
    
      if (thumbDataAttr === index) {
    
        el.classList.toggle('is-active');
      }
    
    
    });
    
    
  }


  moveThumbnails() {
    
    let self = this;
    let index=self.currentIndex;
    let left = index * self.thumbnails.itemWidth + 5;
    
    let totalWidth = self.thumbnails.width;
    let visibleWidth = 600;
    let stopPoint = totalWidth - visibleWidth;
    
    // console.log(left,totalWidth,visibleWidth,stopPoint);
    
    if (left >= stopPoint) {
    
      left = stopPoint;
    }
    
    let positionLeft = 'calc( -' + left + 'px' + ' + 15px)';
    
    self.thumbnails.list.style.left = positionLeft;
    
  }


}
