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
eval("\n\n// send request\n// initialize slider\n// inititalize thumbnails\n// add navigation\n// add loader\n// check for reusable\n// +bonus: add smooth fade in/ fade out \n\n\ndocument.addEventListener('DOMContentLoaded', function (event) {\n\n  var gallery = new Gallery({\n\n    galleryId: '1',\n    galleryAmount: '200'\n\n  });\n\n  // console.log(gallery);\n\n  gallery.getData();\n});\n\nfunction Gallery(settings) {\n\n  this.settings = settings;\n  this.id = settings.galleryId;\n  this.dataAmount = settings.galleryAmount;\n  this.data = [];\n}\n\nGallery.prototype.getArrayWithLimitedLength = function (length) {\n\n  var array = new Array();\n\n  array.push = function () {\n\n    if (this.length >= length) {\n      this.shift();\n    }\n    return Array.prototype.push.apply(this, arguments);\n  };\n\n  return array;\n};\n\nGallery.prototype.getData = function (callback) {\n\n  var self = this;\n\n  var url = 'images.json';\n\n  var xhr = self.createCORSRequest('GET', url);\n\n  if (!xhr) {\n    throw new Error('CORS not supported');\n  }\n\n  // Response handlers.\n  xhr.onload = function () {\n    var responseText = xhr.responseText;\n\n    // console.log(parsedJSON);\n\n    self.initiateData(responseText);\n\n    self.showData(self.data);\n  };\n\n  xhr.onerror = function () {\n\n    console.log('Woops, there was an error making the request.');\n  };\n\n  xhr.send();\n};\n\nGallery.prototype.showData = function (array) {\n  var self = this;\n\n  var galleryItems = array;\n  // console.log(array);\n  var galleryContainer = [].slice.call(document.querySelectorAll('.js-gallery-wrap'));\n\n  galleryContainer.forEach(function (el) {\n\n    self.fillGallery(el, galleryItems);\n  });\n};\n\n/* method: User::initiatePlans()\n * parses plans from JSON representation and initiates a new Plan for\n * each of them\n */\nGallery.prototype.initiateData = function (imagesString) {\n\n  var items = JSON.parse(imagesString);\n\n  this.data = this.getArrayWithLimitedLength(1);\n\n  this.data.push(items.slice(0, this.dataAmount));\n};\n\nGallery.prototype.createCORSRequest = function (method, url) {\n\n  var xhr = new XMLHttpRequest();\n  if ('withCredentials' in xhr) {\n\n    // Check if the XMLHttpRequest object has a \"withCredentials\" property.\n    // \"withCredentials\" only exists on XMLHTTPRequest2 objects.\n    xhr.open(method, url, true);\n  } else if (typeof XDomainRequest != 'undefined') {\n\n    // Otherwise, check if XDomainRequest.\n    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.\n    xhr = new XDomainRequest();\n    xhr.open(method, url);\n  } else {\n\n    // Otherwise, CORS is not supported by the browser.\n    xhr = null;\n  }\n  // console.log(xhr);\n  return xhr;\n};\n\nGallery.prototype.fillGallery = function (el, data) {\n\n  var items = data[0];\n  var itemsAmount = items.length;\n  console.log(data);\n\n  var galleryContainer = el;\n\n  var galleryMaxWidth = el.offsetWidth;\n  // console.log(galleryMaxWidth);\n\n  var galleryList = document.createElement('ul');\n  galleryList.classList.add('gallery', 'js-gallery-list');\n\n  // let galleryItem=document.createElement('li');\n  // galleryItem.classList.add('gallery__item', 'js-gallery-item');\n\n\n  for (var j = 0; j < itemsAmount; j++) {\n\n    var galleryItem = document.createElement('li');\n    galleryItem.classList.add('gallery__item', 'js-gallery-item');\n\n    galleryItem.style.maxWidth = galleryMaxWidth + 'px';\n\n    galleryItem.innerHTML = '<img src=\"' + items[j].url + '\" class=\"gallery__img\"> ';\n\n    galleryList.appendChild(galleryItem);\n  }\n\n  // console.log(galleryList);\n\n\n  galleryContainer.appendChild(galleryList);\n\n  var slides = document.querySelectorAll('.js-gallery-item');\n  var controlls = void 0;\n  var currentSlide = 0;\n  var slideInterval = setInterval(nextSlide, 2000);\n\n  function nextSlide() {\n    slides[currentSlide].classList.toggle('is-visible');\n    currentSlide = (currentSlide + 1) % slides.length;\n    slides[currentSlide].classList.toggle('is-visible');\n  }\n};\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvc2xpZGVyLmpzP2QxYzIiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cblxuXG4vLyBzZW5kIHJlcXVlc3Rcbi8vIGluaXRpYWxpemUgc2xpZGVyXG4vLyBpbml0aXRhbGl6ZSB0aHVtYm5haWxzXG4vLyBhZGQgbmF2aWdhdGlvblxuLy8gYWRkIGxvYWRlclxuLy8gY2hlY2sgZm9yIHJldXNhYmxlXG4vLyArYm9udXM6IGFkZCBzbW9vdGggZmFkZSBpbi8gZmFkZSBvdXQgXG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgdmFyIGdhbGxlcnkgPSBuZXcgR2FsbGVyeSh7XG5cbiAgICBnYWxsZXJ5SWQ6ICcxJyxcbiAgICBnYWxsZXJ5QW1vdW50OiAnMjAwJ1xuXG4gIH0pO1xuXG4gIC8vIGNvbnNvbGUubG9nKGdhbGxlcnkpO1xuXG4gIGdhbGxlcnkuZ2V0RGF0YSgpO1xuXG59KTsgXG5cblxuXG5cblxuZnVuY3Rpb24gR2FsbGVyeShzZXR0aW5ncykge1xuXG4gIHRoaXMuc2V0dGluZ3M9c2V0dGluZ3M7XG4gIHRoaXMuaWQ9c2V0dGluZ3MuZ2FsbGVyeUlkO1xuICB0aGlzLmRhdGFBbW91bnQ9c2V0dGluZ3MuZ2FsbGVyeUFtb3VudDtcbiAgdGhpcy5kYXRhPVtdO1xuXG59XG5cblxuXG5HYWxsZXJ5LnByb3RvdHlwZS5nZXRBcnJheVdpdGhMaW1pdGVkTGVuZ3RoID0gZnVuY3Rpb24obGVuZ3RoKSB7XG4gICBcbiAgdmFyIGFycmF5ID0gbmV3IEFycmF5KCk7XG5cbiAgYXJyYXkucHVzaCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKHRoaXMubGVuZ3RoID49IGxlbmd0aCkge1xuICAgICAgdGhpcy5zaGlmdCgpO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcyxhcmd1bWVudHMpO1xuICB9O1xuXG4gIHJldHVybiBhcnJheTtcblxuXG59O1xuXG5HYWxsZXJ5LnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICBsZXQgc2VsZj10aGlzO1xuXG4gIGxldCB1cmw9J2ltYWdlcy5qc29uJztcblxuICBsZXQgeGhyID0gc2VsZi5jcmVhdGVDT1JTUmVxdWVzdCgnR0VUJywgdXJsKTtcblxuICBpZiAoIXhocikge1xuICAgIHRocm93IG5ldyBFcnJvcignQ09SUyBub3Qgc3VwcG9ydGVkJyk7XG4gIH1cblxuICAvLyBSZXNwb25zZSBoYW5kbGVycy5cbiAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCByZXNwb25zZVRleHQgPSB4aHIucmVzcG9uc2VUZXh0O1xuXG4gICAgLy8gY29uc29sZS5sb2cocGFyc2VkSlNPTik7XG5cbiAgICBzZWxmLmluaXRpYXRlRGF0YShyZXNwb25zZVRleHQpO1xuXG5cbiAgICAgIFxuICAgIHNlbGYuc2hvd0RhdGEoc2VsZi5kYXRhKTtcbiAgXG5cblxuICB9O1xuXG4gIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zb2xlLmxvZygnV29vcHMsIHRoZXJlIHdhcyBhbiBlcnJvciBtYWtpbmcgdGhlIHJlcXVlc3QuJyk7XG4gIH07XG5cbiAgeGhyLnNlbmQoKTtcblxufTtcblxuXG5cbkdhbGxlcnkucHJvdG90eXBlLnNob3dEYXRhID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgbGV0IHNlbGY9dGhpcztcblxuXG5cbiAgbGV0IGdhbGxlcnlJdGVtcz1hcnJheTtcbiAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xuICBsZXQgZ2FsbGVyeUNvbnRhaW5lcj1bXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1nYWxsZXJ5LXdyYXAnKSk7XG5cblxuICBnYWxsZXJ5Q29udGFpbmVyLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcblxuICAgIFxuICAgIHNlbGYuZmlsbEdhbGxlcnkoZWwsZ2FsbGVyeUl0ZW1zKTtcblxuXG4gIH0pO1xuXG5cbn07XG5cblxuXG5cblxuLyogbWV0aG9kOiBVc2VyOjppbml0aWF0ZVBsYW5zKClcbiAqIHBhcnNlcyBwbGFucyBmcm9tIEpTT04gcmVwcmVzZW50YXRpb24gYW5kIGluaXRpYXRlcyBhIG5ldyBQbGFuIGZvclxuICogZWFjaCBvZiB0aGVtXG4gKi9cbkdhbGxlcnkucHJvdG90eXBlLmluaXRpYXRlRGF0YSA9IGZ1bmN0aW9uKGltYWdlc1N0cmluZykge1xuICBcbiAgdmFyIGl0ZW1zID0gSlNPTi5wYXJzZShpbWFnZXNTdHJpbmcpO1xuXG4gIHRoaXMuZGF0YSA9IHRoaXMuZ2V0QXJyYXlXaXRoTGltaXRlZExlbmd0aCgxKTtcblxuICB0aGlzLmRhdGEucHVzaChpdGVtcy5zbGljZSgwLHRoaXMuZGF0YUFtb3VudCkpO1xuXG5cblxufTtcblxuXG5cblxuXG5HYWxsZXJ5LnByb3RvdHlwZS5jcmVhdGVDT1JTUmVxdWVzdCA9IGZ1bmN0aW9uKG1ldGhvZCx1cmwpIHtcblxuXG4gIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgaWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikge1xuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIFhNTEh0dHBSZXF1ZXN0IG9iamVjdCBoYXMgYSBcIndpdGhDcmVkZW50aWFsc1wiIHByb3BlcnR5LlxuICAgIC8vIFwid2l0aENyZWRlbnRpYWxzXCIgb25seSBleGlzdHMgb24gWE1MSFRUUFJlcXVlc3QyIG9iamVjdHMuXG4gICAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXG4gIH0gZWxzZSBpZiAodHlwZW9mIFhEb21haW5SZXF1ZXN0ICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAvLyBPdGhlcndpc2UsIGNoZWNrIGlmIFhEb21haW5SZXF1ZXN0LlxuICAgIC8vIFhEb21haW5SZXF1ZXN0IG9ubHkgZXhpc3RzIGluIElFLCBhbmQgaXMgSUUncyB3YXkgb2YgbWFraW5nIENPUlMgcmVxdWVzdHMuXG4gICAgeGhyID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4obWV0aG9kLCB1cmwpO1xuXG4gIH0gZWxzZSB7XG5cbiAgICAvLyBPdGhlcndpc2UsIENPUlMgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3Nlci5cbiAgICB4aHIgPSBudWxsO1xuXG4gIH1cbiAgLy8gY29uc29sZS5sb2coeGhyKTtcbiAgcmV0dXJuIHhocjtcblxuXG5cbn07XG5cblxuXG5cbkdhbGxlcnkucHJvdG90eXBlLmZpbGxHYWxsZXJ5ID0gZnVuY3Rpb24oZWwsZGF0YSkge1xuXG5cblxuXG5cbiAgbGV0IGl0ZW1zPWRhdGFbMF07XG4gIGxldCBpdGVtc0Ftb3VudD1pdGVtcy5sZW5ndGg7XG4gIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gIGxldCBnYWxsZXJ5Q29udGFpbmVyPWVsO1xuXG4gIGxldCBnYWxsZXJ5TWF4V2lkdGg9ZWwub2Zmc2V0V2lkdGg7XG4gIC8vIGNvbnNvbGUubG9nKGdhbGxlcnlNYXhXaWR0aCk7XG5cbiAgbGV0IGdhbGxlcnlMaXN0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIGdhbGxlcnlMaXN0LmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnknLCAnanMtZ2FsbGVyeS1saXN0Jyk7XG5cblxuXG4gIC8vIGxldCBnYWxsZXJ5SXRlbT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAvLyBnYWxsZXJ5SXRlbS5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5X19pdGVtJywgJ2pzLWdhbGxlcnktaXRlbScpO1xuXG5cblxuICBmb3IgKGxldCBqPTA7IGo8aXRlbXNBbW91bnQ7aisrKSB7XG5cbiAgICBsZXQgZ2FsbGVyeUl0ZW09ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBnYWxsZXJ5SXRlbS5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5X19pdGVtJywgJ2pzLWdhbGxlcnktaXRlbScpO1xuXG4gICAgZ2FsbGVyeUl0ZW0uc3R5bGUubWF4V2lkdGg9Z2FsbGVyeU1heFdpZHRoKydweCc7XG5cbiAgICBnYWxsZXJ5SXRlbS5pbm5lckhUTUw9JzxpbWcgc3JjPVwiJytpdGVtc1tqXS51cmwrJ1wiIGNsYXNzPVwiZ2FsbGVyeV9faW1nXCI+ICc7XG4gICAgXG4gICAgZ2FsbGVyeUxpc3QuYXBwZW5kQ2hpbGQoZ2FsbGVyeUl0ZW0pO1xuXG4gIH1cblxuICAvLyBjb25zb2xlLmxvZyhnYWxsZXJ5TGlzdCk7XG5cblxuICBnYWxsZXJ5Q29udGFpbmVyLmFwcGVuZENoaWxkKGdhbGxlcnlMaXN0KTtcblxuIFxuICBsZXQgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWdhbGxlcnktaXRlbScpO1xuICBsZXQgY29udHJvbGxzO1xuICBsZXQgY3VycmVudFNsaWRlID0gMDtcbiAgbGV0IHNsaWRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChuZXh0U2xpZGUsMjAwMCk7XG5cbiAgZnVuY3Rpb24gbmV4dFNsaWRlKCkge1xuICAgIHNsaWRlc1tjdXJyZW50U2xpZGVdLmNsYXNzTGlzdC50b2dnbGUoJ2lzLXZpc2libGUnKTtcbiAgICBjdXJyZW50U2xpZGUgPSAoY3VycmVudFNsaWRlKzEpJXNsaWRlcy5sZW5ndGg7XG4gICAgc2xpZGVzW2N1cnJlbnRTbGlkZV0uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtdmlzaWJsZScpO1xuICB9XG5cblxuXG5cblxuXG5cblxuIFxufTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9zbGlkZXIuanMiXSwibWFwcGluZ3MiOiI7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFHQTtBQUNBO0FBS0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFLQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBSUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(0);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvYXBwLmpzPzcxNmYiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgJy4vc2xpZGVyJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvYXBwLmpzIl0sIm1hcHBpbmdzIjoiOztBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///1\n");

/***/ })
/******/ ]);