import { Hand } from "./Hand.mjs";
class Player extends Hand {
    constructor() {
        super();
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
        this.bet = 10;
    }
    loseBet() {
        this.money - +this.bet;
        this.bet = 10;
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
