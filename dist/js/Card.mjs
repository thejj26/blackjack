class Card {
    constructor(face, suit) {
        this.face = face;
        this.suit = suit;
        this.value = face == 1 ? 11 : (face > 10 ? 10 : face); //ako je as onda 11, ako je 11, 12 ili 13 onda 10, ako ne onda vrijednost na karti
        this.img_url = `../img/${this.suit}${this.face}.png`; //url na sliku formata "{zog}{broj}.png"
        this.dom_element = undefined;
    }
    setDOM() {
        if (this.dom_element === undefined)
            return;
        //todo make new html card
    }
    getDOM() {
        return this.dom_element;
    }
    ;
    setHidden(hide) {
        if (hide) { } //todo set DOM img to card backside
        //todo set DOM img to url
    }
    resetCard() {
        if (this.dom_element) { //brise DOM element sa stranice/iz memorije i brise referencu
            this.dom_element.remove();
            this.dom_element = undefined;
        }
    }
}
Card.hidden_img_url = "../img/hidden.png"; //staticka konstanta, sadrzi url na sliku skrivene karte (straznja strana karte)
let cardList = (() => {
    const list = [];
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= 13; j++) {
            list.push(new Card(j, suits[i]));
        }
    }
    return list;
})();
export { Card, cardList };
