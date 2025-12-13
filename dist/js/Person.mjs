import { nextCard } from "./Card.mjs";
import { delay } from "./main.mjs";
class Person {
    constructor(element) {
        this.cards = [];
        this.totalValue = 0;
        this.aces = [];
        this.DOM = element;
    }
    updateValue(c) {
        this.totalValue += c.value;
        while (this.totalValue > 21 && this.aces.pop() != undefined)
            this.totalValue -= 10; //dok je vrijednost veca od 21 i dok postoje (nepromijenjeni) asevi
    }
    addCard(c) {
        this.cards.push(c);
        if (c.face == 1)
            this.aces.push(c); //ako je as
        this.updateValue(c); //nova vrijednost ruke
    }
    hit() {
        this.addCard(nextCard());
        let lastCard = this.cards[this.cards.length - 1];
        if (this.cards.length > 1)
            lastCard.setHidden(true);
        this.DOM.appendChild(lastCard.getDOM());
        return this.totalValue > 21;
    }
    countAces() {
        return this.aces.length;
    }
    async revealCards() {
        await delay(1000);
        for (let i = 1; i < this.cards.length; i++)
            this.cards[i].setHidden(false);
    }
    reset() {
        while (this.cards.length > 0) {
            this.cards.pop().resetCard();
        }
        this.totalValue = 0;
        this.aces = [];
    }
}
export { Person };
