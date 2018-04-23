onfetch = event => {
  var params = self.location.href.split("?")[1].split("&");
  var cors, match, url, custom, redirect, cred = "omit";
  params.forEach(param => {
    if(param.startsWith("cors")){
      cors = param.split("=")[1];
    }else if(param.startsWith("match")){
      match = param.split("=")[1];
    }else if(param.startsWith("url")){
      url = param.split("=")[1];
      url = decodeURIComponent(url);
    }else if(param.startsWith("custom")){
      custom = param.split("=")[1];
      custom = decodeURIComponent(custom);
    }else if(param.startsWith("cred")){
      cred = param.split("=")[1];
    }else if(param.startsWith("redirect")){
      redirect = param.split("=")[1];
      redirect = decodeURIComponent(redirect);
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
      event.respondWith(fetch(custom, {mode: cors, credentials: cred}));
    }else{
      event.respondWith(fetch(url, {mode: cors, credentials: cred}));
    }

  }else if(event.request.url.endsWith("redirect")){
    console.log("Redirect: " + event.request.url);
    event.respondWith(fetch("/").then(()=>{
        return Response.redirect(redirect);
    }));
  }
}
