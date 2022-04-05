// lecture variable primitive
let prenom = "briavel";

//save
localStorage.setItem("joueur", prenom);

//lire
let newJoueur = localStorage.getItem("joueur");
// console.log(newJoueur);

//tableau de joueurs
let prenomsJoueurs = ["Loan", "Morgane", "Ilan", "Joachim"];
localStorage.setItem("joueurs", prenomsJoueurs);
let liste = localStorage.getItem("joueurs");
console.log(liste);

//lecture / ecriture objet
let gardien = {prenom: "david",nom: "lansonneur", ecole:"cesi", ville:"brest"};
// avant de stocker il faut le transform en string
localStorage.setItem("gardien",JSON.stringify(gardien));
//lire
let gardienLu = localStorage.getItem
("gardien");
//avant transfo
console.log(gardienLu);
//revenir a un objet
let objetGardienLu = JSON.parse(gardienLu);
