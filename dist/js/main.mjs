import { Hand } from "./Hand.mjs";
import { shuffleCards } from "./Helpers.mjs";
import { Player } from "./Player.mjs";
import { loadLeaderboard, addToLeaderboard } from "./Leaderboard.mjs";
//varijable potrebne za logiku igre
let leaderboard;
let player = new Player();
let dealer = new Hand();
//DOM elementi
let inputName;
let btnSubmit;
let currentBet;
let totalBet;
let btnRemoveOne;
let btnAddOne;
let inputBet;
let btnHit;
let btnStand;
let btnStart;
function readyRound() {
    shuffleCards();
    player.reset();
    dealer.reset();
}
function updateBet(amount, isBtn) {
    player.setBet(amount);
    currentBet.innerHTML = player.getBet().toString();
    if (isBtn)
        inputBet.value = player.getBet().toString();
}
window.addEventListener("load", () => {
    //popunjavanje leaderboarda
    leaderboard = loadLeaderboard();
    //dohvacanje DOM elemenata
    inputName = document.getElementById("inputUsername");
    btnSubmit = document.getElementById("btnSubmit");
    currentBet = document.getElementById("currentBet");
    totalBet = document.getElementById("totalBet");
    btnRemoveOne = document.getElementById("btnRemoveOne");
    btnAddOne = document.getElementById("btnAddOne");
    inputBet = document.getElementById("inputBet");
    btnHit = document.getElementById("btnHit");
    btnStand = document.getElementById("btnStand");
    btnStart = document.getElementById("btnStart");
    //dodavajne event listenera
    btnStart.addEventListener("click", readyRound);
    btnSubmit.addEventListener("click", () => {
        addToLeaderboard(leaderboard, inputName.value.trim(), player.getMoney());
    });
    btnRemoveOne.addEventListener("click", () => { updateBet(player.getBet() - 1, true); });
    btnAddOne.addEventListener("click", () => { updateBet(player.getBet() + 1, true); });
    inputBet.addEventListener("input", () => { updateBet(Number.parseInt(inputBet.value), false); });
    //pocetak igre
    readyRound();
});
