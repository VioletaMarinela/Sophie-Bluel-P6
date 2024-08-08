function init() {
    let form = document.querySelector('.login-form');

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        authenticateUser();
    });

    mdpoublie();
}

init();

async function authenticateUser() {

    let userEmail = document.querySelector('input#email').value;
    let userPass = document.querySelector('input#password').value;

    let formData = {
        "email": userEmail,
        "password": userPass
    }

    let resultpost = await postinfo(formData);

    if (resultpost.status == 200) {

        stockTokeninlocalstorage(resultpost);

        document.querySelector(".message").textContent = "Connexion réussie";

        setTimeout(() => {
            window.location.href = "./pageadmin.html";
        }, 3000);
    } else {
        document.querySelector(".message").textContent = "Identifiants incorect.";
    }
}

async function postinfo(formData) {

    return fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error('Il y a eu une erreur:', error)
        });

}

async function stockTokeninlocalstorage(resultpost) {
    let token = await resultpost.json();
    window.localStorage.setItem("token", token.token);
}

function mdpoublie() {
    document.querySelector("#mdpoublie").addEventListener("click", function (event) {
        event.preventDefault();

        alert("Mot de passe oublié? Veuillez contacter l'administrateur du site.");
    });
}
