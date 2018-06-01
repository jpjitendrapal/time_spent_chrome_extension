
var background = chrome.extension.getBackgroundPage();

function getTimeFromSec(sec){
  var d = Number(sec);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);
  return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}
chrome.storage.onChanged.addListener(function(changes, namespace) {
  var _htm = '<table class="site-items" border="1">';
  _htm += '<tr class="site-item"><th class="site"><b>Site</b></th> <th class="time"><b>Time Spent</b></th></tr>';

  console.log(background.USERDATA);
  var webInfo = background.USERDATA.webInfo;
  for(key in webInfo){
    _htm += '<tr class="site-item"><td class="site"><img class="site-icon" src="' + webInfo[key].icon +  '"/> &nbsp;'+ key + '</td> <td class="time">' + getTimeFromSec(webInfo[key].time) + '</td></tr>';
  }
  _htm += '</table>'
  document.getElementById("current-tab").innerHTML = _htm;

});

