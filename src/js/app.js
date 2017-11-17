
import './polyfills';

import Gallery from './gallery';





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
  prevSlide: 'js-gallery-prev1',
  nextSlide: 'js-gallery-next1',
  container: '.js-gallery-wrap',
  gallery: 'js-gallery',
 
  thumbs: true
  // loader: true,
  // fullScreenMode: true

});


app.initialize({

    
  galleryAmount: '100',
  galleryItemSelector: '.js-gallery-item',
  prevSlide: 'js-gallery-prev2',
  nextSlide: 'js-gallery-next2',
  container: '.js-gallery-wrap2',
  gallery: 'js-gallery',
 
  thumbs: true
  // loader: true,
  // fullScreenMode: true

});
