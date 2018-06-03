
var background = chrome.extension.getBackgroundPage();

chrome.storage.onChanged.addListener(function(changes, namespace) {
  var _htm = '<table class="site-items" border="1">';
  _htm += '<tr class="site-item"><th class="count">#</th><th class="site"><b>Site</b></th><th class="time">Time Spent Today</th><th class="time">Time Spent Yesterday</th><th class="time"><b>Total Time Spent</b></th></tr>';

  console.log(background.USERDATA);
  var webInfo = background.USERDATA.webInfo, counter=0;
  var pastTime = 0;
  for(key in webInfo){
    counter++;
    pastTime = webInfo[key].pastTimes[0] ? webInfo[key].pastTimes[0].time : 0;
    _htm += '<tr class="site-item"><td class="count">'+ counter +'</td>'
            +'<td class="site"><img class="site-icon" src="' + webInfo[key].icon +  '"/> &nbsp;<a target="_blank" href='+webInfo[key].href+'>' + key + '</a></td>' 
            +'<td class="time">' + background.getTimeFromSec(webInfo[key].todayTime) + '</td>'
            +'<td class="time">' + background.getTimeFromSec(pastTime) + '</td>'
            +'<td class="time">' + background.getTimeFromSec(webInfo[key].time) + '</td></tr>';
  }
  _htm += '</table>'
  document.getElementById("current-tab").innerHTML = _htm;

});

