'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Relude_IO = require("relude/src/Relude_IO.bs.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");

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
      return Belt_List.map(l2, (function (le) {
                    return /* tuple */[
                            e,
                            le
                          ];
                  }));
    };
    var generateCombinations = function (s1, s2) {
      return Belt_List.reduce(s1, /* [] */0, (function (a, e) {
                    return List.concat(/* :: */[
                                a,
                                /* :: */[
                                  allPairs(e, s2),
                                  /* [] */0
                                ]
                              ]);
                  }));
    };
    var allCards = Belt_List.map(generateCombinations(allSuits, allRanks), (function (c) {
            return {
                    suit: c[0],
                    rank: c[1]
                  };
          }));
    if (shuffler !== undefined) {
      return Curry._1(shuffler, allCards);
    } else {
      return allCards;
    }
  };
  var cascadesFrom = function (cards) {
    var nextCascade = function (cards, drop, take) {
      return Belt_Option.getExn(Belt_List.take(Belt_Option.getExn(Belt_List.drop(cards, drop)), take));
    };
    var cardsToCascade = function (cascadeBuilder, length) {
      return {
              cascades: Belt_List.add(cascadeBuilder.cascades, nextCascade(cards, cascadeBuilder.taken, length)),
              taken: cascadeBuilder.taken + length | 0
            };
    };
    return Belt_List.reverse(Belt_List.reduce(/* :: */[
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
                  ], {
                    cascades: /* [] */0,
                    taken: 0
                  }, cardsToCascade).cascades);
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

var emptyEnvironment = {
  cards: /* :: */[
    /* [] */0,
    /* [] */0
  ],
  error: undefined
};

exports.IO = IO;
exports.allSuits = allSuits;
exports.allRanks = allRanks;
exports.emptyEnvironment = emptyEnvironment;
exports.makeExecutor = makeExecutor;
exports.Command = Command;
/* Relude_IO Not a pure module */
