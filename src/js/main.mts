import { Card, cardList } from "./Card.mjs"
import { Hand } from "./Hand.mjs"
import { shuffleCards } from "./Helpers.mjs";

let player = new Hand(), dealer = new Hand();
shuffleCards();
console.log(cardList);
