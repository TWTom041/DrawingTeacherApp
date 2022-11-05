document.querySelector(".back").addEventListener("click", back)
document.querySelector(".yes").addEventListener("click", nextStep)
let video = document.querySelector("#videoElement")
let current_maps = [];
let current_step = 0;
let all_maps = JSON.parse(localStorage.getItem("steps"))

document.querySelector("#size-modifier").addEventListener("input", changeSize)
document.querySelector("#margintop").addEventListener("input", addMargin)
document.body.addEventListener("pointermove", drawUserLine)

document.querySelector("#clear_canvas").onclick = () => {
    document.querySelector("#painting").getContext("2d").clearRect(0, 0, document.querySelector("#painting").width, document.querySelector("#painting").height);
}

document.querySelector("#shut_down_cam").onclick = () => {
    setMedia();
}

document.querySelector("#download").onclick = () => {
    let link = document.createElement('a');
    link.download = 'god_tier_art_work.png';
    link.href = document.getElementById("painting").toDataURL();
    link.click();
}

function setMedia() {
    if (video.srcObject == null) {
        document.getElementById("shut_down_cam").innerHTML = "camera on"
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: "environment"}})
                .then(function (stream) {
                    video.srcObject = stream;
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
    else {
        document.getElementById("shut_down_cam").innerHTML = "camera off"
        video.srcObject = null;
    }
}
setMedia()

function back() {
    window.location = "home.html"
}

function changeSize() {
    let mag = this.value / 100;
    document.querySelector("#processed").width = 384 * mag
    document.querySelector("#processed").height = 384 * mag
    document.querySelector("#processing").width = 384 * mag
    document.querySelector("#processing").height = 384 * mag
    document.getElementsByClassName("drawing_window")[0].style.width = (384 * mag).toString() + "px"
    document.getElementsByClassName("drawing_window")[0].style.height = (384 * mag).toString() + "px"
    document.getElementsByClassName("now_drawing_window")[0].style.width = (384 * mag).toString() + "px"
    document.getElementsByClassName("now_drawing_window")[0].style.height = (384 * mag).toString() + "px"
    draw(current_maps)
}

function addMargin() {
    let mar = this.value.toString();
    document.getElementsByClassName("drawing_window")[0].style.marginTop = mar.toString() + "px";
    document.getElementsByClassName("now_drawing_window")[0].style.marginTop = mar.toString() + "px";
}

function draw(steps) {
    let mag = document.querySelector("#size-modifier").value / 100;
    if (current_step) {
        document.querySelector("#processing").getContext("2d").fillStyle = "red";
        document.querySelector("#processing").getContext("2d").clearRect(0, 0, document.querySelector("#processing").width, document.querySelector("#processing").height);
        document.querySelector("#processed").getContext("2d").clearRect(0, 0, document.querySelector("#processed").width, document.querySelector("#processed").height);
        steps.forEach(indexes => {
            indexes.forEach(index => {
                document.querySelector("#processed").getContext("2d").fillRect(index[1] * mag, index[0] * mag, 1, 1);
            })

        })
        steps.at(-1).forEach(index => {
            document.querySelector("#processing").getContext("2d").fillRect(index[1] * mag, index[0] * mag, 1, 1);
        })
    }
}

function nextStep() {
    if (current_step < all_maps.length) {
        current_maps.push(all_maps[current_step]["dot_indexes"])
        current_step += 1;
        draw(current_maps)
    }
}

function drawUserLine(ev) {
    document.querySelector("#painting").getContext("2d").fillStyle = "blue";
    let rect = document.querySelector("#painting").getBoundingClientRect();
    if (ev.pressure > 0) {
        document.querySelector("#painting").getContext("2d").fillRect(ev.clientX - rect.left, ev.clientY - rect.top, 3, 3);
    }
}
