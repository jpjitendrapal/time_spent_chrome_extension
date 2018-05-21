var TIMERCOUNT = 2;

function getHost(url){
    var location = document.createElement("a");
    location.href = url;
    return location;
}

function processData(data, key){
    
    if(!data){
        return  (key+"::"+TIMERCOUNT);
    }

    var i=0, d, len, count=0, found = false;
    d = data.split("|$|");
    len = d.length;
    for(i=0; i < len; i++){
        if(d[i].indexOf(key) == 0){
            count = d[i].split("::")[1];
            d.splice(i, 1);
            d.push(key + "::" + (TIMERCOUNT + parseInt(count)));
            found = true;
            break;
        }
    }
    if(!found){
        d.push(key+"::"+TIMERCOUNT);
    }
    data = d.join("|$|");
    return data;
}
function getCurrentTabInfo() {
    var currentValue;
    setInterval(function () {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            if(tabs.length < 1) return;
            var key = tabs[0].url;
            if(!key) return;
            key = getHost(key).origin;
            key = key+"$$"+tabs[0].favIconUrl;
            currentValue = processData(currentValue, key);
            
            chrome.storage.local.set({ key : currentValue }, function () {});
        });
    }, 1000*TIMERCOUNT);
}


getCurrentTabInfo();