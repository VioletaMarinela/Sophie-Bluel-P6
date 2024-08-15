const API_URL = 'http://localhost:5678/api/works';

var modal = document.getElementById("myModal");
var btn = document.getElementById("openModal"); // Id du bouton pour ouvrir la modale  
var span = document.getElementsByClassName("close")[0]; // Éléments pour fermer la modale   

// Fonction pour récupérer les photos depuis l'API  
function fetchPhotos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('photoGallery');
            gallery.innerHTML = ''; // Réinitialiser la galerie  

            data.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.url; // Assurez-vous que cet URL est correct  
                img.alt = photo.title || 'Photo';
                img.classList.add('photo-thumbnail');
                img.dataset.id = photo.id; // Identification unique pour chaque photo  

                // Ajoutez un gestionnaire de clic pour sélectionner/désélectionner  
                img.onclick = function () {
                    img.classList.toggle('selected'); // Ajoute ou enlève une classe 'selected'  
                };

                gallery.appendChild(img);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des photos:', error));
}

// Ouvrir la modale et récupérer les photos lorsque le bouton est cliqué   
btn.onclick = function () {
    modal.style.display = "block";
    fetchPhotos(); // Appel à la fonction pour récupérer les photos   
}

// Fermer la modale lorsqu'on clique sur "X"   
span.onclick = function () {
    modal.style.display = "none";
}

// Fermer la modale lorsqu'on clique à l'extérieur de la modale   
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Gestion de la soumission du formulaire  
document.getElementById("photoForm").onsubmit = function (event) {
    event.preventDefault();
    alert("Photos ajoutées !");
    modal.style.display = "none";
}

// Gestion du bouton de suppression  
document.getElementById("deletePhotos").onclick = function () {
    alert("Photos supprimées !");
    modal.style.display = "none";
}