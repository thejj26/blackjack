class Card {
    constructor(face, suit) {
        this.face = face;
        this.suit = suit;
        this.value = face == 1 ? 11 : (face > 10 ? 10 : face); //ako je as onda 11, ako je 11, 12 ili 13 onda 10, ako ne onda vrijednost na karti
        this.img_url = `../src/img/${this.suit}-${this.face}.svg`; //url na sliku formata "{zog}{broj}.png"
        this.DOM = undefined;
    }
    setDOM() {
        this.DOM = document.createElement("div");
        this.DOM.classList.add("card");
        this.DOM.innerHTML = `<img src="${this.img_url}">`;
    }
    getDOM() {
        return this.DOM;
    }
    ;
    setHidden(hide) {
        this.DOM.firstElementChild.setAttribute("src", hide ? "../src/img/back.svg" : this.img_url);
    }
    resetCard() {
        if (this.DOM === undefined)
            return;
        this.DOM.remove();
        this.DOM = undefined;
    }
}
let index = 0;
let cardList = (() => {
    const list = [];
    const suits = ["HEART", "DIAMOND", "CLUB", "SPADE"];
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= 13; j++) {
            list.push(new Card(j, suits[i]));
        }
    }
    return list;
})();
function shuffleCards() {
    index = 0;
    for (let i = cardList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardList[i], cardList[j]] = [cardList[j], cardList[i]];
    }
}
function nextCard() {
    let current = cardList[index++];
    current.setDOM();
    return current;
}
export { Card, shuffleCards, nextCard };
