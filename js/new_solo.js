
// Variable de sécurité pour l'écran pause (éviter les doubles actions)
let pause_screen_sec = 0;
// Variable de sécurité pour l'écran de sortie (éviter les doubles actions)
let exit_screen_sec = 0;

// Fonction pour mélanger un tableau
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // index aléatoire entre 0 et i
    [array[i], array[j]] = [array[j], array[i]];   // échange des éléments
  }
  return array;
}

// Fonction pour générer les assertions
function assser_builder(player, assertions){
    let base;

    if(player === 1){
        // Pour le joueur 1
        base = document.querySelector(".player.one");
    } else {
        // Pour le joueur 2
        base = document.querySelector(".player.two");
    }

    // Pour mélanger les assertions
    let asserts = shuffle(assertions);

    // Création de assertions
    let rep_base = base.querySelector(".reponses");
    rep_base.style.height = "140px"; // Hauteur fice de la frame
    let n2; // Pour la disposition des assertions
    if(assertions > 4){
        // En ligne
        n2 = document.createElement("div");
        n2.setAttribute("class", "dispo-1");
    } else if(assertions < 4) {
        // En grille de 4
        n2 = document.createElement("div");
        n2.setAttribute("class", "dispo-2");
    }

    // Génération des assertions
    for(let i = 0; i < asserts.length; i++){
        let n1 = document.createElement("div");
        n1.setAttribute("class", "elmnt");
        n1.setAttribute("onClick", "valid_rep(this)");
        n1.innerText = asserts[i];
        n1.setAttribute('id', i);
        n2.appendChild(n1);
    }
    rep_base.appendChild(n2);
}

// Fonction pour vider les éléments de la frame
function clean_frame(player) {

    let base;

    if(player === 1){
        // Pour le joueur 1
        base = document.querySelector(".player.one");
    } else {
        // Pour le joueur 2
        base = document.querySelector(".player.two");
    }

    // Pour vide projection 
    if(base.querySelector(".projection").querySelector(".question")){
        // Si il y a du texte
        base.querySelector(".projection").querySelector(".question").innerText = "";
    } else {
        // Pour l'image
        base.querySelector(".projection").remove(base.querySelector(".projection").querySelector("img"));
    }
    // Pour vider le explic-frame
    base.querySelector(".explic-frame").innerHTML = "";
    // Pour vider les reponses
    base.querySelector(".reponses").innerHTML = "";
    // Pour vider les "deux boutons" s'il y en a
    base.querySelector(".options").querySelector(".choix-2").innerHTML = "";
    // Pour vider le "bouton unique" s'il y en a
    base.querySelector(".options").querySelector(".choix-1").innerHTML = "";
}

// fonction pour afficher dans la projection-frame (image ou texte);
function projection(player, couleur = 1, type, string){
    /*  
        Pour les couleurs
        1 : Texte simple
        2 : Texte en vert
        3 : Texte en rouge
    */
    let base; // Pour la cibler le joueur

    if(player === 1){
        // Pour le joueur 1
        base = document.querySelector(".player.one").querySelector(".projection");
    } else {
        // Pour le joueur 2
        base = document.querySelector(".player.two").querySelector(".projection");
    }

    // Si le type démander est un texte
    if(type === 1){
        // Si l'objet existe
        if(base.querySelector(".question")){
            base.querySelector(".question").innerText = string;
        } else {
            // Sinon créer l'élément
            let text = document.createElement("p");
            text.setAttribute("class", "question");
            text.innerText = string;
            base.appendChild(text);
        }
    } else if(type === 2) { // Le cas d'une image
        // Si l'objet existe
        if(base.querySelector("img")){
            base.querySelector("img").setAttribute("src", string);
        } else { // Sinon créer l'élément
            let img = document.createElement("img");
            img.setAttribute("src", string);
            base.appendChild(img);
        }
    }

    // Pour définir la couleur des bordures
    if(couleur === 2) {
        base.setAttribute("id", "pr-green");
    } else if(couleur === 3){
        base.setAttribute("id", "pr-red");
    }
}

// Pour afficher dans le status-frame
function status(player, couleur = 1, string){
    /*  
        Pour les couleurs
        1 : Texte simple
        2 : Texte en vert
        3 : Texte en rouge
    */
}

// Fonction pour afficher l'écran de pause
function pause_screen(player){

    clean_frame(player);
    let base; // Pour la cibler le joueur

    if(player === 1){
        // Pour le joueur 1
        base = document.querySelector(".player.one");
    } else {
        // Pour le joueur 2
        base = document.querySelector(".player.two");
    }

    // Si le niveau de sécurité est à 0, il affiche l'écran pause
    if(pause_screen_sec === 0){

        projection(player, 1, 1, "Pause")
       
        // Pour afficher le texte de pause dans la frame de status
        base.querySelector(".status-frame").querySelector(".text-status").innerText = "En pause";

        // Création du bouton pour quitter le mode pause
        let btn = document.createElement("div");
        btn.setAttribute("class", "btn-1");
        btn.setAttribute("onClick", "reprise()");
        btn.innerText = "Reprendre";
        base.querySelector(".options").querySelector(".choix-1").appendChild(btn);

        // On met la sécurité à 1
        pause_screen_sec = 1;
    }
}

