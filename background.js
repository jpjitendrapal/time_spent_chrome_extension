var TIMERCOUNT = 2;
var USERDATA = {
    webInfo: []
};
var FILTERURLS = [
    "fb.com",
    "newtab"
];

function getHost(url){
    var location = document.createElement("a");
    location.href = url;
    return location;
}

function filterUrl(url){
    return (FILTERURLS.indexOf(url) > -1);
}

function updateInfo(host, icon){
    if(filterUrl(host)){
        return;
    }
    if(!USERDATA.webInfo[host]){
        USERDATA.webInfo[host] = {
            icon: icon,
            time: TIMERCOUNT
        }
    } else {
        USERDATA.webInfo[host].time += TIMERCOUNT;
        if(icon){
            USERDATA.webInfo[host].icon = icon;
        }
    }
}
function getCurrentTabInfo() {
    var currentValue=0, icon;
    setInterval(function () {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            if(tabs.length < 1) return;
            var key = tabs[0].url;
            if(!key) return;
            key = getHost(key).host;
            icon = tabs[0].favIconUrl;
            updateInfo(key,icon);
            currentValue++;
            if(currentValue > 100){
                currentValue = 0;
            }
            chrome.storage.local.set({ key : currentValue }, function () {});
        });
    }, 1000*TIMERCOUNT);
}


getCurrentTabInfo();