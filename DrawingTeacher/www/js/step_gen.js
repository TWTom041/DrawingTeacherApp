window.onload = get_line;
document.querySelector(".yes").addEventListener("click", gen_steps)

function get_line() {
    let body = {
        "original": localStorage.getItem("original"),
    }
    let headers = {
        "Content-Type": "application/json",
    }
    fetch(localStorage.getItem("server_url") + "/get_outline", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            localStorage.setItem("outline", response["outline"])
        })
        .catch((error) => {
            alert(`[ERROR] ${error}`);
        })
    document.querySelector(".drawing").src = localStorage.getItem("outline");
}

function gen_steps() {
    let body = {
        "outline": localStorage.getItem("outline"),
        "sort_method": document.querySelector(".sort_method").value
    }
    let headers = {
        "Content-Type": "application/json",
    }
    fetch(localStorage.getItem("server_url") + "/gen_step", {
        method: "POST",
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(body)
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            localStorage.setItem("steps", response["steps"])
        })
        .catch((error) => {
            alert(`[ERROR] ${error}`);
        })
}