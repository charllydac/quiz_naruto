let button1 = document.querySelector(".btn-1");
let quizData;
let lock1 = 0;
let count1 = 0;
let timeLeft = 12;
let decompte_v;
let count = document.getElementById("count");
let max = document.getElementById('max');
let chrono = document.querySelector(".text-status");
let name1;
let correct;
let correct_img;
let score1 = 0;
let ques;
let index_q = 0;
let historique = [];

async function start_game(){
    let reponse = await fetch("question.json");
    let questions = await reponse.json();

    max.innerText = questions.length;

    index_q = getUniqueRandomInt(1, questions.length);
    
    load_question(questions[index_q]);
}

function assser_builder(assertions, type = 1){
    let base = document.querySelector(".player");
    if(base.querySelector(".reponses")){
        let rep_base = base.querySelector(".reponses");
        rep_base.style.height = "140px";
        let n2;
        if(type === 1){
            n2 = document.createElement("div");
            n2.setAttribute("class", "dispo-1");
        } else {
            n2 = document.createElement("div");
            n2.setAttribute("class", "dispo-2");
        }
        for(let i = 0; i < assertions.length; i++){
            let n1 = document.createElement("div");
            n1.setAttribute("class", "elmnt");
            n1.setAttribute("onClick", "valid_rep(this)");
            n1.innerText = assertions[i];
            n1.setAttribute('id', i);
            n2.appendChild(n1);
        }
        rep_base.appendChild(n2);
    }
}

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

function skip_btn() {

    start_game();
}

function valid_rep(event) {

    let classes = event.parentElement.parentElement.parentElement.parentElement; // DOMTokenList
    let n00 = classes.className;

    let propre = "." + n00.replaceAll(" ", ".");

    let base = document.querySelector(propre);

    clearInterval(decompte_v);
    timeLeft = 12;
    chrono.innerText = "Verdict"

    const b1 = document.querySelector(".projection");
    const n1 = document.createElement("img");
    const all = base.querySelectorAll(".elmnt");

    // Grise tous les boutons
    for (let i = 0; i < all.length; i++) {
        all[i].setAttribute("id", "grisee");
    }

    event.setAttribute("id", "fonce");

    // Vérifie la bonne réponse
    setTimeout(()=>{
        if (event.innerText === correct) {
            event.setAttribute("id", "true-btn");
            n1.setAttribute("src", correct_img);
            b1.setAttribute("id", "pr-green");
            b1.querySelector(".question").innerText = "";
            score1 += 1;
            document.querySelector(".score").innerText = score1;
            chrono.innerText = "Correcte";
            chrono.setAttribute("id", "green-st");

        } else {
            event.setAttribute("id", "false-btn");
            n1.setAttribute("src", correct_img);
            b1.setAttribute("id", "pr-red");
            b1.querySelector(".question").innerText = "";
            chrono.innerText = "Incorrecte";
            // Grise tous les boutons
            for (let i = 0; i < all.length; i++) {
                if(all[i].innerText === correct){
                    all[i].setAttribute("id", "true-btn");
                }
            }
            chrono.setAttribute("id", "red-st");
        }

        const options = document.querySelector(".choix-1");
        let nw = document.createElement("div");
        nw.setAttribute("class", "btn-1");
        nw.innerText = "Continuer";
        nw.setAttribute("onClick", "skip_btn()");

        options.appendChild(nw);
        b1.appendChild(n1);
    },1000);
}

function prepa_new(){
    const b1 = document.querySelector(".projection");
    if(b1.querySelector("img")){
        b1.querySelector("img").remove();
    }

    if(document.querySelector(".choix-1").querySelector(".btn-1")){
        let b5 = document.querySelector(".choix-1")
        b5.innerHTML = "";
    }
    
    b1.setAttribute("id", "");
    chrono.innerText = timeLeft;
    chrono.setAttribute("id", "");
    const c1 = document.querySelector(".reponses");
    c1.innerHTML = "";
}

function getUniqueRandomInt(min, max) {
  // Tous les nombres possibles ont déjà été tirés
  if (historique.length >= (max - min + 1)) {
    throw new Error("Tous les nombres possibles ont été générés.");
  }

  let nombre;
  do {
    nombre = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (historique.includes(nombre));

  historique.push(nombre);
  return nombre;
}


function exit(jid) {

    prepa_new();

    let base;

    if(jid === 1){
        base = document.querySelector(".player.one");
    } else {
        base = document.querySelector(".player.two");
    }

    let b1 = base.querySelector(".options");
    let b2 = document.createElement("div");
    b2.setAttribute("class", "choix-2");
    let btn2a = document.createElement("div");
    btn2a.setAttribute("class", "btn-2a");
    btn2a.innerText = "Annuler";
    let btn2b = document.createElement("div");
    btn2b.setAttribute("class", "btn-2b");
    btn2b.setAttribute("id", "btn2-rd");
    btn2b.innerText = "Quitter";
    btn2b.setAttribute("onClick", "exit_game(this)");

    b2.appendChild(btn2a);
    b2.appendChild(btn2b);
    b1.appendChild(b2);
    
}

function verifie(){
    
}

function load_question(question){

    prepa_new();

    let base = document.querySelector(".player");
    let projection = base.querySelector(".projection");
    projection.querySelector(".question").innerText = question['question'];

    assser_builder(question['answers'], 1);
    correct = question['correct'];
    correct_img = question['img']
    count1 += 1;
    count.innerText = count1;
    chrono.innerText = timeLeft;
    decompte();
}

function questions_count(){

    start_game().then(rep =>{
        console.log("sfs")
        
    })
}

function name_check(player = ".player.one"){
    let base = document.querySelector(player);
    let nameElement = base.querySelector(".name_usr");
    let name = nameElement?.value.trim() ?? "";
    let project = base.querySelector(".projection");
    if(name === ""){
        project.setAttribute("id", "pr-red");
        project.querySelector(".question").innerText = "Entrer un nom valide";
    } else {
        document.querySelector(".btn-1").remove();
        nameElement.remove();
        name1 = name;
        jouer(act);
        start_game();
    }
}