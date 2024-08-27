const API_URL = 'http://localhost:5678/api/works';

async function init() {

    nottoken();

    logout();

    let allworks = await getallworks();

    displayworks(allworks);

    let allcategories = await getallcategories();

    displaycategories(allcategories);

    listeventmodal();

    addphoto();

    deletephoto();
}

init();

function nottoken() {
    let token = localStorage.getItem("token");
    this.token = token;
    if (!token) {
        window.location.href = "./login.html";
    }
}

function logout() {
    let btnlogout = document.querySelector("#logout-link");
    btnlogout.addEventListener("click", (e) => {
        localStorage.removeItem("token");
        window.location.href = "./index.html";
    })
}

function getallworks() {
    return fetch('http://localhost:5678/api/works')
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error('Il y a eu une erreur:', error)
        });
}

function getallcategories() {
    return fetch('http://localhost:5678/api/categories')
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error('Il y a eu une erreur:', error)
        });
}


function displayworks(allworks) {
    let gallerycontainer = document.querySelector(".gallery");
    gallerycontainer.innerHTML = "";
    let gallerymodal = document.querySelector(".gallery-modale");
    gallerymodal.innerHTML = "";


    for (const work of allworks) {
        gallerycontainer.insertAdjacentHTML("beforeend",
            `
            <figure>
				<img src="${work.imageUrl}" alt="${work.title}">
				<figcaption>${work.title}</figcaption>
			</figure>
            `)

        gallerymodal.insertAdjacentHTML("beforeend",
            `
            <figure class="figure">
                <img src="${work.imageUrl}" alt="${work.title}">
                <i class="trash fa-solid fa-trash-can" onclick="deletephoto(event, ${work.id})"></i>
            </figure>         
            `)
    }
}

function displaycategories(allcategories) {

    let containercate = document.querySelector(".categorieselect");

    for (const cate of allcategories) {

        containercate.insertAdjacentHTML("beforeend",
            `
            <option value="${cate.id}">${cate.name}</option>
            `
        )
    }
}


function listeventmodal() {

    const btnmodalopenall = document.querySelectorAll(".btnmodalopen");

    btnmodalopenall.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            modale1.style.display = "block";
            modalback.style.display = "block";
        })
    })

    const modale1 = document.querySelector(".modale")
    const step1 = document.querySelector(".step1");
    const step2 = document.querySelector(".step2");

    const modalback = document.querySelector(".modalback");

    modalback.addEventListener("click", function () {
        modale1.style.display = "none";
        modalback.style.display = "none";
        step2.style.display = "none";
        step1.style.display = "block";
    });

    const btnfermermodale = document.querySelector(".fermermodale");

    btnfermermodale.addEventListener("click", function () {
        modale1.style.display = "none";
        modalback.style.display = "none";
        step2.style.display = "none";
        step1.style.display = "block";
    });


    const btnaddphoto = document.querySelector(".AddPhoto");

    btnaddphoto.addEventListener("click", function () {
        step1.style.display = "none";
        step2.style.display = "block";
    })

    const btnretourstep1 = document.querySelector(".retourstep1");

    btnretourstep1.addEventListener("click", function () {
        step1.style.display = "block";
        step2.style.display = "none";
    })

}

const loadFile = function (event) {
    document.querySelector(".uploadImage").classList.add("previewImage");

    document.querySelector("#output").innerHTML = "<img src='" + URL.createObjectURL(event.target.files[0]) + "' alt='image' width='100%'>";

    let imagesend = document.querySelector("#ImageSend").files[0];
    this.imagesend = imagesend;
};

function btndisabled() {
    let title = document.querySelector("#titre").value;
    let cateselected = document.querySelector("#categorie").value;
    let btnaddwork = document.querySelector("#AddWork");

    this.title = title;
    this.cateselected = cateselected;

    if (!imagesend || !title || !cateselected) {
        btnaddwork.disabled = true;
    } else {
        btnaddwork.disabled = false;
    }
}


function addphoto() {

    let formadd = document.querySelector(".add");

    formadd.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("image", imagesend);
        formData.append("title", title);
        formData.append("category", cateselected);


        try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                body: formData,
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            });
            const result = await response.json();
            displayworks(result);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la photo:', error);
        }
    });
}

function deletephoto(event, workId) {
    event.stopPropagation();

    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce travail?");
    if (confirmDelete) {
        fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + this.token,
            }
        })
            .then(response => {
                if (response.ok) {
                    const figureToRemove = event.target.closest('figure');
                    figureToRemove.remove();
                } else {
                    console.error("Erreur lors de la suppression de la photo.");
                }
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de la photo:', error);
            });
    }
}

