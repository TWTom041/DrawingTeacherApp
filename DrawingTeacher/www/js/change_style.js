let file_in = document.querySelector("input[class='choose_style']")
file_in.addEventListener("change", ccc);

function ccc() {
    let preview = document.querySelector('img');
    let file = file_in.files[0];
    let reader = new FileReader();

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
            "style": preview.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
        }
        let headers = {
            "Content-Type": "application/json",
        }
        fetch("http://127.0.0.1:5000/style_transfer", {
            method: "POST",
            headers: headers,
            mode: 'cors',
            body: JSON.stringify(body)
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log(response);
                localStorage.setItem("original", response["stylized"])
            })
            .catch((error) => {
                console.log(`[ERROR] ${error}`);
            })
    } else {
        alert("Please choose style image.");
        return false;
    }
}

