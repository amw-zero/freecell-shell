[@decco]
type suit =
  | Clubs
  | Diamonds
  | Hearts
  | Spades;

[@decco]
type card = {
  suit,
  rank: int,
};

type cardList = list(card);
type cardMatrix = list(cardList);

type systemError =
  | NetworkFailure
  | RequestException
  | Etc;

type environment = {
  cards: cardMatrix,
  error: option(systemError),
};

let allSuits = [Clubs, Diamonds, Hearts, Spades];
let allRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];


let endpointRegistry: Hashtbl.t(int, int) = Hashtbl.create(50);
Hashtbl.add(endpointRegistry, 5);