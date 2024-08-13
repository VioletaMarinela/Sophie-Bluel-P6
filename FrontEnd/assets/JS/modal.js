
var modal = document.getElementById("myModal");

var btn = document.getElementById("openModal");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("photoForm").onsubmit = function (event) {
    event.preventDefault();
    alert("Photos ajoutées !");
    modal.style.display = "none";
}

document.getElementById("deletePhotos").onclick = function () {
    alert("Photos supprimées !");
    modal.style.display = "none";
}  