document.addEventListener("deviceready", onDeviceReady, false);
document.querySelector(".set_button").addEventListener("click", set_url);
let f1 = false;
let f2 = false;

function onDeviceReady() {
    if (f1) {
        tohome();
    }
    f2 = true;
}

function set_url() {
    localStorage.setItem("server_url", document.querySelector(".server_url").value)
    let headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }
    fetch(localStorage.getItem("server_url") + "/", {
        method: "GET",
        headers: headers,
        mode: 'cors',
    })
        .then((response) => {
            response.json()
                .then(data => {
                    if (data === "running") {
                        if (f2) {
                            tohome();
                        }
                        f1 = true;
                    }
                })
                .catch(err => {
                    alert(err);
                });
        })
        .catch((err) => {
            alert(err);
        })
}

function tohome() {
    // console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    setTimeout(function () {
        window.location = "home.html"
    });
}
