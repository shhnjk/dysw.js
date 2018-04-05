# dysw.js

## How to use:
```
<img src="/test">
<script>
  navigator.serviceWorker.register('/dysw.js?cors=no-cors&match=test&url=https://shhnjk.com/test.jpeg')
  .then(function(reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
  });
</script>
```
