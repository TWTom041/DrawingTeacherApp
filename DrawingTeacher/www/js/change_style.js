let file_in = document.querySelector("input[class='choose_style']")
file_in.addEventListener("change", ccc);

function ccc() {
    var preview = document.querySelector('img');
    var file    = file_in.files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

function call_change_style() {
    let preview = document.querySelector("img").getAttribute("src");
    let ori = localStorage.getItem("original");

    if (preview !== "") {
        let body = {
            "content": ori,
            "style": preview
        }
        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        fetch("http://127.0.0.1/style_transfer", {
            method: "POST",
            headers: headers,
            body: body
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log(response);
                localStorage.setItem("original", response)
            })
            .catch((error) => {
                console.log(`[ERROR] ${error}`);
            })
    } else {
        alert("Please choose style image.");
        return false;
    }
}

