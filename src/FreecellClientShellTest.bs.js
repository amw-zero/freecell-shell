'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Hashtbl = require("bs-platform/lib/js/hashtbl.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Relude_IO = require("relude/src/Relude_IO.bs.js");
var Relude_List = require("relude/src/Relude_List.bs.js");
var TestLib$ReasonReactExamples = require("./TestLib.bs.js");
var FreecellShared$ReasonReactExamples = require("./FreecellShared.bs.js");
var FreecellClientShell$ReasonReactExamples = require("./FreecellClientShell.bs.js");

function testCreateGame(param) {
  var shell = {
    contents: {
      environment: FreecellClientShell$ReasonReactExamples.emptyEnvironment
    }
  };
  Relude_IO.unsafeRunAsync((function (r) {
          if (r.tag) {
            return /* () */0;
          } else {
            shell.contents = {
              environment: r[0]
            };
            return /* () */0;
          }
        }), FreecellClientShell$ReasonReactExamples.Command.createGame(undefined, /* () */0));
  var groupCardsBySuit = function (cascades) {
    var cardsBySuit = Hashtbl.create(undefined, 52);
    Belt_List.forEach(cascades, (function (cascade) {
            return Belt_List.forEach(cascade, (function (c) {
                          return Hashtbl.add(cardsBySuit, c.suit, c);
                        }));
          }));
    return cardsBySuit;
  };
  var cardsBySuit = groupCardsBySuit(shell.contents.environment.cards);
  var cardsPerSuit = Relude_List.map((function (suit) {
            return Hashtbl.find_all(cardsBySuit, suit);
          }))(FreecellShared$ReasonReactExamples.allSuits);
  var allCards = Curry._1(Relude_List.flatten, cardsPerSuit);
  return /* :: */[
          TestLib$ReasonReactExamples.Int.assertEqual(52, List.length(allCards), "52 cards are dealt"),
          /* :: */[
            TestLib$ReasonReactExamples.Bool.assertEqual(true, Belt_List.every(cardsPerSuit, (function (cards) {
                        return Curry._1(Relude_List.length, cards) === 13;
                      })), "Each suit has 13 cards"),
            /* [] */0
          ]
        ];
}

TestLib$ReasonReactExamples.runSuite(/* :: */[
      testCreateGame,
      /* [] */0
    ]);

var L = /* alias */0;

var O = /* alias */0;

var RA = /* alias */0;

exports.L = L;
exports.O = O;
exports.RA = RA;
exports.testCreateGame = testCreateGame;
/*  Not a pure module */
