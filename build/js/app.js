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
eval("\n\nvar _helpers = __webpack_require__(2);\n\n// send request\n// initialize slider\n// inititalize thumbnails\n// add navigation\n// add loader\n// check for reusable\n// +bonus: add smooth fade in/ fade out \n\n\n// console.log(imagesArray);\n\ndocument.addEventListener('DOMContentLoaded', function () {\n\n  function Gallery(data) {\n    this.data = data;\n    this;\n  }\n\n  function sendRequest() {\n\n    var url = 'images.json';\n\n    function createCORSRequest(method, url) {\n      var xhr = new XMLHttpRequest();\n      if ('withCredentials' in xhr) {\n\n        // Check if the XMLHttpRequest object has a \"withCredentials\" property.\n        // \"withCredentials\" only exists on XMLHTTPRequest2 objects.\n        xhr.open(method, url, true);\n      } else if (typeof XDomainRequest != 'undefined') {\n\n        // Otherwise, check if XDomainRequest.\n        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.\n        xhr = new XDomainRequest();\n        xhr.open(method, url);\n      } else {\n\n        // Otherwise, CORS is not supported by the browser.\n        xhr = null;\n      }\n      return xhr;\n    }\n\n    var xhr = createCORSRequest('GET', url);\n    if (!xhr) {\n      throw new Error('CORS not supported');\n    }\n    // Response handlers.\n    xhr.onload = function () {\n      var text = xhr.responseText;\n      var parsedJSON = JSON.parse(text);\n      // console.log(parsedJSON);\n\n      var imagesArray = (0, _helpers.getArrayWithLimitedLength)(1);\n      imagesArray.push(parsedJSON.slice(0, 100));\n      // console.log(imagesArray);\n      handleResponse(imagesArray);\n    };\n\n    xhr.onerror = function () {\n\n      console.log('Woops, there was an error making the request.');\n    };\n\n    xhr.send();\n  }\n\n  sendRequest();\n});\n\nfunction handleResponse(responseArray) {\n\n  var galleryItems = responseArray[0];\n\n  // console.log(galleryItems);\n\n  var galleryContainer = [].slice.call(document.querySelectorAll('.js-gallery-wrap'));\n\n  galleryContainer.forEach(function (el) {\n\n    fillGallery(el, galleryItems);\n  });\n}\n\nfunction fillGallery(el, data) {\n\n  var items = data;\n  var itemsAmount = items.length;\n  // console.log(data);\n\n  var galleryContainer = el;\n\n  var galleryMaxWidth = el.offsetWidth;\n  // console.log(galleryMaxWidth);\n\n  var galleryList = document.createElement('ul');\n  galleryList.classList.add('gallery', 'js-gallery-list');\n\n  // let galleryItem=document.createElement('li');\n  // galleryItem.classList.add('gallery__item', 'js-gallery-item');\n\n\n  for (var j = 0; j < itemsAmount; j++) {\n\n    var galleryItem = document.createElement('li');\n    galleryItem.classList.add('gallery__item', 'js-gallery-item');\n\n    galleryItem.style.maxWidth = galleryMaxWidth + 'px';\n\n    galleryItem.innerHTML = '<img src=\"' + items[j].url + '\" class=\"gallery__img\"> ';\n\n    galleryList.appendChild(galleryItem);\n  }\n\n  // console.log(galleryList);\n\n\n  galleryContainer.appendChild(galleryList);\n\n  var slides = document.querySelectorAll('.js-gallery-item');\n  var controlls = void 0;\n  var currentSlide = 0;\n\n  function nextSlide() {\n    slides[currentSlide].classList.toggle('is-visible');\n    currentSlide = (currentSlide + 1) % slides.length;\n    slides[currentSlide].classList.toggle('is-visible');\n  }\n\n  // let galleryWidth=parseInt(galleryMaxWidth*itemsAmount)+'px';\n\n  // console.log(galleryWidth);\n\n\n  // galleryList.style.width=galleryWidth;\n\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvc2xpZGVyLmpzP2QxYzIiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgICB7Z2V0QXJyYXlXaXRoTGltaXRlZExlbmd0aH0gZnJvbSAnLi9saWIvaGVscGVycyc7XG5cblxuLy8gc2VuZCByZXF1ZXN0XG4vLyBpbml0aWFsaXplIHNsaWRlclxuLy8gaW5pdGl0YWxpemUgdGh1bWJuYWlsc1xuLy8gYWRkIG5hdmlnYXRpb25cbi8vIGFkZCBsb2FkZXJcbi8vIGNoZWNrIGZvciByZXVzYWJsZVxuLy8gK2JvbnVzOiBhZGQgc21vb3RoIGZhZGUgaW4vIGZhZGUgb3V0IFxuXG5cblxuXG4vLyBjb25zb2xlLmxvZyhpbWFnZXNBcnJheSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcblxuXG5cblxuZnVuY3Rpb24gR2FsbGVyeShkYXRhKSB7XG4gIHRoaXMuZGF0YT1kYXRhO1xuICB0aGlzXG59XG5cblxuXG5cblxuXG5cblxuICBmdW5jdGlvbiBzZW5kUmVxdWVzdCgpIHtcbiBcbiAgICBsZXQgdXJsPSdpbWFnZXMuanNvbic7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDT1JTUmVxdWVzdChtZXRob2QsIHVybCkge1xuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgaWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikge1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGUgWE1MSHR0cFJlcXVlc3Qgb2JqZWN0IGhhcyBhIFwid2l0aENyZWRlbnRpYWxzXCIgcHJvcGVydHkuXG4gICAgICAvLyBcIndpdGhDcmVkZW50aWFsc1wiIG9ubHkgZXhpc3RzIG9uIFhNTEhUVFBSZXF1ZXN0MiBvYmplY3RzLlxuICAgICAgICB4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG5cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIFhEb21haW5SZXF1ZXN0ICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgIC8vIE90aGVyd2lzZSwgY2hlY2sgaWYgWERvbWFpblJlcXVlc3QuXG4gICAgICAvLyBYRG9tYWluUmVxdWVzdCBvbmx5IGV4aXN0cyBpbiBJRSwgYW5kIGlzIElFJ3Mgd2F5IG9mIG1ha2luZyBDT1JTIHJlcXVlc3RzLlxuICAgICAgICB4aHIgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBPdGhlcndpc2UsIENPUlMgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3Nlci5cbiAgICAgICAgeGhyID0gbnVsbDtcblxuICAgICAgfVxuICAgICAgcmV0dXJuIHhocjtcbiAgICB9XG5cbiAgICB2YXIgeGhyID0gY3JlYXRlQ09SU1JlcXVlc3QoJ0dFVCcsIHVybCk7XG4gICAgaWYgKCF4aHIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ09SUyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfVxuICAgIC8vIFJlc3BvbnNlIGhhbmRsZXJzLlxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0ZXh0ID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgIHZhciBwYXJzZWRKU09OID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHBhcnNlZEpTT04pO1xuXG4gICAgICBsZXQgaW1hZ2VzQXJyYXkgPSBnZXRBcnJheVdpdGhMaW1pdGVkTGVuZ3RoKDEpO1xuICAgICAgaW1hZ2VzQXJyYXkucHVzaChwYXJzZWRKU09OLnNsaWNlKDAsMTAwKSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhpbWFnZXNBcnJheSk7XG4gICAgICBoYW5kbGVSZXNwb25zZShpbWFnZXNBcnJheSk7XG5cbiAgICB9O1xuXG4gICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblxuICAgICAgY29uc29sZS5sb2coJ1dvb3BzLCB0aGVyZSB3YXMgYW4gZXJyb3IgbWFraW5nIHRoZSByZXF1ZXN0LicpO1xuICAgIH07XG5cbiAgICB4aHIuc2VuZCgpO1xuICB9XG5cblxuICBzZW5kUmVxdWVzdCgpO1xuXG5cbn0pO1xuXG5cbmZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlQXJyYXkpIHtcblxuXG5cbiAgbGV0IGdhbGxlcnlJdGVtcz1yZXNwb25zZUFycmF5WzBdO1xuXG4gIC8vIGNvbnNvbGUubG9nKGdhbGxlcnlJdGVtcyk7XG5cbiAgbGV0IGdhbGxlcnlDb250YWluZXI9W10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZ2FsbGVyeS13cmFwJykpO1xuXG5cbiAgZ2FsbGVyeUNvbnRhaW5lci5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG5cbiAgICBcbiAgICBmaWxsR2FsbGVyeShlbCxnYWxsZXJ5SXRlbXMpO1xuXG5cbiAgfSk7XG5cblxufVxuXG5cblxuZnVuY3Rpb24gZmlsbEdhbGxlcnkoZWwsZGF0YSkge1xuXG4gIGxldCBpdGVtcz1kYXRhO1xuICBsZXQgaXRlbXNBbW91bnQ9aXRlbXMubGVuZ3RoO1xuICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcblxuICBsZXQgZ2FsbGVyeUNvbnRhaW5lcj1lbDtcblxuICBsZXQgZ2FsbGVyeU1heFdpZHRoPWVsLm9mZnNldFdpZHRoO1xuICAvLyBjb25zb2xlLmxvZyhnYWxsZXJ5TWF4V2lkdGgpO1xuXG4gIGxldCBnYWxsZXJ5TGlzdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICBnYWxsZXJ5TGlzdC5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5JywgJ2pzLWdhbGxlcnktbGlzdCcpO1xuXG5cblxuICAvLyBsZXQgZ2FsbGVyeUl0ZW09ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgLy8gZ2FsbGVyeUl0ZW0uY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeV9faXRlbScsICdqcy1nYWxsZXJ5LWl0ZW0nKTtcblxuXG5cbiAgZm9yIChsZXQgaj0wOyBqPGl0ZW1zQW1vdW50O2orKykge1xuXG4gICAgbGV0IGdhbGxlcnlJdGVtPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZ2FsbGVyeUl0ZW0uY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeV9faXRlbScsICdqcy1nYWxsZXJ5LWl0ZW0nKTtcblxuICAgIGdhbGxlcnlJdGVtLnN0eWxlLm1heFdpZHRoPWdhbGxlcnlNYXhXaWR0aCsncHgnO1xuXG4gICAgZ2FsbGVyeUl0ZW0uaW5uZXJIVE1MPSc8aW1nIHNyYz1cIicraXRlbXNbal0udXJsKydcIiBjbGFzcz1cImdhbGxlcnlfX2ltZ1wiPiAnO1xuICAgIFxuICAgIGdhbGxlcnlMaXN0LmFwcGVuZENoaWxkKGdhbGxlcnlJdGVtKTtcblxuICB9XG5cbiAgLy8gY29uc29sZS5sb2coZ2FsbGVyeUxpc3QpO1xuXG5cbiAgZ2FsbGVyeUNvbnRhaW5lci5hcHBlbmRDaGlsZChnYWxsZXJ5TGlzdCk7XG5cbiBcbiAgbGV0IHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1nYWxsZXJ5LWl0ZW0nKTtcbiAgbGV0IGNvbnRyb2xsc1xuICBsZXQgY3VycmVudFNsaWRlID0gMDtcbiAgXG5cbiAgZnVuY3Rpb24gbmV4dFNsaWRlKCkge1xuICAgIHNsaWRlc1tjdXJyZW50U2xpZGVdLmNsYXNzTGlzdC50b2dnbGUoJ2lzLXZpc2libGUnKTtcbiAgICBjdXJyZW50U2xpZGUgPSAoY3VycmVudFNsaWRlKzEpJXNsaWRlcy5sZW5ndGg7XG4gICAgc2xpZGVzW2N1cnJlbnRTbGlkZV0uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtdmlzaWJsZScpO1xuICB9XG5cblxuXG5cbiAgLy8gbGV0IGdhbGxlcnlXaWR0aD1wYXJzZUludChnYWxsZXJ5TWF4V2lkdGgqaXRlbXNBbW91bnQpKydweCc7XG5cbiAgLy8gY29uc29sZS5sb2coZ2FsbGVyeVdpZHRoKTtcblxuXG4gIC8vIGdhbGxlcnlMaXN0LnN0eWxlLndpZHRoPWdhbGxlcnlXaWR0aDtcblxuIFxuXG5cbn1cblxuXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL3NsaWRlci5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFHQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(0);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvYXBwLmpzPzcxNmYiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCAnLi9zbGlkZXInO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9hcHAuanMiXSwibWFwcGluZ3MiOiI7O0FBRUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getArrayWithLimitedLength = getArrayWithLimitedLength;\nfunction getArrayWithLimitedLength(length) {\n  var array = new Array();\n\n  array.push = function () {\n    if (this.length >= length) {\n      this.shift();\n    }\n    return Array.prototype.push.apply(this, arguments);\n  };\n\n  return array;\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvbGliL2hlbHBlcnMuanM/Mzg3YyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0QXJyYXlXaXRoTGltaXRlZExlbmd0aChsZW5ndGgpIHtcbiAgdmFyIGFycmF5ID0gbmV3IEFycmF5KCk7XG5cbiAgYXJyYXkucHVzaCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA+PSBsZW5ndGgpIHtcbiAgICAgIHRoaXMuc2hpZnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtcbiAgfTtcblxuICByZXR1cm4gYXJyYXk7XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvbGliL2hlbHBlcnMuanMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n");

/***/ })
/******/ ]);