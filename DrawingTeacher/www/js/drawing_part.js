document.querySelector(".back").addEventListener("click", back)
document.querySelector(".yes").addEventListener("click", nextmove)
let video = document.querySelector("#videoElement")
let src, dst, cap, height, width;
let current_step = 0;

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: "environment"}})
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

function nextmove() {
    current_step += 1;
    let steps = JSON.parse(localStorage.getItem("steps"))
    if (current_step < steps.length) {
        steps[current_step]["dot_indexes"].forEach(index => {
            document.querySelector("#processed").getContext("2d").fillRect(index[1],index[0],1,1);
        })
    }
}

function onOpenCvReady() {
    cv['onRuntimeInitialized'] = () => {
        console.log('saksaksa')
        height = video.videoHeight;
        width = video.videoWidth;
        src = new cv.Mat(height, width, cv.CV_8UC4);
        dst = new cv.Mat(height, width, cv.CV_8UC1);
        cap = new cv.VideoCapture(video);
        processVideo()
    };
}

const FPS = 30;
function processVideo() {
    let begin = Date.now();
    cap.read(src);
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
    cv.imshow("processed", dst);
    // schedule next one.
    let delay = 1000 / FPS - (Date.now() - begin);
    // setInterval(processVideo, delay);
}

