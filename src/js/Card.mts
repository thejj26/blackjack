class Card {
    public face: number;    //broj na karti
    public suit: "HEART" | "DIAMOND" | "CLUB" | "SPADE";    //zog
    public value: number;   //vrijednost u igri
    private img_url: string;    //url za sliku karte
    private DOM: HTMLElement | undefined;

    constructor(face: number, suit: "HEART" | "DIAMOND" | "CLUB" | "SPADE") {   //konstruktor
        this.face = face;
        this.suit = suit;
        this.value = face == 1 ? 11 : (face > 10 ? 10 : face);  //ako je as onda 11, ako je 11, 12 ili 13 onda 10, ako ne onda vrijednost na karti
        this.img_url = `../src/img/${this.suit}-${this.face}.svg`;   //url na sliku formata "{zog}{broj}.png"
        this.DOM = undefined;
    }

    public setDOM(): void { //stvara novi DOM element za odgovarajucu kartu
        this.DOM = document.createElement("div");
        this.DOM.classList.add("card");
        this.DOM.innerHTML = `<img src="${this.img_url}">`
    }

    public getDOM(): HTMLElement {
        return this.DOM!;
    };

    public setHidden(hide: boolean): void { //skriva ili pokazuje dilerovu kartu
        this.DOM!.firstElementChild!.setAttribute("src", hide ? "../src/img/back.svg" : this.img_url);
    }

    public resetCard() { //brise DOM element sa stranice/iz memorije i brise referencu
        if (this.DOM === undefined) return;
        this.DOM!.remove();
        this.DOM = undefined;
    }
}

let index = 0;

let cardList: Card[] = (() => {
    const list: Card[] = [];
    const suits = ["HEART", "DIAMOND", "CLUB", "SPADE"] as const;

    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= 13; j++) {
            list.push(new Card(j, suits[i]));
        }
    }

    return list;
})();

function shuffleCards(): void { //nasumicno slaze karte u spilu
    index = 0;
    for (let i = cardList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardList[i], cardList[j]] = [cardList[j], cardList[i]];
    }
}

function nextCard(): Card { //vraca iducu kartu u spilu
    let current = cardList[index++];
    current.setDOM();
    return current;
}

export { Card, shuffleCards, nextCard };