let file_in = document.querySelector("input[class='choose_style']")
file_in.addEventListener("change", ccc);
document.querySelector(".no").onclick = () => {
    window.location = "see_result.html"
}
document.getElementsByClassName("choose_style_type")[0].onchange = () => {
    if (document.getElementsByClassName("choose_style_type")[0].value === "FST") {
        file_in.removeAttribute("disabled")
        document.querySelector("img[class='style_image']").removeAttribute("style")
    }
    else {
        file_in.setAttribute("disabled", "")
        document.querySelector("img[class='style_image']").setAttribute("style", "display: none")
    }
}


const style_method = ["Hayao_v2", "Hayao", "Paprika_v2", "Shinkai_v2"]

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
    let this_method = document.getElementsByClassName("choose_style_type")[0].value;
    let body

    if (style_method.includes(this_method)) {
        body = {
            "content": ori,
            "style": this_method
        }
    } else if (preview !== "") {
        body = {
            "content": ori,
            "style": preview.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
        }
    } else {
        alert("Please choose style image.");
        return false;
    }
    console.log(12311)

    let headers = {
        "Content-Type": "application/json",
    }

    document.querySelector(".yes").disabled = true;
    fetch(localStorage.getItem("server_url") + "/style_transfer", {
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
            localStorage.setItem("content", ori)
            localStorage.setItem("original", response["stylized"])
            window.location = "see_result.html"
        })
        .catch((error) => {
            alert(`[ERROR] ${error}`);
        })
}

