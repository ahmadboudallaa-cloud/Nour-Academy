
const donneesPanier = localStorage.getItem("panier");
const selectionCours = JSON.parse(donneesPanier) || [];
 const total = selectionCours.reduce((somme, cours) => {
    return somme + Number(cours.prix);
}, 0);

document.getElementById("prix-total").innerHTML =
    `${total} <span class="prix-mois">MAD/Mois</span>`;
document.getElementById("total-prix").innerHTML = `${total}`


const panierCarte = document.getElementById("cartes-paniers");

document.getElementById("cours-selec").innerHTML = `${panierCarte.length}`


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
document.getElementById("cours-selec").innerHTML = `${selectionCours.length}`

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



const formulaire = document.getElementById("formulaire");
const coursSelectionnes = document.getElementById("coursSelectionnes");
const nomsEleves = document.getElementById("nomsEleves");
const formInscription = document.getElementById("formInscription");


window.ouvrirFormulaire = function () {

    if (selectionCours.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    coursSelectionnes.innerHTML = "";
    nomsEleves.innerHTML = "";

    
    selectionCours.forEach(cours => {
        coursSelectionnes.innerHTML += `
            <div class="cours-item">
                <span>${cours.matiere} - ${cours.niveau}</span>
                <small>${cours.prix} MAD/Mois</small>
            </div>
        `;
    });

    const niveaux = [...new Set(selectionCours.map(cours => cours.niveau))];

    niveaux.forEach((niveau, index) => {
        nomsEleves.innerHTML += `
            <div class="form-group">
                <label>Nom de l'enfant (${niveau})</label>
                <input type="text" name="eleves" required
                    placeholder="Nom complet de l'enfant ${index + 1}">
            </div>
        `;
    });

    formulaire.classList.add("active");
};
window.fermerFormulaire = function () {
    formulaire.classList.remove("active");
};



formInscription.addEventListener("submit", function (e) {
    e.preventDefault();

    alert("Votre inscription a été effectuée avec succès !");

    fermerFormulaire();
});


