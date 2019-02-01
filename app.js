if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

$("a").click((e)=>{
  e.preventDefault();
  console.log(e.target.href);
  $("#content").load(e.target.href);
})