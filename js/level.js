
function start(lvl){

    let params = new URLSearchParams(window.location.search);
    let type = params.get("type");
    let string;
    if(type === "solo"){
        string = "game-solo.html?lvl=" + lvl;
    } else {
        string = "game-duo.html?lvl=" + lvl;
    }

    window.location.href = string;
}