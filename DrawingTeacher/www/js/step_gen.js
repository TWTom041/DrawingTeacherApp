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
        mode:"cors",
        body: JSON.stringify(body)
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            localStorage.setItem("outline", response["outline"])
            document.querySelector(".drawing").src = "data:image/png;base64," + localStorage.getItem("outline");
        })
        .catch((error) => {
            alert(`[ERROR] ${error}`);
        })

}

function gen_steps() {
    let s_method = document.querySelector(".sort_method").value
    let body = {
        "outline": localStorage.getItem("outline"),
        "sort_method": document.querySelector(".sort_method").value
    }

    if (s_method === "ss") {
        body.content = localStorage.getItem("content")
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
            localStorage.setItem("steps", JSON.stringify(response["steps"]))
            window.location = "drawing_part.html"
        })
        .catch((error) => {
            alert(`[ERROR] ${error}`);
        })
}
