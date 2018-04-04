onfetch = event => {
  var params = self.location.href.split("?")[1].split("&");
  var cors, match, url;
  params.forEach(param => {
    if(param.startsWith("cors")){
      cors = param.split("=")[1];
    }else if(param.startsWith("match")){
      match = param.split("=")[1];
    }else if(param.startsWith("url")){
      url = param.split("=")[1];
    }
  });

  if(event.request.url.endsWith(match)){
    event.respondWith(fetch(url, {mode: cors}));
  }
}