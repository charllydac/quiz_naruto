// Lecteur de musique en arrière plan

let sound = document.getElementById("btn-vol");
let lecteur = document.getElementById('lecteur_audio');
let act = 0;
const playlist = [
    {title: "M1", file: "/musiques/M%20(1).mp3"},
    {title: "M2", file: "/musiques/M%20(2).mp3"},
    {title: "M3", file: "/musiques/M%20(3).mp3"},
    {title: "M4", file: "/musiques/M%20(4).mp3"},
    {title: "M5", file: "/musiques/M%20(5).mp3"},
    {title: "M6", file: "/musiques/M%20(6).mp3"},
    {title: "M7", file: "/musiques/M%20(7).mp3"}
]

function jouer(index) {
      const track = playlist[index];
      lecteur.src = track.file;
      lecteur.play();
    }

sound.addEventListener("click", ()=>{
    if(sound.className === "fa-solid fa-volume-high"){
        sound.setAttribute("class", "fa-solid fa-volume-xmark");
        lecteur.muted = !lecteur.muted;
    } else {
        sound.setAttribute("class", "fa-solid fa-volume-high");
        lecteur.muted = !lecteur.muted;
    }  
})

// Lecture automatique suivante
lecteur.onended = () => {
    act = (act + 1) % playlist.length;
    jouer(act);
};

// Chargement initial (lecture en arrière-plan)
    window.addEventListener("DOMContentLoaded", () => {
    jouer(act);
});