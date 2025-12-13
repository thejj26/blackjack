import { nextCard } from "./Card.mjs";
import { Person } from "./Person.mjs";
class Player extends Person {
    constructor(element) {
        super(element);
        this.money = 10;
        this.bet = 1;
    }
    getMoney() { return this.money; }
    setBet(amount) {
        if (amount > this.money)
            this.bet = this.money;
        else
            this.bet = amount > 1 ? amount : 1;
    }
    getBet() { return this.bet; }
    ;
    winBet() {
        this.money += this.bet;
    }
    loseBet() {
        this.money -= this.bet;
        if (this.money < 0)
            this.money = 0;
    }
    hit() {
        this.addCard(nextCard());
        let lastCard = this.cards[this.cards.length - 1];
        this.DOM.appendChild(lastCard.getDOM());
        return this.totalValue >= 21;
    }
    reset() {
        while (this.cards.length > 0) {
            this.cards.pop().resetCard();
        }
        this.totalValue = 0;
        this.aces = [];
        this.bet = 1;
    }
}
export { Player };
