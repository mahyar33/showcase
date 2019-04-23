# Network Usage 

You need to import [HttpRequest](/src/network/HttpRequest.html) for communicating with APIs.
This will provide set of [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) methods such as HttpRequest.post, HttpRequest.get, HttpRequest.put and ... to get data or submit data to the restful API.  

## Sample POST Request
**Notice : Other methods usage(get,put,...) are the same**
```
HttpRequest.post('/cars/create', { make: 'Mazda' })
  .then((response) => {
    //if successful
  })
  .catch((error) => {
    //if not
  });
```


## Sample PostFile Request
You can check [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) and [File](https://developer.mozilla.org/en-US/docs/Web/API/File) before reading this sample.
```
let formData = new FormData();
//file is your binary file
formData.append("image", files);
HttpRequest.postFile('/cars/upload', formData)
  .then((response) => {
    //if successful
  })
  .catch((error) => {
    //if not
  });
```

