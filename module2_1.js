function chargerContenu()
{
    console.log("coucou, la fonction chargerContenu() est exécutée");
    
    var elInput = document.createElement("input");
    var attValue = document.createAttribute("value");
    attValue.value = "une zone de saisie";
    elInput.setAttributeNode(attValue);
    elInput.setAttribute("value","une zone de saisie");
    //afterend, beforebegin, afterbegin, beforerend
    document.getElementById("titre").insertAdjacentElement("afterend",elInput);
}

function exoForm(){
    var text = document.createElement("input");
    var textValue = document.createAttribute("value");
    text.setAttributeNode(textValue);
    text.setAttribute("value","Text");

    var date = document.createElement("input");
    var dateValue = document.createAttribute("value");
    date.setAttributeNode(dateValue);
    date.setAttribute("value","Date");

    var auteur = document.createElement("input");
    var auteurValue = document.createAttribute("value");
    auteur.setAttributeNode(auteurValue);
    auteur.setAttribute("value","Auteur");

    var elbutton = document.createElement("button");
    var attValueB = document.createAttribute("innerHTML");
    attValueB.value = "Ajouter";
    elbutton.setAttributeNode(attValueB);
    elbutton.innerHTML = "Ajouter";

    document.getElementById("titre").insertAdjacentElement("afterend",text);
    document.getElementById("titre").insertAdjacentElement("afterend",date);
    document.getElementById("titre").insertAdjacentElement("afterend",auteur);
    document.getElementById("titre").insertAdjacentElement("afterend",elbutton);
}
