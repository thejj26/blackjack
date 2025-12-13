import { shuffleCards } from "./Card.mjs";
import { Person } from "./Person.mjs";
import { Player } from "./Player.mjs";
import { loadLeaderboard, addToLeaderboard } from "./Leaderboard.mjs";
import { showToast } from "./Toast.mjs";
//varijable potrebne za logiku igre
let leaderboard;
let player;
let dealer;
//DOM elementi
let inputName;
let btnSubmit;
let placeBet;
let currentBet;
let totalBet;
let btnRemoveOne;
let btnAddOne;
let inputBet;
let btnHit;
let btnStand;
let btnStart;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function setDisabled(state) {
    btnHit.disabled = state; //false - leaderdboard i ostalo
    btnStand.disabled = state;
    inputName.disabled = !state || player.getMoney() <= 10;
    btnSubmit.disabled = !state || player.getMoney() <= 10;
    btnRemoveOne.disabled = !state;
    btnAddOne.disabled = !state;
    inputBet.disabled = !state;
    btnStart.disabled = !state;
    if (state)
        placeBet.classList.remove("disabled");
    else
        placeBet.classList.add("disabled");
}
function updateBet(amount, isBtn) {
    player.setBet(amount);
    currentBet.innerHTML = player.getBet().toString();
    if (isBtn)
        inputBet.value = player.getBet().toString();
}
function updateBetRange() {
    inputBet.setAttribute("max", player.getMoney().toString());
    inputBet.value = player.getBet().toString();
    totalBet.innerHTML = player.getMoney().toString();
    updateBet(1, false);
}
function readyRound() {
    shuffleCards();
    player.reset();
    dealer.reset();
    updateBetRange();
    setDisabled(true);
}
function startRound() {
    setDisabled(false);
    hitPlayer();
    hitPlayer();
    dealer.hit();
    dealer.hit();
}
function disableControls() {
    btnHit.disabled = true;
    btnStand.disabled = true;
}
function hitPlayer() {
    if (!player.hit())
        return; //ako nije prekoraceno 21
    else if (player.totalValue == 21)
        stand();
    else
        loss();
}
async function stand() {
    disableControls();
    while (dealer.totalValue < 17 || (dealer.totalValue === 17 && dealer.countAces() > 0)) {
        await delay(500);
        dealer.hit();
    }
    await dealer.revealCards();
    if (dealer.totalValue < player.totalValue || dealer.totalValue > 21)
        win();
    else if (dealer.totalValue > player.totalValue)
        loss();
    else
        draw();
}
async function win() {
    disableControls();
    player.winBet();
    await showToast("win", player.getBet());
    readyRound();
}
async function loss() {
    disableControls();
    dealer.revealCards();
    player.loseBet();
    await showToast("lose", player.getBet());
    if (player.getMoney() == 0) { //ukoliko igrac vise nema novaca
        alert("You ran out of money.\n\nGame over!");
        window.location.reload();
    }
    readyRound();
}
async function draw() {
    disableControls();
    await showToast("draw", player.getBet());
    readyRound();
}
window.addEventListener("load", () => {
    //popunjavanje leaderboarda
    leaderboard = loadLeaderboard();
    //dohvacanje DOM elemenata
    inputName = document.getElementById("inputUsername");
    btnSubmit = document.getElementById("btnSubmit");
    placeBet = document.getElementById("placeBet");
    currentBet = document.getElementById("currentBet");
    totalBet = document.getElementById("totalBet");
    btnRemoveOne = document.getElementById("btnRemoveOne");
    btnAddOne = document.getElementById("btnAddOne");
    inputBet = document.getElementById("inputBet");
    btnHit = document.getElementById("btnHit");
    btnStand = document.getElementById("btnStand");
    btnStart = document.getElementById("btnStart");
    //dodavajne event listenera
    btnStart.addEventListener("click", startRound);
    btnSubmit.addEventListener("click", () => {
        addToLeaderboard(leaderboard, inputName.value.trim(), player.getMoney());
    });
    btnRemoveOne.addEventListener("click", () => { updateBet(player.getBet() - 1, true); });
    btnAddOne.addEventListener("click", () => { updateBet(player.getBet() + 1, true); });
    inputBet.addEventListener("input", () => { updateBet(Number.parseInt(inputBet.value), false); });
    btnHit.addEventListener("click", hitPlayer);
    btnStand.addEventListener("click", stand);
    //pocetak igre
    dealer = new Person(document.getElementById("dealerSide"));
    player = new Player(document.getElementById("playerSide"));
    readyRound();
});
export { delay };
