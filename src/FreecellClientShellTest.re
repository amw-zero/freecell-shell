open TestLib;
open FreecellClientShell;
open FreecellShared;

module L = Relude.List;
module O = Belt.Option;
module RA = Relude.Array;

let testCreateGame = () => {
  let shell = ref({environment: emptyEnvironment});

//  let server = FreecellServer
  Command.createGame()
  |> IO.unsafeRunAsync(r =>
       switch (r) {
       | Ok(env) => shell := {environment: env}
       | Error(_) => ()
       }
     );

  let groupCardsBySuit = cascades => {
    let cardsBySuit = Hashtbl.create(52);
    Belt.List.(
      forEach(cascades, cascade =>
        forEach(cascade, c => Hashtbl.add(cardsBySuit, c.suit, c))
      )
    );

    cardsBySuit;
  };
  let cardsBySuit = groupCardsBySuit(shell^.environment.cards);
  let cardsPerSuit =
    allSuits |> L.map(suit => Hashtbl.find_all(cardsBySuit, suit));
  let allCards = cardsPerSuit |> L.flatten;

  [
    Int.assertEqual(
      ~expected=52,
      ~actual=List.length(allCards),
      "52 cards are dealt",
    ),
    Bool.assertEqual(
      ~expected=true,
      ~actual=Belt.List.every(cardsPerSuit, cards => L.length(cards) == 13),
      "Each suit has 13 cards",
    ),
  ];
};

runSuite([testCreateGame]);
