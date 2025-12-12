import { Hand } from "./Hand.mjs"

class Player extends Hand { //klasa igraca
    private money: number;  //dostupan novac
    private bet: number;    //oklada

    constructor() {
        super();
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
        this.bet = 10;
    }

    public loseBet(): void {    //gubitak
        this.money - + this.bet;
        this.bet = 10;
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