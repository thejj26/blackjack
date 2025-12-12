import { Card, cardList } from "./Card.mjs";
import { Hand } from "./Hand.mjs";
import { shuffleCards } from "./Helpers.mjs";
import { Player } from "./player.mjs";
import { loadLeaderboard, addToLeaderboard, LeaderboardEntry } from "./Leaderboard.mjs";

let player = new Player();
let dealer = new Hand();
let leaderboard: LeaderboardEntry[];

window.addEventListener("load", () => {
    leaderboard = loadLeaderboard();
    readyRound();
});

function readyRound(): void {
    shuffleCards();
    console.log(cardList);
    player.reset();
    dealer.reset();
}