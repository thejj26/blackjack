import Card from "./Card.mts"

class Hand {
    public cards: Card[];   //karte u ruci
    public totalValue: number; //ukupna vrijednost ruke
    private aces: Card[];   //sadrzi aseve, koristi se za mijenjanje vrijednosti aseva

    constructor() {
        this.cards = [];
        this.totalValue = 0;
        this.aces = [];
    }

    private updateValue(c: Card): void { //vraca novu vrijednost ruke s obzirom na dodanu kartu
        this.totalValue += c.value;
        while (this.totalValue > 21 && this.aces.pop() != undefined) this.totalValue -= 10; //dok je vrijednost veca od 21 i dok postoje (nepromijenjeni) asevi
    }

    public addCard(c: Card): void {  //dodaje novu kartu u ruku i racuna novu vrijednost
        this.cards.push(c);
        if (c.face == 1) this.aces.push(c); //ako je as
        this.updateValue(c);    //nova vrijednost ruke
    }

    public resetDeck():void{
        while(this.cards.length>0){
            this.cards.pop()?.resetCard();
        }
        this.totalValue = 0;
        this.aces = [];
    }

}

export default Hand;