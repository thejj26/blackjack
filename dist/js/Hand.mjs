class Hand {
    constructor() {
        this.cards = [];
        this.totalValue = 0;
        this.aces = [];
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
    reset() {
        while (this.cards.length > 0) {
            this.cards.pop().resetCard();
        }
        this.totalValue = 0;
        this.aces = [];
    }
}
export { Hand };
