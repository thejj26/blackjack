import { Card, cardList } from "./Card.mjs";
import { Hand } from "./Hand.mjs";
import { shuffleCards } from "./Helpers.mjs";
import { Player } from "./Player.mjs";
import { loadLeaderboard, addToLeaderboard, LeaderboardEntry } from "./Leaderboard.mjs";

//varijable potrebne za logiku igre
let player = new Player();
let dealer = new Hand();

//DOM elementi
let leaderboard: LeaderboardEntry[];
let inputName: HTMLInputElement;
let btnSubmit: HTMLElement;

let btnStart: HTMLElement;

function readyRound(): void {
    shuffleCards();
    player.reset();
    dealer.reset();
}

window.addEventListener("load", () => {
    //dohvacanje DOM elemenata
    leaderboard = loadLeaderboard();
    btnStart = document.getElementById("btnStart")!;
    inputName = document.getElementById("inputUsername") as HTMLInputElement;
    btnSubmit = document.getElementById("btnSubmit")!;
    //dodavajne event listenera
    btnStart.addEventListener("click", readyRound);
    btnSubmit.addEventListener("click", () => {
        addToLeaderboard(leaderboard, inputName.value.trim(), player.getMoney());
    })
    //pocetak igre
    readyRound();
});