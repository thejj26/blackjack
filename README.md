# BLACKJACK
Seminarski projekt iz kolegija **Objektno Orijentirano Programiranje(120)** akademske godine 2025./2026.
## UKRATKO
Web aplikacija koja korisniku omogucava igranje kartaske igre Blackjak.
Cilj je postici sto veci broj zetona kladenjem bez da ih se sve izgubi. Postizanjem zeljenog broja zetona moguce je svoj rezultat spremiti u leaderboard.
## ALATI
Program je izveden kao web aplikacija koristeci HTML i CSS za prikaz sucelja te JavaScript odnosno TypeScript za realiziranje funkcionalnosti. Pisan je koristeci Visual Studio Code.
## STRUKTURA
###  ./`tsconfig.json`
Datoteka sadrzi konfiguracijske opcije za kompajliranje TypeScript datoteka u JavaScript. Ovo je potrebno kako bi se kod mogao pokrecati i na browserima koji ne podrzavaju neke modernije standarde (npr. `.mts` datoteke) te za postavljanje MIME specifikacija.
### `./src`
Sadrzi stukturu izvorih datoteka projekta.
### `./dist`
Sadrzi JavaScript datoteke generirane kompajliranjem izvornih TypeScript datoteka.