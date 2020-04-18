module IO = Relude.IO;

type suit =
  | Clubs
  | Diamonds
  | Hearts
  | Spades;

type card = {
  suit,
  rank: int,
};

let allSuits = [Clubs, Diamonds, Hearts, Spades];
let allRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

type cardList = list(card);
type cardMatrix = list(cardList);

type systemError =
  | NetworkFailure
  | RequestException
  | Etc;

type environment = {cards: cardMatrix, error: option(systemError)};

let emptyEnvironment = {cards: [[]], error: None};

type cascadeBuilder = {
  cascades: list(list(card)),
  taken: int,
};

type shell = {
  environment,
};

let makeExecutor = (command) => Js.log("Executing nothing");

module Command = {
  let createGame = (~shuffler=?, _) => {
    let generateCards = () => {
      let allPairs = (e, l2) => Belt.List.map(l2, le => (e, le));
      let generateCombinations = (s1, s2) =>
        Belt.List.reduce(s1, [], (a, e) =>
          List.concat([a, allPairs(e, s2)])
        );

      let allCards = generateCombinations(allSuits, allRanks)
      ->Belt.List.map(c => {suit: fst(c), rank: snd(c)});

      switch (shuffler) {
        | Some(s) => s(allCards)
        | None => allCards
      };
    };

    let cascadesFrom = cards => {
      let cascadeLengths = [7, 7, 7, 7, 6, 6, 6, 6];

      let nextCascade = (cards, drop, take) =>
        Belt.List.drop(cards, drop)
        ->Belt.Option.getExn
        ->Belt.List.take(take)
        ->Belt.Option.getExn;
      let cardsToCascade = (cascadeBuilder, length) => {
        cascades:
          Belt.List.add(
            cascadeBuilder.cascades,
            nextCascade(cards, cascadeBuilder.taken, length),
          ),
        taken: cascadeBuilder.taken + length,
      };

      Belt.List.reduce(
        cascadeLengths,
        {cascades: [], taken: 0},
        cardsToCascade,
      ).
        cascades
      |> Belt.List.reverse;
    };

    let cards = generateCards();
    let cascades = cascadesFrom(cards);

    IO.pure({cards: cascades, error: None});
  };
};

// Lang experiment
// type domainError =
//   | IllegalCascadeMove
//   | IllegalFreecellMove
//   | IllegalFoundationMove;


// type error =
//   | Domain(domainError)
//   | System(systemError);

// type language = 
//   | StateUpdate(IO.t(environment, error), language) // evaluate will run the IO, apply the new env if successful, or propogate the error into the env if unsuccessful
//   | NetworkRequest(language) // make a network request
//   | Leaf;

// let program = 
//     NetworkRequest(
//       StateUpdate(
//         IO.pure(emptyEnvironment), 
//         Leaf
//       )
//     );

// let errorProgram = 
//   NetworkRequest(
//     StateUpdate(
//       IO.throw(System(NetworkFailure)),
//       Leaf
//     )
//   );

// let rec evaluator = (networkBridge, env, statement) => {
//   switch (statement) {
//   | NetworkRequest(next) => evaluator(networkBridge, env, next)
//   | StateUpdate(io, next) => evaluator(networkBridge, env, next)
//   | Leaf => ()
//   };
// };
