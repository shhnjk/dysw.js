onfetch = event => {
  var params = self.location.href.split("?")[1].split("&");
  var cors, match, url, custom;
  params.forEach(param => {
    if(param.startsWith("cors")){
      cors = param.split("=")[1];
    }else if(param.startsWith("match")){
      match = param.split("=")[1];
    }else if(param.startsWith("url")){
      url = param.split("=")[1];
    }else if(param.startsWith("custom")){
      custom = param.split("=")[1];
    }
  });

  if(event.request.url.endsWith(match)){
    console.log("Match: " + event.request.url);
    if(custom){
      var split = event.request.url.split("/");
      for(var i=3; i < split.length; i++){
        custom += "/" + split[i];
      }
      custom = custom.split(match)[0];
      event.respondWith(fetch(custom, {mode: cors}));
    }else{
      event.respondWith(fetch(url, {mode: cors}));
    }

  }
}
