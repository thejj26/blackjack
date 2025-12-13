import { Card, nextCard } from "./Card.mjs"
import { delay } from "./main.mjs";

class Person {
    public cards: Card[];   //karte u ruci
    public totalValue: number; //ukupna vrijednost ruke
    protected aces: Card[];   //sadrzi aseve, koristi se za mijenjanje vrijednosti aseva
    protected DOM: HTMLElement;   //DOM element pripadajuceg objekta

    constructor(element: HTMLElement) {
        this.cards = [];
        this.totalValue = 0;
        this.aces = [];
        this.DOM = element;
    }

    protected updateValue(c: Card): void { //vraca novu vrijednost ruke s obzirom na dodanu kartu
        this.totalValue += c.value;
        while (this.totalValue > 21 && this.aces.pop() != undefined) this.totalValue -= 10; //dok je vrijednost veca od 21 i dok postoje (nepromijenjeni) asevi
    }

    public addCard(c: Card): void {  //dodaje novu kartu u ruku i racuna novu vrijednost
        this.cards.push(c);
        if (c.face == 1) this.aces.push(c); //ako je as
        this.updateValue(c);    //nova vrijednost ruke
    }

    public hit(): boolean { //dodaje novu kartu te obavlja dodavanje DOM elementa
        this.addCard(nextCard());
        let lastCard = this.cards[this.cards.length - 1];
        if (this.cards.length > 1) lastCard.setHidden(true);
        this.DOM.appendChild(lastCard.getDOM());
        return this.totalValue > 21;
    }

    public countAces(): number {
        return this.aces.length;
    }

    async revealCards(): Promise<void> {    //prikazuje dilerove karte te pauzira igru na par sekundi
        await delay(1000);
        for (let i = 1; i < this.cards.length; i++) this.cards[i].setHidden(false);
    }

    public reset(): void {
        while (this.cards.length > 0) {
            this.cards.pop()!.resetCard();
        }
        this.totalValue = 0;
        this.aces = [];
    }

}

export { Person };