/* if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js')
             .then(function() { console.log('Service Worker Registered'); });
} */

$("a").click((e)=>{
  e.preventDefault();
  console.log(e.target.href);
  m=$("#content").load(e.target.href,()=>{
  if('cal' in window)
  {
      console.log("in ready!")
      tdy=new Date()
      monthS=tdy.toLocaleString('en-us',{'month':'long'});
      month=tdy.getMonth();
      year=tdy.getFullYear();
      cal(year,month);
  }});
})
