import { Card, cardList } from "./Card.mjs";
import { Hand } from "./Hand.mjs";
import { shuffleCards } from "./Helpers.mjs";
import { Player } from "./Player.mjs";
import { loadLeaderboard, addToLeaderboard, LeaderboardEntry } from "./Leaderboard.mjs";

//varijable potrebne za logiku igre
let leaderboard: LeaderboardEntry[];
let player = new Player();
let dealer = new Hand();

//DOM elementi
let inputName: HTMLInputElement;
let btnSubmit: HTMLElement;

let currentBet: HTMLElement;
let totalBet: HTMLElement;

let btnRemoveOne: HTMLElement;
let btnAddOne: HTMLElement;
let inputBet: HTMLInputElement;

let btnHit: HTMLElement;
let btnStand: HTMLElement;

let btnStart: HTMLElement;

function readyRound(): void {
    shuffleCards();
    player.reset();
    dealer.reset();
}

function updateBet(amount: number, isBtn: boolean): void {
    player.setBet(amount);
    currentBet.innerHTML = player.getBet().toString();
    if (isBtn) inputBet.value = player.getBet().toString();
}

window.addEventListener("load", () => {
    //popunjavanje leaderboarda
    leaderboard = loadLeaderboard();

    //dohvacanje DOM elemenata
    inputName = document.getElementById("inputUsername") as HTMLInputElement;
    btnSubmit = document.getElementById("btnSubmit")!;
    currentBet = document.getElementById("currentBet")!;
    totalBet = document.getElementById("totalBet")!;
    btnRemoveOne = document.getElementById("btnRemoveOne")!;
    btnAddOne = document.getElementById("btnAddOne")!;
    inputBet = document.getElementById("inputBet") as HTMLInputElement;
    btnHit = document.getElementById("btnHit")!;
    btnStand = document.getElementById("btnStand")!;
    btnStart = document.getElementById("btnStart")!;

    //dodavajne event listenera
    btnStart.addEventListener("click", readyRound);
    btnSubmit.addEventListener("click", () => {
        addToLeaderboard(leaderboard, inputName.value.trim(), player.getMoney());
    })
    btnRemoveOne.addEventListener("click", () => { updateBet(player.getBet() - 1, true) })
    btnAddOne.addEventListener("click", () => { updateBet(player.getBet() + 1, true) })
    inputBet.addEventListener("input", () => { updateBet(Number.parseInt(inputBet.value), false) })
    //pocetak igre
    readyRound();
});