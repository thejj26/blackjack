import { nextCard } from "./Card.mjs";
import { Person } from "./Person.mjs"

class Player extends Person { //klasa igraca
    private money: number;  //dostupan novac
    private bet: number;    //oklada

    constructor(element: HTMLElement) {
        super(element);
        this.money = 10;
        this.bet = 1;
    }

    public getMoney(): number { return this.money }

    public setBet(amount: number): void {
        if (amount > this.money) this.bet = this.money;
        else this.bet = amount > 1 ? amount : 1;
    }

    public getBet(): number { return this.bet };

    public winBet(): void { //dobitak
        this.money += this.bet;
    }

    public loseBet(): void {    //gubitak
        this.money -= this.bet;
        if (this.money < 0) this.money = 0;
    }

    public override hit(): boolean {
        this.addCard(nextCard());
        let lastCard = this.cards[this.cards.length - 1];
        this.DOM.appendChild(lastCard.getDOM());
        return this.totalValue >= 21;
    }

    public override reset(): void { //reseta i novac te okladu
        while (this.cards.length > 0) {
            this.cards.pop()!.resetCard();
        }
        this.totalValue = 0;
        this.aces = [];
        this.bet = 1;
    }

}

export { Player };