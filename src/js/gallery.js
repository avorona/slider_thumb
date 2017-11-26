export default class Gallery {

  constructor(settings) {

    this.settings=settings;
    this.dataAmount=settings.galleryAmount;
    this.galleryWrapper=settings.container;
    this.galleryItemSelector = settings.galleryItemSelector;
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
      total:[],
      prevBtnSelector: settings.prevSlide || false,
      prevBtnNode: 0,
      nextBtnSelector: settings.nextSlide || false,
      nextBtnNode: 0
    };
    this.popup={
      wrap:[],
      imgSrc: '',
      content: []
    };

    this.galleryList;
    this.currentIndex=0;  
    this.initialLoad();

  }

  initialLoad() {

    let self=this;


    new Promise((resolve,reject) => {

      self.toggleLoader(true);

      setTimeout(() => {
        resolve();
      }, 1000);
      
    })
      .then(() => {

        this.fetch();

   
      })
      .catch((reject) => {

        throw new Error ('check a promise chain');
      });


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
    
      throw new Error ('Woops, there was an error making the request.');
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
    
      new Promise((resolve,reject) => {
   
        setTimeout(() => {
          self.toggleLoader(false);
        }, 1000);
       
        
        resolve();

      }) 
        .then(() => {
          self.sliceDataOnPortions(status);
        })
        .then(() => {
          self.showData(true);
          // console.log('2');

        })
        .then(() => {
          self.toggleLoader(false);
          // console.log('3');

        })
        .catch((reject) => {
          // console.log('da');
        });

    
    } else {

      new Promise((resolve, reject) => {

        self.toggleLoader(true);
           
        // console.log('1');
        resolve();
      })
        .then(() => {
          let items = self.parsedResponse;
          // console.log(items);
          let limittedArray = items.slice(0, this.dataAmount);

          limittedArray.map(function(el) {

            self.data.push(el);

          });
          // console.log('2');
        })
        .then(() => {
          self.sliceDataOnPortions();
          // console.log('3');
        })
        .then(() => {

          self.showData();
          // console.log('4');

        });

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
      // console.log(start,items.length,step);

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
           
      let itemsAmount = self.dataSet.totalLength;   
      let galleryMinHeight = container.offsetHeight;
      let thumbnailsHeight=this.thumbnails.height;
      // console.log(self.dataSet.totalLength);
      
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
      
      

      self.thumbnails.width = self.thumbnails.itemWidth * (self.dataSet.totalLength + 1);

      
      new Promise((resolve, reject) => {

        self.addItemsToGallery(self.galleryList, items);

        resolve();
      })
        .then(() => {
          self.showFirstItems(galleryList);
        })
        .then(() => {
          gallery.appendChild(galleryList);
        })
        .then(() => {
          self.bindEvents();
        })
        .then(() => {
          self.navigation(container);
        });
    
    } else {

      self.thumbnails.width = self.thumbnails.itemWidth * (self.dataSet.totalLength + 1);


      new Promise((resolve, reject) => {

        self.addItemsToGallery(self.galleryList, items);

        resolve();
      })
        .then(() => {
          self.bindEvents();

        });
      // console.log(self.galleryList);
      
  
      
    }
      
    return true;

  }



  
  addItemsToGallery(list, items) {
    
    let self=this;

    // console.log(list);
    
    let galleryList = list;
    let data = items;
    let dataLength = data.length;
    let galleryMaxWidth = this.gallery.width;
   
    self.dataSet.totalLength+=data.length;
    
    // console.log(self.dataSet.totalLength);
    

    for (let j = 0; j < dataLength; j++) {
    
      let galleryItem = document.createElement('li');
      galleryItem.classList.add('gallery__item', self.galleryItemSelector);
    
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

    // console.log(self.gallery.total.length, self.dataAmount);

    if (self.gallery.total.length < self.dataAmount) {

      self.gallery.total = self.gallery.items.map(el => {

        return el;

      });
     
    }




  }

  bindEvents() {

    this.fullPageMode();

  }


  fullPageMode() {

    let self=this;
    self.createPoPUp();

  }


  
  createPoPUp() {

    let self=this;

    let modal = document.querySelectorAll('.modal');

    if (modal.length < 2) {

      let body = document.querySelector('body');

      let container = document.createElement('div');
      container.classList.add('modal', 'modal__fp');

      let inner = document.createElement('div');
      inner.classList.add('modal__inner');

      container.appendChild(inner);

      let content = document.createElement('div');
      content.classList.add('modal__content');
      content.innerHTML = '<span class="modal__closeBtn" ></span>'+
       '<img class="modal__img" src="">';

      self.clickEventClosePopUp(content);

      inner.appendChild(content);

      self.popup.content = content;
      self.popup.wrap = container;

      body.appendChild(container);
     
    };

    
    self.getImgSrc();


  }


  getImgSrc() {

    let self = this;

    let popup = self.popup;
    let list = self.galleryList ;

    // console.log(list);

    let current = [].slice.call(list.children).filter( function(el) {

      if(el.classList.contains(self.galleryItemSelector) ) return el;

    });
    // console.log(current);


    current.forEach(function(el) {

      el.addEventListener('click', function() {
        // console.log(el);
        let c = [].slice.call(el.children).find(function(e) {

          let r = e.hasAttribute('src') ? e : false;

          return r;

        });

        popup.imgSrc = c.getAttribute('src');    
        self.showFullPageImg(popup);
         
      });

    });
    
  }



  showFullPageImg(con) {
 
    let imgSrc=con.imgSrc;
    let wrap=con.wrap;
    let content=con.content;
    let body=document.querySelector('body');

    let img = [].slice.call(content.children).find(function(el) {

      if ( el.classList.contains('modal__img')) return el;

    });
   
    img.setAttribute('src', imgSrc);
    wrap.classList.add('is-active');
    body.classList.add('over-hid');

  }


  clickEventClosePopUp(con) {

    let content = con;
    let body = document.querySelector('body');

    let close = [].slice.call(content.children).find(function(el) {

      if (el.classList.contains('modal__closeBtn')) return el;

    });


    close.addEventListener('click', function(eve) {

      console.log(eve.currentTarget, eve.detail);

      eve.currentTarget.closest('.modal').classList.remove('is-active');

      body.classList.remove('over-hid');

    });


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
    let prevBtn, nextBtn;   
    let thisGalleryChildren = [].slice.call(thisGalleryWrapper.children);
    
    
    if ((!self.gallery.prevBtnSelector) && (!self.gallery.nextBtnSelector)) {

      prevBtn = document.createElement('div');
      prevBtn.classList.add('control-btn', 'control-btn__left', 'js-gallery-prev');
      prevBtn.innerHTML = '<button class="icon-btn icon-btn_left"></button>';
    
    
      nextBtn = document.createElement('div');
      nextBtn.classList.add('control-btn', 'control-btn__right', 'js-gallery-next');    
      nextBtn.innerHTML = '<button class="icon-btn icon-btn_right"></button>';
    
      thisGalleryWrapper.classList.add('add-controllers');
      thisGalleryWrapper.appendChild(prevBtn);
      thisGalleryWrapper.appendChild(nextBtn);
    
    
    } else {
    
      nextBtn = thisGalleryChildren.filter(function(el) {
    
        if (el.classList.contains(self.gallery.nextBtnSelector)) { return el; }
    
      });
    
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

    nextSlideBtn.forEach(function(e) {

      e.addEventListener('click', function() {
 
        let slides = self.gallery.items;
                       
        let currentIndex = slides.findIndex(function(el) {
          
          if (el.classList.contains('is-visible')) { return el; }
          
        });
          
        self.currentIndex = currentIndex;

        self.secondaryLoad();

        slides[self.currentIndex].classList.toggle('is-visible');

        self.currentIndex = (self.currentIndex + 1) % slides.length;

        slides[self.currentIndex].classList.toggle('is-visible');

        self.changeThumbnails();
      
      });


    });
  }

  prevSlide() {
    let self = this;
    let prevSlideBtn = self.gallery.prevBtnNode;


    prevSlideBtn.forEach(function(el) {

      el.addEventListener('click', function() {
  
        let slides = self.gallery.total;

        let lastSlide = slides.length - 1;

        let currentIndex = slides.findIndex(function(el) {

          if (el.classList.contains('is-visible')) { return el; }

        });

        self.currentIndex = currentIndex;

        slides[self.currentIndex].classList.toggle('is-visible');

        if (self.currentIndex <= 0) {

          self.currentIndex = lastSlide;

        } else if ((self.currentIndex > 0) && (self.currentIndex <= lastSlide)) {

          self.currentIndex--;
        }

        slides[self.currentIndex].classList.toggle('is-visible');

        self.changeThumbnails();

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
      container.appendChild(thumbs);
    
    
      this.moveThumbnails();      
      this.toggleThumbs();
       
    
    } else {

      let thumbsListWidth = (self.thumbnails.width);
      self.thumbnails.list.style.width = thumbsListWidth + 'px';
    
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
    
    thumbTrigger.forEach(function(el) {
    
      el.addEventListener('click', function(event) {
       
        let triggerSiblingSlides = el.closest('.g-thumbnails').previousSibling.childNodes;
        let slides = [].slice.call(triggerSiblingSlides[0].childNodes);

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
    
    
    if (left >= stopPoint) {
    
      left = stopPoint;
    }
    
    let positionLeft = 'calc( -' + left + 'px' + ' + 15px)';
    
    self.thumbnails.list.style.left = positionLeft;
    
  }


  toggleLoader() {

    let self=this;

    let container = document.querySelector(self.galleryWrapper);


    let loaderWrapper = [].slice.call(container.children).find(function(el) {
       
      if (el.classList.contains('js-loader-wrapper')) return el;

    });

    let loader=[].slice.call(loaderWrapper.children).find(function(el) {

      if(el.classList.contains('loader')) return el;

    });


    loader.classList.toggle('is-active');

    return true;
    

  }

}
