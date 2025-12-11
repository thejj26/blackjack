import { Card, cardList } from "./Card.mjs"
import {Hand} from "./Hand.mjs"

function shuffleCards(): void { //nasumicno slaze karte u spilu
    for (let i = cardList.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardList[i], cardList[j]] = [cardList[j], cardList[i]];
    }
}

export {shuffleCards}