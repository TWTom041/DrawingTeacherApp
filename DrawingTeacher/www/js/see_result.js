window.onload = get_result

function get_result() {
    document.querySelector("img[class='drawing']").src = "data:image/png;base64," + localStorage.getItem("original");
}