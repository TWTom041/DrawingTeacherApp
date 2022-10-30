window.onload = get_result
document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
}

function get_result() {
    document.querySelector("img[class='drawing']").src = "data:image/jpg;base64," + localStorage.getItem("original");
}