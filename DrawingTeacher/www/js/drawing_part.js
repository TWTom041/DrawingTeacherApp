document.querySelector(".back").addEventListener("click", back)
let video = document.querySelector("#videoElement")


if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({audio:false, video: {facingMode: "environment"}})
        .then(function (stream) {
            video.srcObject = stream;
        })
        .catch(function (err) {
            console.log(err);
        });
}
function back() {
    window.location = "home.html"
}

