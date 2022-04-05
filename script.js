// Au chargement de la page
// https://developer.mozilla.org/fr/docs/Web/API/GlobalEventHandlers/onload
window.onload = init;

// Fonction appelée au chargement de la page
function init()
{
    //console.log("init" + localStorage.length);

    // Lecture du local Storage
    // https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/API/storage/local
    if (localStorage.length != 0)
    {
        // Parcours du localStorage
        for (var i = 0; i < localStorage.length; i++)
        {
            // Test de la clé pour savoir si elle commence par "savoir"
            if ( localStorage.key(i).substring(0,6) == "savoir")
            {
                // Lecture et analyse de ce qui est stocké
                let savoirLS = JSON.parse( localStorage.getItem( localStorage.key(i) ) );

                //console.log( savoirLS );

                // Instanciation d'un nouveau savoir
                // Il faut fournir une date, d'où le new Date()
                // On ajoute l'id qui a été récupéré dans le Stockage
                let savoirEnCours = new SavoirInutile( savoirLS.savoir, savoirLS.auteur, new Date(savoirLS.date), savoirLS.id );

                //console.log( savoirenCours );

                // Ajouter dans le DOM
                savoirEnCours.ajouterDansleDom();
            }
        }
    }
}

// Déclaration notre objet Savoir Inutile
class SavoirInutile
{
    // Attrributs dans le constructeur
    constructor( savoirParametre, auteurParametre, dateParametre, idParametre = null )
    {
        // L'identifiant du savoir est soit fourni, soit créé à partir de la date
        if ( idParametre === null )
        {
            this.id = Date.now();
        } else {
            this.id = idParametre;
        }

        this.savoir = savoirParametre;
        this.auteur = auteurParametre;
        this.date = dateParametre;
    }

    // Methode pour ajouter le savoir dans le dom
    ajouterDansleDom(){
        // Création
        let newElementLi = document.createElement("li");
        let newElementP = document.createElement("p");
        let newElementP2 = document.createElement("p");
        let newElementButton = document.createElement("button");

        // Paragraphe du savoir inutile
        newElementP.innerText = this.savoir;

        // Eclatement de la date
        var jour = this.date.getDate().toString().padStart(2, "0");
        var mois = (this.date.getMonth() + 1).toString().padStart(2, "0");
        var annee = this.date.getFullYear();

        newElementP2.innerText = `Par ${this.auteur}, le ${jour}/${mois}/${annee}`;

        // Insérer le P dans le LI
        newElementLi.appendChild( newElementP );
        newElementLi.appendChild( newElementP2 );
        // Insérer le Button dans le LI
        newElementLi.appendChild( newElementButton );

        // Ajouter un événement à cet élément BUTTON
        newElementButton.addEventListener("click", supprimer);
        newElementButton.innerText = "✖";

        // Id à l'élément LI
        newElementLi.id = this.id;

        // Classe  à l'élément LI
        newElementLi.setAttribute('class', 'list-group-item');

        // 3. Ajoute l'élément de liste au DOM
        let elementOl = document.getElementById("olListeSavoir");
        elementOl.appendChild( newElementLi );
    }

    // Méthode pour ajouter ce savoir dans le LocalStorage
    ajouterDansleLocalStorage()
    {
        // On stocke un nouvel item à partir de l'id du savoir
        localStorage.setItem(
            "savoir_" + this.id,
            JSON.stringify(this)
        )
    }

    // Methode de vérification
    verificationSaisie(){
        return this.savoir != "" && this.auteur != "" && this.date != null;
    }
}

// Fonction appelée au clic du bouton
function ajouter()
{
    // 1. Récupération valeur du input de savoir
    let elSavoir = document.getElementById("libelleSavoir").value;
    // 1. Récupération valeur du input de auteur
    let elAuteur = document.getElementById("libelleAuteur").value;
    // 1. Récupération valeur du input de date
    let elDate = document.getElementById("date").valueAsDate;

    // Instanciation
    let newSavoir = new SavoirInutile( elSavoir, elAuteur, elDate );

    // Verififer
    if (newSavoir.verificationSaisie())
    {
        // Ajouter dans le dom
        newSavoir.ajouterDansleDom();

        // Ajouter dans le LocalStorage
        newSavoir.ajouterDansleLocalStorage();
    }
}

function supprimer(event){
    console.log(" Vous avez cliqué sur: ");
    console.log( event.currentTarget );

    console.log(" Le parent: ");
    console.log( event.currentTarget.parentNode );

    // Suppression dans le LocalStorage
    let savoirId = "savoir_" + event.currentTarget.parentNode.id;
    localStorage.removeItem( savoirId );

    // Suppression dans le DOM
    event.currentTarget.parentNode.parentNode.removeChild( event.currentTarget.parentNode );
}

// Fonction appelée au bouton Tri date
function triDate()
{
    // Tableau des savoirs
    let T_Savoirs = [];

    // Récupération de tous les savoirs dans le LS sous forme de tableau
    for (var i = 0; i < localStorage.length; i++)
    {
        // Test de la clé pour savoir si elle commence par "savoir"
        if ( localStorage.key(i).substring(0,6) == "savoir")
        {
            // Lecture et analyse de ce qui est stocké
            let savoirLS = JSON.parse( localStorage.getItem( localStorage.key(i) ) );

            //console.log( savoirLS );

            // Instanciation d'un nouveau savoir
            // Il faut fournir une date, d'où le new Date()
            // On ajoute l'id qui a été récupéré dans le Stockage
            let savoirEnCours = new SavoirInutile( savoirLS.savoir, savoirLS.auteur, new Date(savoirLS.date), savoirLS.id );

            T_Savoirs.push( savoirEnCours );
        }
    }

    // Avant
    console.log(T_Savoirs);

    // Tri du tableau
    T_Savoirs.sort( triSavoirsParDate );

    // Après
    console.log(T_Savoirs);

    // Vidage du DOM (méthode bourrin)
    document.getElementById("olListeSavoir").innerHTML = '';

    // Affichage dans le DOM
    T_Savoirs.forEach( savoir => {
       savoir.ajouterDansleDom();
    });
}

// fonction de comparaison de 2 savoirs
function triSavoirsParDate(a, b)
{
    // Renvoie -1, soit 1, soit 0
    return a.date - b.date;
}