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
    this.startOfDataSet = 0;
    this.numberOfDataItems = 5;
    this.portionOfData = [];
    this.data = [];
    this.galleryWrapper = settings.container;
    this.gallery = settings.gallery;
    // this.galleryList;
    this.galleryItemToSlide = settings.galleryItemSelector;
    this.prevSlideBtn = settings.prevSlide || 'js-gallery-prev';
    this.nextSlideBtn = settings.nextSlide || 'js-gallery-next';
    this.currentSlide = 0 || settings.initialSlide;
    this.currentIndex = 0;
    this.thumbsHeight = 100;
    this.thumbsItemWidth = 1.15 * this.thumbsHeight;
    this.thumbsWidth = 0;
    this.thumbsListWidth = 0;
    this.thumbTriggers = [];
    this.thumbsListPosition = 0;

  }

  initialize() {
    this.getData(0);

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

  getData() {

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
      // console.log(parsedJSON);


    };

    xhr.onerror = function() {

      console.log('Woops, there was an error making the request.');
    };

    xhr.send();

  }

  handleResponse(response) {
    let self = this;


    self.response = response;

    self.initiateData(response);

    self.showData();
  }


  showData() {

    let self = this;

    let galleryItems = self.portionOfData;

    let galleryContainer = [].slice.call(document.querySelectorAll(this.galleryWrapper));


    galleryContainer.forEach(function(el) {


      self.fillGallery(el, galleryItems);

      self.addThumbs(el, galleryItems);


    });

  }

  initiateData(imagesString) {

    let self = this;


    // console.log(secondary)


    var items = JSON.parse(imagesString);


    let limittedArray = items.slice(0, this.dataAmount);

    // console.log(limittedArray);


    limittedArray.map(function(el) {

      self.data.push(el);

    });


    self.sliceDataOnPortions();



  }


  sliceDataOnPortions(imageItems, secondary) {

    let self = this;
    let items = self.data;

    let step = 5;

    if (secondary) {

      if (this.startOfDataSet < items.length - step) {
        this.startOfDataSet += secondary;
        this.numberOfDataItems = this.startOfDataSet + step;

        let portionArray = items.slice(this.startOfDataSet, this.numberOfDataItems);

    
        portionArray.map(function(el) {

          self.portionOfData.push(el);

        });

      } else {

        self.portionOfData = 0;


      }


    } else {
      this.numberOfDataItems = this.startOfDataSet + step;
      let portionArray = items.slice(this.startOfDataSet, this.numberOfDataItems);

     

      portionArray.map(function(el) {

        self.portionOfData.push(el);

      });
      
    }


    // // if(secondary) { items=self.portionOfData; }
    // console.log(this.startOfDataSet, this.numberOfDataItems);
    // console.log(items);


    console.log(self.portionOfData);


  }

  fillGallery(el, data) {

    let galleryId = this.id;
    galleryId++;

    let items = data;
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

    self.galleryList = galleryList;

    this.addItemsToGallery(galleryList, items);

    // this.addBtnToGallery(galleryContainer);

    this.thumbsListWidth = this.thumbsItemWidth * (itemsAmount + 1);


    // console.log(galleryList);

    gallery.appendChild(galleryList);

    this.navigation(galleryContainer, galleryList);

  }




  addItemsToGallery(list, items) {

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







  navigation(galleryContainer, galleryList) {


    let self = this;



    let thisGalleryWrapper = galleryContainer;
    let thisGalleryList = galleryList;
    let prevBtn, nextBtn;

    let thisGalleryChildren = [].slice.call(thisGalleryWrapper.children);

    // console.log(thisGalleryChildren);


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

    // console.log(prevSlideButton);

    let gallery = thisGalleryChildren.filter(function(el) {

      if (el.classList.contains(self.gallery)) { return el; }

    });

    let slidesNodeList = thisGalleryList.childNodes;
    // console.log(thisGalleryList);

    let slides = [].slice.call(slidesNodeList);


    let firstSlides = slides.filter(function(el) {

      if (el.getAttribute('id') === 'slide1') return el;

    });


    // console.log(firstSlides);

    firstSlides.forEach(function(el) {

      el.classList.add('is-visible');

    });


    this.nextSlide(slides, nextBtn, thisGalleryList);

    this.prevSlide(slides, prevBtn, thisGalleryList);

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

        e.addEventListener('click', function(event) {
          let items = self.portionOfData;
          let itemsLength = items.length;
          let list = galleryList;

          // self.startOfDataSet += 5;

          self.sliceDataOnPortions(self.portionOfData, 5);
          self.addItemsToGallery(list, items, itemsLength);



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

  addThumbs(galleryContainer, galleryItems) {

    let self = this;
    let data = galleryItems;
    let container = galleryContainer;


    let thumbsUrl = data.map(function(el) {

      return el.thumbnailUrl;

    });


    let thumbsHTML = document.createElement('div');

    thumbsHTML.style.minHeight = self.thumbsHeight + 'px';
    thumbsHTML.classList.add('g-thumbnails');



    let thumbsHTMLList = document.createElement('ul');
    let thumbsHTMLListWidth = (this.thumbsListWidth);
    thumbsHTMLList.style.width = thumbsHTMLListWidth + 'px';

    let thumbsHTMLListHeight = (self.thumbsHeight - 10);
    thumbsHTMLList.style.height = thumbsHTMLListHeight + 'px';

    thumbsHTMLList.classList.add('g-thumbnails__list');


    this.thumbsListPosition = self.currentIndex * self.thumbsItemWidth + 5;

    for (let i = 0; i < thumbsUrl.length; i++) {

      let thumbsHTMLItem = document.createElement('li');

      let thumbsHTMLItemWidth = (this.thumbsItemWidth);
      thumbsHTMLItem.style.width = thumbsHTMLItemWidth + 'px';
      thumbsHTMLItem.style.height = thumbsHTMLListHeight + 'px';
      let thumbsHTMLItemPosition = self.currentIndex * thumbsHTMLItemWidth;

      thumbsHTMLItem.classList.add('g-thumbnails__item');


      let thumbsHTMLItemWrap = document.createElement('div');
      thumbsHTMLItemWrap.setAttribute('data-thumb', i);
      thumbsHTMLItemWrap.classList.add('g-thumbnails__item-wrap', 'js-thumb-slide');



      self.thumbTriggers.push(thumbsHTMLItemWrap);

      thumbsHTMLItemWrap.innerHTML = '<img src="' + thumbsUrl[i] + '" class="g-thumbnails__img"' +
        ' style="max-width: 100%;">';


      thumbsHTMLItem.appendChild(thumbsHTMLItemWrap);

      thumbsHTMLList.appendChild(thumbsHTMLItem);

    }

    // console.log(self.thumbTriggers);

    thumbsHTML.appendChild(thumbsHTMLList);

    // console.log(container);
    container.appendChild(thumbsHTML);

    this.moveThumbnails(thumbsHTMLList, self.currentIndex);

    this.toggleThumbs();
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
