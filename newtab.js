
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
                  var len = sites.length-1, info;
                  for(var i = len; i >= 0; i--){
                    info = sites[i].split('::');
                    if(info[0].indexOf("chrome://newtab") == 0 || info[0].startsWith("null")){
                      continue;
                    }
                    _htm += '<tr class="site-item"><td class="site">'+ info[0] + '</td> <td class="time">' + getTimeFromSec(info[1]) + '</td></tr>';    
                  }
    }

    _htm += '</table>'

    document.getElementById('current-tab').innerHTML = _htm;
  });

