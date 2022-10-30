document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    tohome();
}

function tohome() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    setTimeout(function(){window.location = "home.html"});
}
