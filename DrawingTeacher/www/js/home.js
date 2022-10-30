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

function change_page() {
    let video = document.querySelector("#videoElement")
    let canvas = document.createElement("canvas")
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    let image_data_url = canvas.toDataURL('image/jpeg');
    image_data_url = image_data_url.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
    localStorage.setItem("original", image_data_url)
    // data url of the image
    console.log(image_data_url);
    window.location='change_style.html'
}
