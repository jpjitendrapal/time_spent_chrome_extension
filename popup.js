
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

  for (key in changes) {
    var storageChange = changes[key];
                // storageChange.oldValue

                var sites = storageChange.newValue.split('|$|');
                var len = sites.length-1, info, url, icon;
                for(var i = len; i >= 0; i--){
                  info = sites[i].split('::');
                  url = info[0].split("$$")[0];
                  icon = info[0].split("$$")[1];
                  if(url.indexOf("chrome://newtab") == 0 || url.startsWith("null")){
                    continue;
                  }
                  _htm += '<tr class="site-item"><td class="site"><img class="site-icon" src="' + icon +  '"/> &nbsp;'+ url + '</td> <td class="time">' + getTimeFromSec(info[1]) + '</td></tr>';    
                }
  }

  _htm += '</table>'

  document.getElementById('current-tab').innerHTML = _htm;
});

