open FreecellShared;

module IO = Relude.IO;

let emptyEnvironment = {cards: [[]], error: None};

type shell = {environment};

module Command = {
  let createGame = (~shuffler=?, _) => {
    FreecellServerShell.Command.createGame(~shuffler)
  };
};
