function ajouter()
{
    console.log("Bouton cliqué");

    // 1. Récupération valeur du input
    let elSavoir = document.getElementById("libelleSavoir").value;
    let elAuteur = document.getElementById("libelleAuteur").value;
    let elDate = document.getElementById("date").valueAsDate;

    // Vérification de la saisie
    if ( verifSaisie (elSavoir ,elAuteur, elDate ) )
    {
        // 2. Préparation de ce qu'on va afficher dans le DOM
        let newElementLi = document.createElement("li");
        let newElementP = document.createElement("p");
        let newElementP2 = document.createElement("p");
        let newElementButton = document.createElement("button");

        // Paragraphe du savoir inutile
        newElementP.innerText = elSavoir;

        // Eclatement de la date
        var jour = elDate.getDate().toString().padStart(2, "0");
        var mois = (elDate.getMonth() + 1).toString().padStart(2, "0");
        var annee = elDate.getFullYear();

        newElementP2.innerText = `Par ${elAuteur}, le ${jour}/${mois}/${annee}`;

        // Insérer le P dans le LI
        newElementLi.appendChild( newElementP );
        newElementLi.appendChild( newElementP2 );
        // Insérer le Button dans le LI
        newElementLi.appendChild( newElementButton );

        // Ajouter un événement à cet élément LI
        newElementButton.addEventListener("click", supprimer);
        newElementButton.innerText = "Supprimer";

        // 3. Ajoute l'élément de liste au DOM
        let elementOl = document.getElementById("olListeSavoir");
        elementOl.appendChild( newElementLi );

    

    }else{
        alert("Il faut tout saisir!")
    }

    console.log("Savoir :" + elSavoir);
}

function supprimer( event )
{
    console.log(" Vous avez cliqué sur: ");
    console.log( event.currentTarget );

    console.log(" Le parent: ");
    console.log( event.currentTarget.parentNode );
    event.currentTarget.parentNode.parentNode.removeChild( event.currentTarget.parentNode )
}

function verifSaisie( savoir, auteur, dateSaisie) {
    return savoir != "" && auteur != "" && dateSaisie != null;
}