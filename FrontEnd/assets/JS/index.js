
async function init() {
    let allworks = await getallworks();

    displayworks(allworks);

    let categoriesInputSelect = await getallcategories();

    displaycategories(categoriesInputSelect);
}

init();


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

    for (const work of allworks) {
        gallerycontainer.insertAdjacentHTML("beforeend",
            `
            <figure>
				<img src="${work.imageUrl}" alt="${work.title}">
				<figcaption>${work.title}</figcaption>
			</figure>
            `)
    }
}



function displaycategories(categories) {
    let categoriesInputSelect = document.querySelector(".categories");

    categories.forEach((category) => {
        categoriesInputSelect.insertAdjacentHTML("beforeend", `
            <option value="${category.id}">${category.name}</option>
        `);
    });
}

