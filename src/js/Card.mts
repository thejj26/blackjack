class Card {
    public face: number;    //broj na karti
    public suit: "hearts" | "diamonds" | "clubs" | "spades";    //zog
    public value: number;   //vrijednost u igri
    private img_url: string;    //url za sliku karte
    private dom_element: HTMLElement | undefined;

    constructor(face: number, suit: "hearts" | "diamonds" | "clubs" | "spades") {   //konstruktor
        this.face = face;
        this.suit = suit;
        this.value = face == 1 ? 11 : (face > 10 ? 10 : face);  //ako je as onda 11, ako je 11, 12 ili 13 onda 10, ako ne onda vrijednost na karti
        this.img_url = `../img/${this.suit}${this.face}.png`;   //url na sliku formata "{zog}{broj}.png"
        this.dom_element = undefined;
    }

    public setDOM(): void { //stvara novi DOM element za odgovarajucu kartu
        if (this.dom_element === undefined) return;
        //todo make new html card
    }

    public getDOM(): HTMLElement | undefined {
        return this.dom_element;
    };

    public setHidden(hide: boolean): void { //skriva ili pokazuje dilerovu kartu
        if (hide) { }//todo set DOM img to card backside
        //todo set DOM img to url
    }

    public resetCard() { //postavlja kartu na pocetne vrijednosti
        if (this.dom_element) { //brise DOM element sa stranice/iz memorije i brise referencu
            this.dom_element.remove();
            this.dom_element = undefined;
        }
    }

    private static readonly hidden_img_url = "../img/hidden.png";    //staticka konstanta, sadrzi url na sliku skrivene karte (straznja strana karte)
}

let cardList: Card[] = (() => {
    const list: Card[] = [];
    const suits = ["hearts", "diamonds", "clubs", "spades"] as const;

    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= 13; j++) {
            list.push(new Card(j, suits[i]));
        }
    }

    return list;
})();

export { Card, cardList};