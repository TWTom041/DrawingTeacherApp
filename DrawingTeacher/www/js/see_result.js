// window.onload = get_result
document.addEventListener("deviceready", onDeviceReady, false);

var db;


function onDeviceReady() {
    db = window.sqlitePlugin.openDatabase({name: "dt.db"});
    get_result();
}

function get_result() {
    let content_img = "";
    let style_img = "";

    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM Imgs WHERE id = 1", [], function (tx, res) {
            content_img = res.rows.item(0)["content"];
        });
        tx.executeSql("SELECT * FROM Imgs WHERE id = 1", [], function (tx, res) {
            style_img = res.rows.item(0)["style"];
        });
    });

    if (style_img === "") {
        db.transaction(function (tx) {
            tx.executeSql('UPDATE Imgs SET original = ? WHERE id = 1', [content_img]);
        });
    }

    let body = {
        "content": content_img,
        "style": style_img
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
        })
        .then((response) => {
            db.transaction(function (tx) {
                tx.executeSql('UPDATE Imgs SET original = ? WHERE id = 1', [response]);
            });
        })
        .catch((error) => {
            console.log(`[ERROR] ${error}`);
        })
}