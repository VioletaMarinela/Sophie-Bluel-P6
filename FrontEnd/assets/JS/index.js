
async function init() {
    let allworks = await getallworks();

    displayworks(allworks);

    let categoriesInputSelect = await getallcategories();

    displaycategories(categoriesInputSelect);

    eventclickcategorie(allworks)
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
    let categoriesButtonContainer = document.querySelector(".categories-buttons");

    categoriesButtonContainer.insertAdjacentHTML("beforeend", `  
        <button class="category-button" data-id="all">Tous</button>  
    `);

    categories.forEach((category) => {
        categoriesButtonContainer.insertAdjacentHTML("beforeend", `  
            <button class="category-button" data-id="${category.id}">${category.name}</button>  
        `);
    });
}

function eventclickcategorie(allworks) {
    const buttons = document.querySelectorAll(".category-button");
    buttons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const categoryId = event.target.dataset.id;
            if (categoryId === "all") {
                displayworks(allworks);
            } else {
                filterWorksByCategory(categoryId, allworks);
            }
        });
    });
}

function filterWorksByCategory(categoryId, allworks) {
    const filteredWorks = allworks.filter(work => work.categoryId == categoryId);
    displayworks(filteredWorks);
}  
