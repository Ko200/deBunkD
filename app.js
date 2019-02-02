/* if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js')
             .then(function() { console.log('Service Worker Registered'); });
} */

$("a").click((e)=>{
  e.preventDefault();
  console.log(e.target.href);
  $("#ham").click();
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

              tmps={};
              tmps.dayentry=[{},{},{},{},{},{},{}]
              if(!localStorage.getItem("timetable"))
              {
                //pop up time table
                $("#timetable").modal();
              }
              else
              {
                tmps.timetable=localStorage.getItem('timetable');
              }
              function getMonthFromString(mon)
              {
              var d = Date.parse(mon + "1, 2012");
              if(!isNaN(d))
              {
                return new Date(d).getMonth();
              }
              return -1;
              }
              function cal(year,month)
              {
                tmps.year=year;
                tmps.month=month;
                console.log(year+" "+month)
                monthS=new Date(year,month).toLocaleString('en-us',{'month':'long'});
                $("#month").html(monthS);
                $("#year").html(year);
                start=new Date(year,month,1);
                startday=(start.getDay()+6)%7;
                li=document.createElement("li");
                li.setAttribute('data-toggle','modal');
                li.setAttribute('data-target','daysclass');
                ul=$(".days")[0];
                ul.innerHTML="";
                for(i=0;i<startday;i++)
                {
                  ul.append(li.cloneNode(deep=true));
                }
                for(i=1;new Date(year,month,i).getMonth()==month;i++)
                {
                  l=li.cloneNode(deep=true);
                  l.addEventListener("click",(e)=>{
                  tmps.day=e.target.innerHTML;
                  });
                  $(l).click((e)=>{
                    $("#daysclass").modal();
                  })
                  if(passall(year,month,i))
                  {
                    $(l).addClass('pass');
                  }
                  if(fail(year,month,i))
                  {
                    $(l).addClass("fail");
                  }
                  if(holiday(year,month,i))
                  {
                    $(l).addClass("holi");
                  }
                  l.innerHTML=i;
                  ul.append(l);
                }
              }
              function passall(y,m,d)
              {
                return 1;
              }
              function fail(y,m,d)
              {
                return 1;
              }
              function holiday(y,m,d)
              {
                if(new Date(y,m,d).getDay()==0)
                {
                  return 1;
                }
                return 0;
              }
              function present(i)
              {
                try
                {if(tmps.dayentry[i].present==null||tmps.dayentry[i].present)
                  return true;
                else
                  return false;
                }
                catch(e){
                  return true;
                }
              }

              function absent(i)
              {
                try {
                return tmps.dayentry[i].absent;
                }catch(e){return false};
              }

              function cancel(i)
              {
                try {
                return tmps.dayentry[i].cancel;
                }catch(e){return false};
              }
function createATT(obj)
  {
    if(!localStorage.getItem(obj.subject))
    {
    localStorage.setItem(obj.subject,JSON.stringify(obj));
    list=JSON.parse(localStorage.getItem("list"));
    list.push(obj.subject);
    localStorage.setItem('list',JSON.stringify(list));
    }
    let ele=document.getElementById("subjectbox").content.cloneNode(deep=true).children[0];
    let attendanceCount=ele.getElementsByClassName('attended')[0];
    let bunkCount=ele.getElementsByClassName("bunked")[0];
    let minreq=ele.getElementsByClassName("minreq")[0];
    let attpercent=ele.getElementsByClassName("attendance")[0];
    let subject=ele.getElementsByClassName("subject")[0];
    let bunkText=ele.getElementsByClassName("bunktext")[0];
    let to=ele.getElementsByClassName("to-bunk")[0];
    document.getElementsByClassName("container")[1].appendChild(ele);
    subject.innerHTML=obj.subject;
    attendanceCount.innerHTML=obj.attended;
    bunkCount.innerHTML=obj.bunked;
    minreq.innerHTML=obj.minreq;
    attpercent.innerHTML=obj.attpercent;
    setText(obj,bunkText,to);

    ele.getElementsByClassName("attendup")[0].addEventListener('click',(e)=>{
      obj.attended+=1;
      attendanceCount.innerHTML=obj.attended;
      attendpercent(obj);
      setText(obj,bunkText,to);
      attpercent.innerHTML=obj.attpercent;
      //localStorage.setItem(obj.subject,JSON.stringify(obj));
    });
    ele.getElementsByClassName("attenddown")[0].addEventListener('click',(e)=>{
      obj.attended-=1;
      attendanceCount.innerHTML=obj.attended;
      attendpercent(obj);
      setText(obj,bunkText,to);
      attpercent.innerHTML=obj.attpercent;
      //localStorage.setItem(obj.subject,JSON.stringify(obj));
    });
    ele.getElementsByClassName("bunkup")[0].addEventListener('click',(e)=>{
      obj.bunked+=1;
      bunkCount.innerHTML=obj.bunked;
      attendpercent(obj);
      setText(obj,bunkText,to);
      attpercent.innerHTML=obj.attpercent;
      //localStorage.setItem(obj.subject,JSON.stringify(obj));
    });
    ele.getElementsByClassName("bunkdown")[0].addEventListener('click',(e)=>{
      obj.bunked-=1;
      bunkCount.innerHTML=obj.bunked;
      attendpercent(obj);
      setText(obj,bunkText,to);
      attpercent.innerHTML=obj.attpercent;
      //localStorage.setItem(obj.subject,JSON.stringify(obj));
    });
  }

  function toattend(obj)
  {
    return 3*obj.bunked-obj.attended;
  }

  function tobunk(obj)
  {
    return Math.floor(obj.attended/3)-obj.bunked;
  }

  function attendpercent(obj)
  {
    return obj.attpercent=obj.attended*100/(obj.attended+obj.bunked);
  }

  function setText(obj,bunkText,to)
  {
    if(obj.attpercent>obj.minreq)
    {
      bunkText.innerHTML="Maximum lectures you can bunk";
      to.innerHTML=tobunk(obj);
    }
    else{
      bunkText.innerHTML="Maximum lectures you must attend";
      to.innerHTML=toattend(obj);
    }
  }