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
    let steps = JSON.parse(localStorage.getItem("steps"))
    if (current_step < steps.length) {
        steps[current_step]["dot_indexes"].forEach(index => {
            document.querySelector("#processed").getContext("2d").fillRect(index[1],index[0],1,1);
            document.querySelector("#processing").getContext("2d").fillStyle = "red";
            document.querySelector("#processing").getContext("2d").clearRect(0,0,document.querySelector("#processing").width, document.querySelector("#processing").height);
            document.querySelector("#processing").getContext("2d").fillRect(index[1],index[0],1,1);
        })
    }
    current_step += 1;
}
