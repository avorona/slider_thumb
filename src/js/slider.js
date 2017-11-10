
import   {getArrayWithLimitedLength} from './lib/helpers';


// send request
// initialize slider
// inititalize thumbnails
// add navigation
// add loader
// check for reusable
// +bonus: add smooth fade in/ fade out 




// console.log(imagesArray);

document.addEventListener('DOMContentLoaded', function() {


  function sendRequest() {
 
    let url='images.json';

    function createCORSRequest(method, url) {
      var xhr = new XMLHttpRequest();
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
      return xhr;
    }

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
      throw new Error('CORS not supported');
    }
    // Response handlers.
    xhr.onload = function() {
      var text = xhr.responseText;
      var parsedJSON = JSON.parse(text);
      // console.log(parsedJSON);

      let imagesArray = getArrayWithLimitedLength(1);
      imagesArray.push(parsedJSON.slice(0,100));
      // console.log(imagesArray);
      handleResponse(imagesArray);

    };

    xhr.onerror = function() {

      console.log('Woops, there was an error making the request.');
    };

    xhr.send();
  }


  sendRequest();


});


function handleResponse(responseArray) {
  console.log(responseArray);
}
