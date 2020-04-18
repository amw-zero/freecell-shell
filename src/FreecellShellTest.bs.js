'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Belt_Id = require("bs-platform/lib/js/belt_Id.js");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Relude_IO = require("relude/src/Relude_IO.bs.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Relude_List = require("relude/src/Relude_List.bs.js");
var TestLib$ReasonReactExamples = require("./TestLib.bs.js");
var FreecellShell$ReasonReactExamples = require("./FreecellShell.bs.js");

var cmp = Caml_obj.caml_compare;

var SuitComparable = Belt_Id.MakeComparable({
      cmp: cmp
    });

function testCreateGame(param) {
  var cardListSuitReducer = function (cardsBySuit, card) {
    return Belt_Map.update(cardsBySuit, card.suit, (function (oCards) {
                  return Belt_Option.map(oCards, (function (cards) {
                                return /* :: */[
                                        card,
                                        cards
                                      ];
                              }));
                }));
  };
  var suitMap = function (param) {
    var map = Belt_Map.make(SuitComparable);
    return Relude_List.foldLeft((function (m, s) {
                    return Belt_Map.set(m, s, /* [] */0);
                  }), map)(FreecellShell$ReasonReactExamples.allSuits);
  };
  var groupCardList = function (cards) {
    return Relude_List.foldLeft(cardListSuitReducer, suitMap(/* () */0))(cards);
  };
  var mergeCardsBySuit = function (param, c1, c2) {
    if (c1 !== undefined && c2 !== undefined) {
      return List.concat(/* :: */[
                  c1,
                  /* :: */[
                    c2,
                    /* [] */0
                  ]
                ]);
    }
    
  };
  var groupCardsBySuit = function (cards) {
    return Belt_List.reduce(cards, suitMap(/* () */0), (function (cardsBySuit, cardList) {
                  return Belt_Map.merge(groupCardList(cardList), cardsBySuit, mergeCardsBySuit);
                }));
  };
  var shell = {
    contents: {
      environment: FreecellShell$ReasonReactExamples.emptyEnvironment
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
        }), FreecellShell$ReasonReactExamples.Command.createGame(undefined, /* () */0));
  var cardsBySuit = groupCardsBySuit(shell.contents.environment.cards);
  var cardsPerSuit = Relude_List.fromArray(Belt_Map.valuesToArray(cardsBySuit));
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

var M = /* alias */0;

var L = /* alias */0;

var O = /* alias */0;

var RA = /* alias */0;

exports.M = M;
exports.L = L;
exports.O = O;
exports.RA = RA;
exports.SuitComparable = SuitComparable;
exports.testCreateGame = testCreateGame;
/* SuitComparable Not a pure module */
