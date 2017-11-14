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
eval("\n\nvar _helpers = __webpack_require__(2);\n\n// send request\n// initialize slider\n// inititalize thumbnails\n// add navigation\n// add loader\n// check for reusable\n// +bonus: add smooth fade in/ fade out \n\n\n// console.log(imagesArray);\n\ndocument.addEventListener('DOMContentLoaded', function () {\n\n  function sendRequest() {\n\n    var url = 'images.json';\n\n    function createCORSRequest(method, url) {\n      var xhr = new XMLHttpRequest();\n      if ('withCredentials' in xhr) {\n\n        // Check if the XMLHttpRequest object has a \"withCredentials\" property.\n        // \"withCredentials\" only exists on XMLHTTPRequest2 objects.\n        xhr.open(method, url, true);\n      } else if (typeof XDomainRequest != 'undefined') {\n\n        // Otherwise, check if XDomainRequest.\n        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.\n        xhr = new XDomainRequest();\n        xhr.open(method, url);\n      } else {\n\n        // Otherwise, CORS is not supported by the browser.\n        xhr = null;\n      }\n      return xhr;\n    }\n\n    var xhr = createCORSRequest('GET', url);\n    if (!xhr) {\n      throw new Error('CORS not supported');\n    }\n    // Response handlers.\n    xhr.onload = function () {\n      var text = xhr.responseText;\n      var parsedJSON = JSON.parse(text);\n      // console.log(parsedJSON);\n\n      var imagesArray = (0, _helpers.getArrayWithLimitedLength)(1);\n      imagesArray.push(parsedJSON.slice(0, 100));\n      // console.log(imagesArray);\n      handleResponse(imagesArray);\n    };\n\n    xhr.onerror = function () {\n\n      console.log('Woops, there was an error making the request.');\n    };\n\n    xhr.send();\n  }\n\n  sendRequest();\n});\n\nfunction handleResponse(responseArray) {\n\n  var galleryItems = responseArray[0];\n\n  // console.log(galleryItems);\n\n  var galleryContainer = [].slice.call(document.querySelectorAll('.js-gallery-wrap'));\n\n  galleryContainer.forEach(function (el) {\n\n    fillGallery(el, galleryItems);\n  });\n}\n\nfunction fillGallery(el, data) {\n\n  var items = data;\n  var itemsAmount = items.length;\n  // console.log(data);\n\n  var galleryContainer = el;\n\n  var galleryMaxWidth = el.offsetWidth;\n  // console.log(galleryMaxWidth);\n\n  var galleryList = document.createElement('ul');\n  galleryList.classList.add('gallery', 'js-gallery-list');\n\n  // let galleryItem=document.createElement('li');\n  // galleryItem.classList.add('gallery__item', 'js-gallery-item');\n\n\n  for (var j = 0; j < itemsAmount; j++) {\n\n    var galleryItem = document.createElement('li');\n    galleryItem.classList.add('gallery__item', 'js-gallery-item');\n\n    galleryItem.style.maxWidth = galleryMaxWidth + 'px';\n\n    galleryItem.innerHTML = '<img src=\"' + items[j].url + '\" class=\"gallery__img\"> ';\n\n    galleryList.appendChild(galleryItem);\n  }\n\n  // console.log(galleryList);\n\n\n  galleryContainer.appendChild(galleryList);\n\n  var slides = document.querySelectorAll('.js-gallery-item');\n\n  var currentSlide = 0;\n  var slideInterval = setInterval(nextSlide, 2000);\n\n  function nextSlide() {\n    slides[currentSlide].classList.toggle('is-visible');\n    currentSlide = (currentSlide + 1) % slides.length;\n    slides[currentSlide].classList.toggle('is-visible');\n  }\n\n  // let galleryWidth=parseInt(galleryMaxWidth*itemsAmount)+'px';\n\n  // console.log(galleryWidth);\n\n\n  // galleryList.style.width=galleryWidth;\n\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvc2xpZGVyLmpzP2QxYzIiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgICB7Z2V0QXJyYXlXaXRoTGltaXRlZExlbmd0aH0gZnJvbSAnLi9saWIvaGVscGVycyc7XG5cblxuLy8gc2VuZCByZXF1ZXN0XG4vLyBpbml0aWFsaXplIHNsaWRlclxuLy8gaW5pdGl0YWxpemUgdGh1bWJuYWlsc1xuLy8gYWRkIG5hdmlnYXRpb25cbi8vIGFkZCBsb2FkZXJcbi8vIGNoZWNrIGZvciByZXVzYWJsZVxuLy8gK2JvbnVzOiBhZGQgc21vb3RoIGZhZGUgaW4vIGZhZGUgb3V0IFxuXG5cblxuXG4vLyBjb25zb2xlLmxvZyhpbWFnZXNBcnJheSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcblxuXG4gIGZ1bmN0aW9uIHNlbmRSZXF1ZXN0KCkge1xuIFxuICAgIGxldCB1cmw9J2ltYWdlcy5qc29uJztcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNPUlNSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG5cbiAgICAgIC8vIENoZWNrIGlmIHRoZSBYTUxIdHRwUmVxdWVzdCBvYmplY3QgaGFzIGEgXCJ3aXRoQ3JlZGVudGlhbHNcIiBwcm9wZXJ0eS5cbiAgICAgIC8vIFwid2l0aENyZWRlbnRpYWxzXCIgb25seSBleGlzdHMgb24gWE1MSFRUUFJlcXVlc3QyIG9iamVjdHMuXG4gICAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcblxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgWERvbWFpblJlcXVlc3QgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgLy8gT3RoZXJ3aXNlLCBjaGVjayBpZiBYRG9tYWluUmVxdWVzdC5cbiAgICAgIC8vIFhEb21haW5SZXF1ZXN0IG9ubHkgZXhpc3RzIGluIElFLCBhbmQgaXMgSUUncyB3YXkgb2YgbWFraW5nIENPUlMgcmVxdWVzdHMuXG4gICAgICAgIHhociA9IG5ldyBYRG9tYWluUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbihtZXRob2QsIHVybCk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIE90aGVyd2lzZSwgQ09SUyBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBicm93c2VyLlxuICAgICAgICB4aHIgPSBudWxsO1xuXG4gICAgICB9XG4gICAgICByZXR1cm4geGhyO1xuICAgIH1cblxuICAgIHZhciB4aHIgPSBjcmVhdGVDT1JTUmVxdWVzdCgnR0VUJywgdXJsKTtcbiAgICBpZiAoIXhocikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDT1JTIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gICAgLy8gUmVzcG9uc2UgaGFuZGxlcnMuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRleHQgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgdmFyIHBhcnNlZEpTT04gPSBKU09OLnBhcnNlKHRleHQpO1xuICAgICAgLy8gY29uc29sZS5sb2cocGFyc2VkSlNPTik7XG5cbiAgICAgIGxldCBpbWFnZXNBcnJheSA9IGdldEFycmF5V2l0aExpbWl0ZWRMZW5ndGgoMSk7XG4gICAgICBpbWFnZXNBcnJheS5wdXNoKHBhcnNlZEpTT04uc2xpY2UoMCwxMDApKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGltYWdlc0FycmF5KTtcbiAgICAgIGhhbmRsZVJlc3BvbnNlKGltYWdlc0FycmF5KTtcblxuICAgIH07XG5cbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICBjb25zb2xlLmxvZygnV29vcHMsIHRoZXJlIHdhcyBhbiBlcnJvciBtYWtpbmcgdGhlIHJlcXVlc3QuJyk7XG4gICAgfTtcblxuICAgIHhoci5zZW5kKCk7XG4gIH1cblxuXG4gIHNlbmRSZXF1ZXN0KCk7XG5cblxufSk7XG5cblxuZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2UocmVzcG9uc2VBcnJheSkge1xuXG5cblxuICBsZXQgZ2FsbGVyeUl0ZW1zPXJlc3BvbnNlQXJyYXlbMF07XG5cbiAgLy8gY29uc29sZS5sb2coZ2FsbGVyeUl0ZW1zKTtcblxuICBsZXQgZ2FsbGVyeUNvbnRhaW5lcj1bXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1nYWxsZXJ5LXdyYXAnKSk7XG5cblxuICBnYWxsZXJ5Q29udGFpbmVyLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcblxuICAgIFxuICAgIGZpbGxHYWxsZXJ5KGVsLGdhbGxlcnlJdGVtcyk7XG5cblxuICB9KTtcblxuXG59XG5cblxuXG5mdW5jdGlvbiBmaWxsR2FsbGVyeShlbCxkYXRhKSB7XG5cbiAgbGV0IGl0ZW1zPWRhdGE7XG4gIGxldCBpdGVtc0Ftb3VudD1pdGVtcy5sZW5ndGg7XG4gIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gIGxldCBnYWxsZXJ5Q29udGFpbmVyPWVsO1xuXG4gIGxldCBnYWxsZXJ5TWF4V2lkdGg9ZWwub2Zmc2V0V2lkdGg7XG4gIC8vIGNvbnNvbGUubG9nKGdhbGxlcnlNYXhXaWR0aCk7XG5cbiAgbGV0IGdhbGxlcnlMaXN0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIGdhbGxlcnlMaXN0LmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnknLCAnanMtZ2FsbGVyeS1saXN0Jyk7XG5cblxuXG4gIC8vIGxldCBnYWxsZXJ5SXRlbT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAvLyBnYWxsZXJ5SXRlbS5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5X19pdGVtJywgJ2pzLWdhbGxlcnktaXRlbScpO1xuXG5cblxuICBmb3IgKGxldCBqPTA7IGo8aXRlbXNBbW91bnQ7aisrKSB7XG5cbiAgICBsZXQgZ2FsbGVyeUl0ZW09ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBnYWxsZXJ5SXRlbS5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5X19pdGVtJywgJ2pzLWdhbGxlcnktaXRlbScpO1xuXG4gICAgZ2FsbGVyeUl0ZW0uc3R5bGUubWF4V2lkdGg9Z2FsbGVyeU1heFdpZHRoKydweCc7XG5cbiAgICBnYWxsZXJ5SXRlbS5pbm5lckhUTUw9JzxpbWcgc3JjPVwiJytpdGVtc1tqXS51cmwrJ1wiIGNsYXNzPVwiZ2FsbGVyeV9faW1nXCI+ICc7XG4gICAgXG4gICAgZ2FsbGVyeUxpc3QuYXBwZW5kQ2hpbGQoZ2FsbGVyeUl0ZW0pO1xuXG4gIH1cblxuICAvLyBjb25zb2xlLmxvZyhnYWxsZXJ5TGlzdCk7XG5cblxuIGdhbGxlcnlDb250YWluZXIuYXBwZW5kQ2hpbGQoZ2FsbGVyeUxpc3QpO1xuXG4gXG4gIGxldCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZ2FsbGVyeS1pdGVtJyk7XG5cbiAgbGV0IGN1cnJlbnRTbGlkZSA9IDA7XG4gIGxldCBzbGlkZUludGVydmFsID0gc2V0SW50ZXJ2YWwobmV4dFNsaWRlLDIwMDApO1xuXG4gIGZ1bmN0aW9uIG5leHRTbGlkZSgpIHtcbiAgICBzbGlkZXNbY3VycmVudFNsaWRlXS5jbGFzc0xpc3QudG9nZ2xlKCdpcy12aXNpYmxlJyk7XG4gICAgY3VycmVudFNsaWRlID0gKGN1cnJlbnRTbGlkZSsxKSVzbGlkZXMubGVuZ3RoO1xuICAgIHNsaWRlc1tjdXJyZW50U2xpZGVdLmNsYXNzTGlzdC50b2dnbGUoJ2lzLXZpc2libGUnKTtcbiAgfVxuXG4gIC8vIGxldCBnYWxsZXJ5V2lkdGg9cGFyc2VJbnQoZ2FsbGVyeU1heFdpZHRoKml0ZW1zQW1vdW50KSsncHgnO1xuXG4gIC8vIGNvbnNvbGUubG9nKGdhbGxlcnlXaWR0aCk7XG5cblxuICAvLyBnYWxsZXJ5TGlzdC5zdHlsZS53aWR0aD1nYWxsZXJ5V2lkdGg7XG5cbiBcblxuXG59XG5cblxuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9zbGlkZXIuanMiXSwibWFwcGluZ3MiOiI7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFHQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(0);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvYXBwLmpzPzcxNmYiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgJy4vc2xpZGVyJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvYXBwLmpzIl0sIm1hcHBpbmdzIjoiOztBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getArrayWithLimitedLength = getArrayWithLimitedLength;\nfunction getArrayWithLimitedLength(length) {\n  var array = new Array();\n\n  array.push = function () {\n    if (this.length >= length) {\n      this.shift();\n    }\n    return Array.prototype.push.apply(this, arguments);\n  };\n\n  return array;\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvbGliL2hlbHBlcnMuanM/Mzg3YyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0QXJyYXlXaXRoTGltaXRlZExlbmd0aChsZW5ndGgpIHtcbiAgdmFyIGFycmF5ID0gbmV3IEFycmF5KCk7XG5cbiAgYXJyYXkucHVzaCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA+PSBsZW5ndGgpIHtcbiAgICAgIHRoaXMuc2hpZnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtcbiAgfTtcblxuICByZXR1cm4gYXJyYXk7XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvbGliL2hlbHBlcnMuanMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n");

/***/ })
/******/ ]);