// Fonction pour afficher l'écran de sorti
function exit_screen(player){
    // Pour néttoyer la frame du joueur
    clean_frame(player);
    let base; // Pour cibler le joueur
    if(player === 1){
        // Pour le joueur 1
        base = document.querySelector(".player.one");
    } else {
        // Pour le joueur 2
        base = document.querySelector(".player.two");
    }

    // Si le niveau de sécurité est à 0, il affiche l'écran de sortie
    if(exit_screen_sec === 0){
        // Affichage du texte de sortie dans la projection frame
        base.querySelector(".projection").querySelector(".question").innerText = "Vous êtes sur le point de quitter la partie";
        // Affichage du texte de sortie dans le status-frame
        base.querySelector(".status-frame").querySelector(".text-status").innerText = "Voulez vous quitter la partie ?";
        
        // Base pour les outons de la fenêtre modale
        let options_2 = base.querySelector(".options").querySelector(".choix-2");
        // Bouton pour annuler l'action
        let btn1 = document.createElement("div");
        btn1.setAttribute("class", "btn-2a");
        btn1.setAttribute("onClick", "resume(" + player +")");
        btn1.innerText = "Annuler";
        // Bouton pour annuler l'action
        let btn2 = document.createElement("div");
        btn2.setAttribute("class", "btn-2b");
        btn2.setAttribute("onClick", "fin_jeux(" + player +")");
        btn2.innerText = "Quitter";
        btn2.setAttribute("id", "btn2-rd");

        // On ajoute à la frame
        options_2.appendChild(btn1);
        options_2.appendChild(btn2);

        // On mets la sécurité à 1
        exit_screen_sec = 1;
    }
}

function save_player(player){
    let base; // Pour cibler le joueur
    if(player === 1){
        // Pour le joueur 1
        base = document.querySelector(".player.one");
    } else {
        // Pour le joueur 2
        base = document.querySelector(".player.two");
    }

    // Affichage du texte dans la frame de projection
    projection(player, 1, 1, "Entrer votre nom");

    // Création du champ de texte
    let champ = document.createElement("input");
    champ.setAttribute("class", "name_usr");
    champ.setAttribute("placeholder", "Entrer votre nom");
    // Ajout dans la explic-frame
    base.querySelector(".explic-frame").appendChild(champ);

    // Ajout du bouton pour débuter le jeux
    let btn = document.createElement("div");
    btn.setAttribute("class", "btn-1");
    btn.innerText = "Commencer";
    btn.setAttribute("onClick", "start_game(" + player + ")");
    base.querySelector(".options").querySelector(".choix-1").appendChild(btn);


}

// Fonction pour le décompte
let decompte_v; // Variable pour le compteur
function decompte() {

    const b1 = document.querySelector(".projection");
    const n1 = document.createElement("img");
    const all = document.querySelectorAll(".elmnt");
    decompte_v = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            chrono.innerText = timeLeft;
        } else {
            clearInterval(decompte_v);
            chrono.innerText = "Verdict";
            // Grise tous les boutons
            for (let i = 0; i < all.length; i++) {
                all[i].setAttribute("id", "grisee");
            }
            timeLeft = 12;
            setTimeout(()=>{
                n1.setAttribute("src", correct_img);
                b1.setAttribute("id", "pr-red");
                b1.querySelector(".question").innerText = "";
                chrono.innerText = "Lent";
                chrono.setAttribute("id", "red-st");
                const options = document.querySelector(".choix-1");
                let nw = document.createElement("div");
                nw.setAttribute("class", "btn-1");
                nw.innerText = "Continuer";
                nw.setAttribute("onClick", "skip_btn()");
                for (let i = 0; i < all.length; i++) {
                    if(all[i].innerText === correct){
                        all[i].setAttribute("id", "true-btn");
                    }
                }
                options.appendChild(nw);
                b1.appendChild(n1);
            }, 1000)
        }
    }, 1000);
}

function valid_rep(player, rep){
    let base; // Pour cibler le joueur
    if(player === 1){
        // Pour le joueur 1
        base = document.querySelector(".player.one");
    } else {
        // Pour le joueur 2
        base = document.querySelector(".player.two");
    }

    // Type de disposition d'assertion
    if(base.querySelector(".reponses").querySelector(".dispo-1")){
        // En ligne

    } else { // En 4

    }
}

save_player(1);