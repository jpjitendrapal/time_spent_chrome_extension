var TIMERCOUNT = 2;
var USERDATA = {
    webInfo: []
};
var FILTERURLS = [
    "fb.com",
    "newtab",
    "extensions",
    "version",
    "gmail.com"
];

function getTimeFromSec(sec){
    var d = Number(sec);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}

function getHost(url){
    var location = document.createElement("a");
    location.href = url;
    return location;
}

function filterUrl(url){
    return (FILTERURLS.indexOf(url) > -1);
}
function getTodayDate(){
    var d = new Date();
    return d.getDate();
}
function updateInfo(location, icon){
    var host = location.host, todayDate;
    
    if(filterUrl(host)){
        return;
    }
    todayDate = getTodayDate();

    if(!USERDATA.webInfo[host]){
        USERDATA.webInfo[host] = {
            icon: icon,
            time: TIMERCOUNT,
            origin: location.origin,
            href: location.href,
            todayTime: TIMERCOUNT,
            todayDate: todayDate,
            pastTimes: []
        }
    } else {
        USERDATA.webInfo[host].time += TIMERCOUNT;
        if(todayDate == USERDATA.webInfo[host].todayDate){
            USERDATA.webInfo[host].todayTime += TIMERCOUNT;
        } else {
            USERDATA.webInfo[host].pastTimes.push({date: new Date(), time: USERDATA.webInfo[host].todayTime});
            USERDATA.webInfo[host].todayTime = TIMERCOUNT;
            USERDATA.webInfo[host].todayDate = todayDate;
        }
        if(icon){
            USERDATA.webInfo[host].icon = icon;
        }
    }
}
function getCurrentTabInfo() {
    var currentValue=0, icon, location;
    setInterval(function () {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            if(tabs.length < 1) return;
            var key = tabs[0].url;
            if(!key) return;
            location = getHost(key);
            icon = tabs[0].favIconUrl;
            if(!location.origin.startsWith("chrome://")){
                updateInfo(location,icon);
            }
            currentValue++;
            if(currentValue > 100){
                currentValue = 0;
            }
            chrome.storage.local.set({ key : currentValue }, function () {});
        });
    }, 1000*TIMERCOUNT);
}


getCurrentTabInfo();