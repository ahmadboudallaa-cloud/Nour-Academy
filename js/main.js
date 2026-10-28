 const data = await fetch("./data/data.json");
const courses = await data.json();
const cours = document.getElementById("cours-cartes");
const filtreCours = document.getElementById("matiere");
const filtreNiveau = document.getElementById("nivaux");

function carteHtml(e) {
    const panier = JSON.parse(localStorage.getItem("panier")) || [];

    const existe = panier.some(cours =>
        String(cours.id) === String(e.id)

        
    );
    const complet = Number(e.place) === 0;

    return `
        <div class="carte">
            <img src="${e.image}" alt="image du cours">

            <p id="nivaux">${e.niveau}</p>

            <div class="info-carte">
                <h3>${e.matiere}</h3>
                <p>Lundi & mercredi · 16h</p>
            </div>

            <div class="info-prix">
                <div class="prix-carte">
                    <p id="prix">${e.prix}</p>
                    <div class="info">
                        <p>MAD / Mois</p>
                    </div>
                </div>

                <button class="btn-carte" data-id="${e.id}" ${(existe || complet) ? "disabled" : ""}>
                     ${complet ? "Cours complet" : existe ? "Déjà sélectionné" : "Sélectionner"}
                </button>
            </div>

            <p id="place">${e.place} places restantes</p>
        </div>
    `;
}

 courses.cours.forEach(e => {
    cours.innerHTML += carteHtml(e);
});
function filtrerCours() {
    const categorie = filtreCours.value;
    const niveau = filtreNiveau.value;
    const courFiltrer = courses.cours.filter(e => {
        return (categorie === "" || e.matiere === categorie) &&
               (niveau === "" || e.niveau === niveau);
    });
    document.getElementById("nombreCourses").textContent = courFiltrer.length + " cours disponibles"
    cours.innerHTML = "";
    courFiltrer.forEach(e => {
        cours.innerHTML += carteHtml(e);
    });
}
filtreCours.addEventListener("change" , filtrerCours)
filtreNiveau.addEventListener("change" , filtrerCours )

filtrerCours();






const btnSelection = document.querySelectorAll(".btn-carte");

btnSelection.forEach(button => {
    button.addEventListener("click", function() {
        const idCours = button.dataset.id;

        const panier = JSON.parse(localStorage.getItem("panier")) || [];

       

        const existe = panier.some(cours => String(cours.id) === String(idCours));

        if (existe) {
            return;
        }

        const coursChoisi = courses.cours.find(cours =>
            String(cours.id) === String(idCours)
        );

        if (coursChoisi) {
            panier.push(coursChoisi);
            localStorage.setItem("panier", JSON.stringify(panier));
        }
           location.reload();
    });
});

























