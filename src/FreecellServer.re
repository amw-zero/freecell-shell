open Async;
open Serbet.Endpoint;

let hello =
  Serbet.endpoint({
    verb: GET,
    path: "/",
    handler: _req => {
      async @@ OkString("Hello, world");
    },
  });

let app =
  Serbet.application(
    ~port=3110,
    [hello],
  );