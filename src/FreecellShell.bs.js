'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Relude_IO = require("relude/src/Relude_IO.bs.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Relude_List = require("relude/src/Relude_List.bs.js");
var Relude_Option = require("relude/src/Relude_Option.bs.js");

var allSuits = /* :: */[
  /* Clubs */0,
  /* :: */[
    /* Diamonds */1,
    /* :: */[
      /* Hearts */2,
      /* :: */[
        /* Spades */3,
        /* [] */0
      ]
    ]
  ]
];

var allRanks = /* :: */[
  1,
  /* :: */[
    2,
    /* :: */[
      3,
      /* :: */[
        4,
        /* :: */[
          5,
          /* :: */[
            6,
            /* :: */[
              7,
              /* :: */[
                8,
                /* :: */[
                  9,
                  /* :: */[
                    10,
                    /* :: */[
                      11,
                      /* :: */[
                        12,
                        /* :: */[
                          13,
                          /* [] */0
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ]
];

function makeExecutor(command) {
  console.log("Executing nothing");
  return /* () */0;
}

function createGame(shuffler, param) {
  var generateCards = function (param) {
    var allPairs = function (e, l2) {
      return Relude_List.map((function (le) {
                      return /* tuple */[
                              e,
                              le
                            ];
                    }))(l2);
    };
    var generateCombinations = function (s1, s2) {
      return Relude_List.foldLeft((function (a, e) {
                      return Pervasives.$at(a, allPairs(e, s2));
                    }), /* [] */0)(s1);
    };
    var allCards = Relude_List.map((function (c) {
              return {
                      suit: c[0],
                      rank: c[1]
                    };
            }))(generateCombinations(allSuits, allRanks));
    return Relude_Option.fold(allCards, (function (s) {
                  return Curry._1(s, allCards);
                }), shuffler);
  };
  var cascadesFrom = function (cards) {
    var nextCascade = function (cards, drop, take) {
      return Relude_List.take(take, Relude_List.drop(drop, cards));
    };
    var appendCascade = function (cards, cascadeBuilder, length) {
      return Pervasives.$at(/* :: */[
                  nextCascade(cards, cascadeBuilder.taken, length),
                  /* [] */0
                ], cascadeBuilder.cascades);
    };
    var cardsToCascade = function (cascadeBuilder, length) {
      return {
              cascades: appendCascade(cards, cascadeBuilder, length),
              taken: cascadeBuilder.taken + length | 0
            };
    };
    return Relude_List.reverse(Relude_List.foldLeft(cardsToCascade, {
                      cascades: /* [] */0,
                      taken: 0
                    })(/* :: */[
                    7,
                    /* :: */[
                      7,
                      /* :: */[
                        7,
                        /* :: */[
                          7,
                          /* :: */[
                            6,
                            /* :: */[
                              6,
                              /* :: */[
                                6,
                                /* :: */[
                                  6,
                                  /* [] */0
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]).cascades);
  };
  var cards = generateCards(/* () */0);
  var cascades = cascadesFrom(cards);
  return Relude_IO.pure({
              cards: cascades,
              error: undefined
            });
}

var Command = {
  createGame: createGame
};

var IO = /* alias */0;

var O = /* alias */0;

var L = /* alias */0;

var emptyEnvironment = {
  cards: /* :: */[
    /* [] */0,
    /* [] */0
  ],
  error: undefined
};

exports.IO = IO;
exports.O = O;
exports.L = L;
exports.allSuits = allSuits;
exports.allRanks = allRanks;
exports.emptyEnvironment = emptyEnvironment;
exports.makeExecutor = makeExecutor;
exports.Command = Command;
/* Relude_IO Not a pure module */
