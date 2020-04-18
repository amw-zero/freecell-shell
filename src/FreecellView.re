open FreecellShell;
module Command = FreecellShell.Command;
module IO = Relude.IO;
module L = Relude.List;
module O = Relude.Option;

let fetchNetworkBridge = () => IO.pure(5); // Actually make network request

let shell = {environment: emptyEnvironment};

[@react.component]
let make = () => {
  let (state, setState) = React.useState(() => shell.environment);

  let handleCommandResult = r =>
    switch (r) {
    | Ok(env) => setState(_ => env)
    | Error(env) => setState(_ => env)
    };

  let applyToView = io => IO.unsafeRunAsync(handleCommandResult, io);

  <>
    {React.string(
       state.cards
       |> L.head
       |> O.flatMap(L.head)
       |> O.fold("none", c => string_of_int(c.rank)),
     )}
    <button onClick={_ => Command.createGame() |> applyToView}>
      {React.string("Create game")}
    </button>
  </>;
};
