import { Hand } from "./Hand.mjs";
import { shuffleCards } from "./Helpers.mjs";
import { Player } from "./Player.mjs";
import { loadLeaderboard, addToLeaderboard } from "./Leaderboard.mjs";
//varijable potrebne za logiku igre
let player = new Player();
let dealer = new Hand();
//DOM elementi
let leaderboard;
let inputName;
let btnSubmit;
let btnStart;
function readyRound() {
    shuffleCards();
    player.reset();
    dealer.reset();
}
window.addEventListener("load", () => {
    //dohvacanje DOM elemenata
    leaderboard = loadLeaderboard();
    btnStart = document.getElementById("btnStart");
    inputName = document.getElementById("inputUsername");
    btnSubmit = document.getElementById("btnSubmit");
    //dodavajne event listenera
    btnStart.addEventListener("click", readyRound);
    btnSubmit.addEventListener("click", () => {
        addToLeaderboard(leaderboard, inputName.value.trim(), player.getMoney());
    });
    //pocetak igre
    readyRound();
});
