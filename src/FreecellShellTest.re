open TestLib;
open FreecellShell;

module M = Belt.Map;
module L = Relude.List;
module O = Belt.Option;
module RA = Relude.Array;

module SuitComparable =
  Belt.Id.MakeComparable({
    type t = suit;
    let cmp = (e1, e2) => Pervasives.compare(e1, e2);
  });

let testCreateGame = () => {
  let cardListSuitReducer = (cardsBySuit, card) =>
    M.update(cardsBySuit, card.suit, oCards =>
      O.map(oCards, cards => [card, ...cards])
    );

  let suitMap = () => {
    let map = M.make(~id=(module SuitComparable));
    L.foldLeft((m, s) => M.set(m, s, []), map, allSuits);
  };

  let groupCardList = cards =>
    L.foldLeft(cardListSuitReducer, suitMap(), cards);

  let mergeCardsBySuit = (_, c1, c2) =>
    switch (c1, c2) {
    | (Some(cards1), Some(cards2)) => Some(List.concat([cards1, cards2]))
    | _ => None
    };

  let groupCardsBySuit = cards =>
    Belt.List.reduce(cards, suitMap(), (cardsBySuit, cardList) =>
      M.merge(groupCardList(cardList), cardsBySuit, mergeCardsBySuit)
    );

  let shell = ref({ environment: emptyEnvironment });
  let execute = makeExecutor;

  Command.createGame() |>
  IO.unsafeRunAsync(r =>
    switch (r) {
    | Ok(env) => shell := { environment: env }; ()
    | Error(_) => ()
    }
  );

  let cardsBySuit = groupCardsBySuit(shell^.environment.cards);
  let cardsPerSuit =
    M.valuesToArray(cardsBySuit) |> L.fromArray;
  let allCards = cardsPerSuit |> L.flatten;

  [
    Int.assertEqual(
      ~expected=52,
      ~actual=List.length(allCards),
      "52 cards are dealt",
    ),
    Bool.assertEqual(
      ~expected=true,
      ~actual=
        Belt.List.every(cardsPerSuit, cards => L.length(cards) == 13),
      "Each suit has 13 cards",
    ),
  ];
};

// let testCreateGameStatement = () => {
//   let passthroughNetworkBridge = () => 

//   let evaluate = evaluator(fetchNetworkBridge);
// };

runSuite([testCreateGame])