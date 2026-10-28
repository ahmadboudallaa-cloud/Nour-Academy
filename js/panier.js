 const data = await fetch("./../data/data.json");
const courses = await data.json();






const donneesPanier = localStorage.getItem("panier");
const selectionCours = JSON.parse(donneesPanier) || [];

const panierCarte = document.getElementById("cartes-paniers");

selectionCours.forEach(cours => {
    panierCarte.innerHTML += `
        <div class="carte-panier">
            <img src="./../images/math.webp" alt="">
            <div class="info-carte-panier">
                <div class="titre-carte-panier">
                    <h2>${cours.matiere}</h2>
                    <h3>${cours.niveau}</h3>
                </div>
                <div class="prix-retirer">
                    <p>${cours.prix}<span class="madmois">MAD/Mois</span></p>
                    <button data-id="${cours.id}">Retirer</button>
                </div>
            </div>
        </div>
    `;
});

const buttonRetirer = panierCarte.querySelectorAll("button");

buttonRetirer.forEach(button => {
    button.addEventListener("click", function () {
        const idSupp = button.dataset.id;

        const panierNv = selectionCours.filter(cours => {
            return String(cours.id) !== String(idSupp);
        });

        localStorage.setItem("panier", JSON.stringify(panierNv));

        location.reload();
    });
});

