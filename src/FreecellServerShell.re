open FreecellShared;

module IO = Relude.IO;
module L = Relude.List;
module O = Relude.Option;

let allSuits = [Clubs, Diamonds, Hearts, Spades];
let allRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

module Command = {
  type cascadeBuilder = {
    cascades: list(list(card)),
    taken: int,
  };
  let createGame = (~shuffler) => {
    let generateCards = () => {
      let allPairs = (e, l2) => L.map(le => (e, le), l2);
      let generateCombinations = (s1, s2) =>
        L.foldLeft((a, e) => a @ allPairs(e, s2), [], s1);

      let allCards =
        generateCombinations(allSuits, allRanks)
        |> L.map(c => {suit: fst(c), rank: snd(c)});

      O.fold(allCards, s => s(allCards), shuffler);
    };

    let cascadesFrom = cards => {
      let cascadeLengths = [7, 7, 7, 7, 6, 6, 6, 6];
      let nextCascade = (cards, drop, take) =>
        L.drop(drop, cards) |> L.take(take);
      let appendCascade = (cards, cascadeBuilder, length) =>
        [nextCascade(cards, cascadeBuilder.taken, length)]
        @ cascadeBuilder.cascades;

      let cardsToCascade = (cascadeBuilder, length) => {
        cascades: appendCascade(cards, cascadeBuilder, length),
        taken: cascadeBuilder.taken + length,
      };

      L.foldLeft(cardsToCascade, {cascades: [], taken: 0}, cascadeLengths).
        cascades
      |> L.reverse;
    };

    let cards = generateCards();
    let cascades = cascadesFrom(cards);

    IO.pure({cards: cascades, error: None});
  };
};
