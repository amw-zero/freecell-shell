'use strict';

var FreecellServerShell$ReasonReactExamples = require("./FreecellServerShell.bs.js");

function createGame(shuffler, param) {
  return FreecellServerShell$ReasonReactExamples.Command.createGame(shuffler);
}

var Command = {
  createGame: createGame
};

var IO = /* alias */0;

var emptyEnvironment = {
  cards: /* :: */[
    /* [] */0,
    /* [] */0
  ],
  error: undefined
};

exports.IO = IO;
exports.emptyEnvironment = emptyEnvironment;
exports.Command = Command;
/* FreecellServerShell-ReasonReactExamples Not a pure module */
