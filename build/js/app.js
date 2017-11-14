/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// send request\n// initialize slider\n// inititalize thumbnails\n// add navigation\n// add loader\n// check for reusable\n// +bonus: add smooth fade in/ fade out \n\n\ndocument.addEventListener('DOMContentLoaded', function (event) {\n\n  var app = {\n\n    initialize: function initialize(settings) {\n\n      var gallery = new Gallery(settings);\n\n      gallery.getData();\n\n      if (settings.loader === true) {\n        gallery.addLoader();\n      };\n\n      if (settings.thumbs === true) {\n        gallery.addThumbs();\n      };\n\n      if (settings.fullScreenMode === true) {\n        gallery.fullScreenMode();\n      };\n    }\n\n  };\n\n  app.initialize({\n\n    galleryId: '1',\n    galleryAmount: '10',\n    galleryItemSelector: '.js-gallery-item',\n    prevSlide: '.js-gallery-prev',\n    nextSlide: '.js-gallery-next',\n    // loader: true,\n    thumbs: true\n    // fullScreenMode: true\n\n  });\n});\n\nfunction Gallery(settings) {\n\n  this.settings = settings;\n  this.id = settings.galleryId;\n  this.dataAmount = settings.galleryAmount;\n  this.data;\n  this.galleryItemToSlide = settings.galleryItemSelector;\n  this.prevSlideBtn = settings.prevSlide;\n  this.nextSlideBtn = settings.nextSlide;\n  this.currentSlide = 0;\n}\n\nGallery.prototype.getArrayWithLimitedLength = function (length) {\n\n  var array = new Array();\n\n  array.push = function () {\n\n    if (this.length >= length) {\n      this.shift();\n    }\n    return Array.prototype.push.apply(this, arguments);\n  };\n\n  return array;\n};\n\nGallery.prototype.getData = function (callback) {\n\n  var self = this;\n\n  var url = 'images.json';\n\n  var xhr = self.createCORSRequest('GET', url);\n\n  if (!xhr) {\n    throw new Error('CORS not supported');\n  }\n\n  // Response handlers.\n  xhr.onload = function () {\n    var responseText = xhr.responseText;\n\n    // console.log(parsedJSON);\n    self.handleResponse(responseText);\n  };\n\n  xhr.onerror = function () {\n\n    console.log('Woops, there was an error making the request.');\n  };\n\n  xhr.send();\n};\n\nGallery.prototype.handleResponse = function (response) {\n  var self = this;\n\n  self.initiateData(response);\n\n  self.showData(self.data);\n};\n\nGallery.prototype.showData = function (array) {\n  var self = this;\n\n  var galleryItems = array;\n  // console.log(array);\n  var galleryContainer = [].slice.call(document.querySelectorAll('.js-gallery-wrap'));\n\n  galleryContainer.forEach(function (el) {\n\n    self.fillGallery(el, galleryItems);\n  });\n};\n\n/* method: User::initiatePlans()\n * parses plans from JSON representation and initiates a new Plan for\n * each of them\n */\n\nGallery.prototype.initiateData = function (imagesString) {\n\n  var items = JSON.parse(imagesString);\n\n  var limitedArray = this.getArrayWithLimitedLength(1);\n\n  this.data = limitedArray.map(function (el) {\n    return el;\n  });\n\n  this.data.push(items.slice(0, this.dataAmount));\n\n  console.log(this.data);\n};\n\nGallery.prototype.createCORSRequest = function (method, url) {\n\n  var xhr = new XMLHttpRequest();\n  if ('withCredentials' in xhr) {\n\n    // Check if the XMLHttpRequest object has a \"withCredentials\" property.\n    // \"withCredentials\" only exists on XMLHTTPRequest2 objects.\n    xhr.open(method, url, true);\n  } else if (typeof XDomainRequest != 'undefined') {\n\n    // Otherwise, check if XDomainRequest.\n    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.\n    xhr = new XDomainRequest();\n    xhr.open(method, url);\n  } else {\n\n    // Otherwise, CORS is not supported by the browser.\n    xhr = null;\n  }\n  // console.log(xhr);\n  return xhr;\n};\n\nGallery.prototype.fillGallery = function (el, data) {\n\n  var items = data[0];\n  var itemsAmount = items.length;\n  // console.log(data);\n\n  var galleryContainer = el;\n\n  var galleryMaxWidth = el.offsetWidth;\n  // console.log(galleryMaxWidth);\n\n  var galleryList = document.createElement('ul');\n  galleryList.classList.add('gallery', 'js-gallery-list');\n\n  // let galleryItem=document.createElement('li');\n  // galleryItem.classList.add('gallery__item', 'js-gallery-item');\n\n\n  for (var j = 0; j < itemsAmount; j++) {\n\n    var galleryItem = document.createElement('li');\n    galleryItem.classList.add('gallery__item', 'js-gallery-item');\n    var galleryItemID = 'slide' + items[j].id;\n    galleryItem.setAttribute('id', galleryItemID);\n    galleryItem.style.maxWidth = galleryMaxWidth + 'px';\n\n    galleryItem.innerHTML = '<img src=\"' + items[j].url + '\" class=\"gallery__img\"> ';\n\n    galleryList.appendChild(galleryItem);\n  }\n\n  // console.log(galleryList);\n\n\n  galleryContainer.appendChild(galleryList);\n\n  this.navigation();\n};\n\nGallery.prototype.navigation = function () {\n\n  var slides = document.querySelectorAll(this.galleryItemToSlide);\n  var currentSlide = this.currentSlide;\n\n  slides[currentSlide].classList.add('is-visible');\n\n  this.nextSlide(slides);\n  this.prevSlide(slides);\n};\n\nGallery.prototype.nextSlide = function (allSlides) {\n\n  var currentSlide = this.currentSlide;\n\n  var nextSlideBtn = document.querySelectorAll(this.nextSlideBtn);\n\n  nextSlideBtn.forEach(function (el) {\n\n    el.addEventListener('click', function (event) {\n\n      allSlides[currentSlide].classList.toggle('is-visible');\n      currentSlide = (currentSlide + 1) % allSlides.length;\n      allSlides[currentSlide].classList.toggle('is-visible');\n    });\n  });\n};\n\nGallery.prototype.prevSlide = function (allSlides) {\n\n  // console.log(arguments);\n  var currentSlide = this.currentSlide;\n  var lastSlide = allSlides.length - 1;\n  var prevSlideBtn = document.querySelectorAll(this.prevSlideBtn);\n\n  prevSlideBtn.forEach(function (el) {\n\n    el.addEventListener('click', function (event) {\n\n      allSlides[currentSlide].classList.toggle('is-visible');\n\n      if (currentSlide <= 0) {\n\n        currentSlide = lastSlide;\n      } else if (currentSlide <= lastSlide) {\n        currentSlide--;\n      }\n\n      allSlides[currentSlide].classList.toggle('is-visible');\n    });\n  });\n};\n\nGallery.prototype.addThumbs = function () {\n\n  var self = this;\n\n  var thumbsUrl = new Array();\n\n  thumbsUrl = self.data.map(function (el) {\n\n    return el;\n  });\n\n  console.log(thumbsUrl);\n};\n\nGallery.prototype.addLoader = function () {};\n\nGallery.prototype.fullScreenMode = function () {};\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvc2xpZGVyLmpzP2QxYzIiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cblxuXG4vLyBzZW5kIHJlcXVlc3Rcbi8vIGluaXRpYWxpemUgc2xpZGVyXG4vLyBpbml0aXRhbGl6ZSB0aHVtYm5haWxzXG4vLyBhZGQgbmF2aWdhdGlvblxuLy8gYWRkIGxvYWRlclxuLy8gY2hlY2sgZm9yIHJldXNhYmxlXG4vLyArYm9udXM6IGFkZCBzbW9vdGggZmFkZSBpbi8gZmFkZSBvdXQgXG5cblxuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbihldmVudCkge1xuXG5cbiAgdmFyIGFwcCA9IHtcblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG5cbiAgICAgIGxldCBnYWxsZXJ5ID0gbmV3IEdhbGxlcnkoc2V0dGluZ3MpO1xuXG4gICAgICBnYWxsZXJ5LmdldERhdGEoKTtcblxuICAgICAgaWYgKHNldHRpbmdzLmxvYWRlciA9PT0gdHJ1ZSkgeyBnYWxsZXJ5LmFkZExvYWRlcigpOyB9O1xuXG4gICAgICBpZiAoc2V0dGluZ3MudGh1bWJzID09PSB0cnVlKSB7IGdhbGxlcnkuYWRkVGh1bWJzKCk7IH07XG5cbiAgICAgIGlmIChzZXR0aW5ncy5mdWxsU2NyZWVuTW9kZSA9PT0gdHJ1ZSkgeyBnYWxsZXJ5LmZ1bGxTY3JlZW5Nb2RlKCk7fTtcblxuICAgIH0sXG5cblxuXG4gIH07XG5cblxuICBhcHAuaW5pdGlhbGl6ZSh7XG5cbiAgICBnYWxsZXJ5SWQ6ICcxJyxcbiAgICBnYWxsZXJ5QW1vdW50OiAnMTAnLFxuICAgIGdhbGxlcnlJdGVtU2VsZWN0b3I6ICcuanMtZ2FsbGVyeS1pdGVtJyxcbiAgICBwcmV2U2xpZGU6ICcuanMtZ2FsbGVyeS1wcmV2JyxcbiAgICBuZXh0U2xpZGU6ICcuanMtZ2FsbGVyeS1uZXh0JyxcbiAgICAvLyBsb2FkZXI6IHRydWUsXG4gICAgdGh1bWJzOiB0cnVlXG4gICAgLy8gZnVsbFNjcmVlbk1vZGU6IHRydWVcblxuICB9KTtcblxuXG59KTsgXG5cblxuXG5mdW5jdGlvbiBHYWxsZXJ5KHNldHRpbmdzKSB7XG5cbiAgdGhpcy5zZXR0aW5ncz1zZXR0aW5ncztcbiAgdGhpcy5pZD1zZXR0aW5ncy5nYWxsZXJ5SWQ7XG4gIHRoaXMuZGF0YUFtb3VudD1zZXR0aW5ncy5nYWxsZXJ5QW1vdW50O1xuICB0aGlzLmRhdGE7XG4gIHRoaXMuZ2FsbGVyeUl0ZW1Ub1NsaWRlPXNldHRpbmdzLmdhbGxlcnlJdGVtU2VsZWN0b3I7XG4gIHRoaXMucHJldlNsaWRlQnRuPXNldHRpbmdzLnByZXZTbGlkZTtcbiAgdGhpcy5uZXh0U2xpZGVCdG49c2V0dGluZ3MubmV4dFNsaWRlO1xuICB0aGlzLmN1cnJlbnRTbGlkZT0wO1xuXG59XG5cblxuXG5HYWxsZXJ5LnByb3RvdHlwZS5nZXRBcnJheVdpdGhMaW1pdGVkTGVuZ3RoID0gZnVuY3Rpb24obGVuZ3RoKSB7XG4gICBcbiAgdmFyIGFycmF5ID0gbmV3IEFycmF5KCk7XG5cbiAgYXJyYXkucHVzaCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKHRoaXMubGVuZ3RoID49IGxlbmd0aCkge1xuICAgICAgdGhpcy5zaGlmdCgpO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcyxhcmd1bWVudHMpO1xuICB9O1xuXG4gIHJldHVybiBhcnJheTtcblxuXG59O1xuXG5HYWxsZXJ5LnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICBsZXQgc2VsZj10aGlzO1xuXG4gIGxldCB1cmw9J2ltYWdlcy5qc29uJztcblxuICBsZXQgeGhyID0gc2VsZi5jcmVhdGVDT1JTUmVxdWVzdCgnR0VUJywgdXJsKTtcblxuICBpZiAoIXhocikge1xuICAgIHRocm93IG5ldyBFcnJvcignQ09SUyBub3Qgc3VwcG9ydGVkJyk7XG4gIH1cblxuICAvLyBSZXNwb25zZSBoYW5kbGVycy5cbiAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCByZXNwb25zZVRleHQgPSB4aHIucmVzcG9uc2VUZXh0O1xuXG4gICAgLy8gY29uc29sZS5sb2cocGFyc2VkSlNPTik7XG4gICAgc2VsZi5oYW5kbGVSZXNwb25zZShyZXNwb25zZVRleHQpO1xuICBcbiAgfTtcblxuICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc29sZS5sb2coJ1dvb3BzLCB0aGVyZSB3YXMgYW4gZXJyb3IgbWFraW5nIHRoZSByZXF1ZXN0LicpO1xuICB9O1xuXG4gIHhoci5zZW5kKCk7XG5cbn07XG5cblxuR2FsbGVyeS5wcm90b3R5cGUuaGFuZGxlUmVzcG9uc2UgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICBsZXQgc2VsZj0gdGhpcztcblxuICBzZWxmLmluaXRpYXRlRGF0YShyZXNwb25zZSk7XG4gICAgICBcbiAgc2VsZi5zaG93RGF0YShzZWxmLmRhdGEpO1xufTtcblxuXG5cbkdhbGxlcnkucHJvdG90eXBlLnNob3dEYXRhID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgbGV0IHNlbGY9dGhpcztcblxuICBsZXQgZ2FsbGVyeUl0ZW1zPWFycmF5O1xuICAvLyBjb25zb2xlLmxvZyhhcnJheSk7XG4gIGxldCBnYWxsZXJ5Q29udGFpbmVyPVtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWdhbGxlcnktd3JhcCcpKTtcblxuXG4gIGdhbGxlcnlDb250YWluZXIuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuXG4gICAgXG4gICAgc2VsZi5maWxsR2FsbGVyeShlbCxnYWxsZXJ5SXRlbXMpO1xuXG5cbiAgfSk7XG5cblxufTtcblxuXG5cbi8qIG1ldGhvZDogVXNlcjo6aW5pdGlhdGVQbGFucygpXG4gKiBwYXJzZXMgcGxhbnMgZnJvbSBKU09OIHJlcHJlc2VudGF0aW9uIGFuZCBpbml0aWF0ZXMgYSBuZXcgUGxhbiBmb3JcbiAqIGVhY2ggb2YgdGhlbVxuICovXG5cblxuR2FsbGVyeS5wcm90b3R5cGUuaW5pdGlhdGVEYXRhID0gZnVuY3Rpb24oaW1hZ2VzU3RyaW5nKSB7XG4gXG5cbiAgdmFyIGl0ZW1zID0gSlNPTi5wYXJzZShpbWFnZXNTdHJpbmcpO1xuXG4gIGxldCBsaW1pdGVkQXJyYXkgPSB0aGlzLmdldEFycmF5V2l0aExpbWl0ZWRMZW5ndGgoMSk7XG5cbiAgdGhpcy5kYXRhID0gbGltaXRlZEFycmF5Lm1hcChmdW5jdGlvbihlbCkge3JldHVybiBlbDt9KTtcblxuICB0aGlzLmRhdGEucHVzaChpdGVtcy5zbGljZSgwLHRoaXMuZGF0YUFtb3VudCkpO1xuXG4gIGNvbnNvbGUubG9nKHRoaXMuZGF0YSk7XG5cbn07XG5cblxuXG5HYWxsZXJ5LnByb3RvdHlwZS5jcmVhdGVDT1JTUmVxdWVzdCA9IGZ1bmN0aW9uKG1ldGhvZCx1cmwpIHtcblxuXG4gIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgaWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikge1xuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIFhNTEh0dHBSZXF1ZXN0IG9iamVjdCBoYXMgYSBcIndpdGhDcmVkZW50aWFsc1wiIHByb3BlcnR5LlxuICAgIC8vIFwid2l0aENyZWRlbnRpYWxzXCIgb25seSBleGlzdHMgb24gWE1MSFRUUFJlcXVlc3QyIG9iamVjdHMuXG4gICAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXG4gIH0gZWxzZSBpZiAodHlwZW9mIFhEb21haW5SZXF1ZXN0ICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAvLyBPdGhlcndpc2UsIGNoZWNrIGlmIFhEb21haW5SZXF1ZXN0LlxuICAgIC8vIFhEb21haW5SZXF1ZXN0IG9ubHkgZXhpc3RzIGluIElFLCBhbmQgaXMgSUUncyB3YXkgb2YgbWFraW5nIENPUlMgcmVxdWVzdHMuXG4gICAgeGhyID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4obWV0aG9kLCB1cmwpO1xuXG4gIH0gZWxzZSB7XG5cbiAgICAvLyBPdGhlcndpc2UsIENPUlMgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3Nlci5cbiAgICB4aHIgPSBudWxsO1xuXG4gIH1cbiAgLy8gY29uc29sZS5sb2coeGhyKTtcbiAgcmV0dXJuIHhocjtcblxufTtcblxuXG5cbkdhbGxlcnkucHJvdG90eXBlLmZpbGxHYWxsZXJ5ID0gZnVuY3Rpb24oZWwsZGF0YSkge1xuXG5cbiAgbGV0IGl0ZW1zPWRhdGFbMF07XG4gIGxldCBpdGVtc0Ftb3VudD1pdGVtcy5sZW5ndGg7XG4gIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gIGxldCBnYWxsZXJ5Q29udGFpbmVyPWVsO1xuXG4gIGxldCBnYWxsZXJ5TWF4V2lkdGg9ZWwub2Zmc2V0V2lkdGg7XG4gIC8vIGNvbnNvbGUubG9nKGdhbGxlcnlNYXhXaWR0aCk7XG5cbiAgbGV0IGdhbGxlcnlMaXN0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIGdhbGxlcnlMaXN0LmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnknLCAnanMtZ2FsbGVyeS1saXN0Jyk7XG5cblxuXG4gIC8vIGxldCBnYWxsZXJ5SXRlbT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAvLyBnYWxsZXJ5SXRlbS5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5X19pdGVtJywgJ2pzLWdhbGxlcnktaXRlbScpO1xuXG5cblxuICBmb3IgKGxldCBqPTA7IGo8aXRlbXNBbW91bnQ7aisrKSB7XG5cbiAgIFxuXG4gICAgbGV0IGdhbGxlcnlJdGVtPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZ2FsbGVyeUl0ZW0uY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeV9faXRlbScsICdqcy1nYWxsZXJ5LWl0ZW0nKTtcbiAgICBsZXQgZ2FsbGVyeUl0ZW1JRD0nc2xpZGUnK2l0ZW1zW2pdLmlkO1xuICAgIGdhbGxlcnlJdGVtLnNldEF0dHJpYnV0ZSgnaWQnLCBnYWxsZXJ5SXRlbUlEKTtcbiAgICBnYWxsZXJ5SXRlbS5zdHlsZS5tYXhXaWR0aD1nYWxsZXJ5TWF4V2lkdGgrJ3B4JztcblxuICAgIGdhbGxlcnlJdGVtLmlubmVySFRNTD0nPGltZyBzcmM9XCInK2l0ZW1zW2pdLnVybCsnXCIgY2xhc3M9XCJnYWxsZXJ5X19pbWdcIj4gJztcbiAgICBcbiAgICBnYWxsZXJ5TGlzdC5hcHBlbmRDaGlsZChnYWxsZXJ5SXRlbSk7XG5cbiAgfVxuXG4gIC8vIGNvbnNvbGUubG9nKGdhbGxlcnlMaXN0KTtcblxuXG4gIGdhbGxlcnlDb250YWluZXIuYXBwZW5kQ2hpbGQoZ2FsbGVyeUxpc3QpO1xuXG4gIHRoaXMubmF2aWdhdGlvbigpO1xuIFxufTtcblxuXG5HYWxsZXJ5LnByb3RvdHlwZS5uYXZpZ2F0aW9uID0gZnVuY3Rpb24oKSB7XG5cbiAgbGV0IHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5nYWxsZXJ5SXRlbVRvU2xpZGUpO1xuICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5jdXJyZW50U2xpZGU7XG5cblxuICBzbGlkZXNbY3VycmVudFNsaWRlXS5jbGFzc0xpc3QuYWRkKCdpcy12aXNpYmxlJyk7XG5cblxuICB0aGlzLm5leHRTbGlkZShzbGlkZXMpO1xuICB0aGlzLnByZXZTbGlkZShzbGlkZXMpO1xuXG5cbn07XG5cblxuXG5cblxuR2FsbGVyeS5wcm90b3R5cGUubmV4dFNsaWRlID0gZnVuY3Rpb24oYWxsU2xpZGVzKSB7XG5cbiAgbGV0IGN1cnJlbnRTbGlkZT10aGlzLmN1cnJlbnRTbGlkZTtcblxuICBsZXQgbmV4dFNsaWRlQnRuPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5uZXh0U2xpZGVCdG4pO1xuXG4gIG5leHRTbGlkZUJ0bi5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG5cblxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgYWxsU2xpZGVzW2N1cnJlbnRTbGlkZV0uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtdmlzaWJsZScpO1xuICAgICAgY3VycmVudFNsaWRlID0gKGN1cnJlbnRTbGlkZSsxKSVhbGxTbGlkZXMubGVuZ3RoO1xuICAgICAgYWxsU2xpZGVzW2N1cnJlbnRTbGlkZV0uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtdmlzaWJsZScpO1xuXG4gICAgfSk7XG5cblxuICB9KTtcbiBcbiAgXG59O1xuXG5cblxuR2FsbGVyeS5wcm90b3R5cGUucHJldlNsaWRlID0gZnVuY3Rpb24oYWxsU2xpZGVzKSB7XG4gIFxuICAvLyBjb25zb2xlLmxvZyhhcmd1bWVudHMpO1xuICBsZXQgY3VycmVudFNsaWRlPXRoaXMuY3VycmVudFNsaWRlO1xuICBsZXQgbGFzdFNsaWRlPWFsbFNsaWRlcy5sZW5ndGgtMTtcbiAgbGV0IHByZXZTbGlkZUJ0bj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMucHJldlNsaWRlQnRuKTtcblxuICBwcmV2U2xpZGVCdG4uZm9yRWFjaChmdW5jdGlvbihlbCkge1xuXG5cbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgIGFsbFNsaWRlc1tjdXJyZW50U2xpZGVdLmNsYXNzTGlzdC50b2dnbGUoJ2lzLXZpc2libGUnKTtcblxuICAgICAgaWYgKGN1cnJlbnRTbGlkZSA8PSAwKSB7XG5cbiAgICAgICAgY3VycmVudFNsaWRlID0gbGFzdFNsaWRlO1xuXG4gICAgICB9IGVsc2UgaWYgKCBjdXJyZW50U2xpZGUgPD0gbGFzdFNsaWRlKSB7XG4gICAgICAgIGN1cnJlbnRTbGlkZS0tO1xuICAgICAgfVxuICAgICAgXG4gICAgICBhbGxTbGlkZXNbY3VycmVudFNsaWRlXS5jbGFzc0xpc3QudG9nZ2xlKCdpcy12aXNpYmxlJyk7XG5cbiAgICB9KTtcblxuXG4gIH0pO1xuXG4gXG4gIFxufTtcblxuXG5cblxuXG5HYWxsZXJ5LnByb3RvdHlwZS5hZGRUaHVtYnMgPSBmdW5jdGlvbigpIHtcblxuICBsZXQgc2VsZj10aGlzO1xuXG4gIGxldCB0aHVtYnNVcmwgPSBuZXcgQXJyYXk7XG4gXG5cblxuXG5cblxuICB0aHVtYnNVcmwgPSBzZWxmLmRhdGEubWFwKGZ1bmN0aW9uKGVsKSB7XG5cbiAgICByZXR1cm4gZWw7XG5cblxuICB9KTtcblxuXG4gIGNvbnNvbGUubG9nKHRodW1ic1VybCk7XG5cblxuXG59O1xuXG5cblxuR2FsbGVyeS5wcm90b3R5cGUuYWRkTG9hZGVyID0gZnVuY3Rpb24oKSB7XG4gIFxuXG5cbiAgXG59O1xuXG5cblxuR2FsbGVyeS5wcm90b3R5cGUuZnVsbFNjcmVlbk1vZGUgPSBmdW5jdGlvbigpIHtcbiAgXG5cblxuICBcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL3NsaWRlci5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBZkE7QUFDQTtBQW9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVkE7QUFjQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFHQTtBQUdBO0FBQ0E7QUFHQTs7Ozs7QUFNQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUdBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBSUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUlBO0FBQ0E7QUFHQTtBQUNBO0FBUUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(0);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvYXBwLmpzPzcxNmYiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgJy4vc2xpZGVyJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvYXBwLmpzIl0sIm1hcHBpbmdzIjoiOztBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///1\n");

/***/ })
/******/ ]);