'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Decco = require("decco/src/Decco.js");
var Hashtbl = require("bs-platform/lib/js/hashtbl.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");

function suit_encode(v) {
  switch (v) {
    case /* Clubs */0 :
        return ["Clubs"];
    case /* Diamonds */1 :
        return ["Diamonds"];
    case /* Hearts */2 :
        return ["Hearts"];
    case /* Spades */3 :
        return ["Spades"];
    
  }
}

function suit_decode(v) {
  var match = Js_json.classify(v);
  if (typeof match === "number" || match.tag !== /* JSONArray */3) {
    return Decco.error(undefined, "Not a variant", v);
  } else {
    var jsonArr = match[0];
    if (jsonArr.length !== 0) {
      var tagged = jsonArr.map(Js_json.classify);
      var match$1 = Belt_Array.getExn(tagged, 0);
      if (typeof match$1 !== "number" && !match$1.tag) {
        switch (match$1[0]) {
          case "Clubs" :
              if (tagged.length !== 1) {
                return Decco.error(undefined, "Invalid number of arguments to variant constructor", v);
              } else {
                return /* Ok */Block.__(0, [/* Clubs */0]);
              }
          case "Diamonds" :
              if (tagged.length !== 1) {
                return Decco.error(undefined, "Invalid number of arguments to variant constructor", v);
              } else {
                return /* Ok */Block.__(0, [/* Diamonds */1]);
              }
          case "Hearts" :
              if (tagged.length !== 1) {
                return Decco.error(undefined, "Invalid number of arguments to variant constructor", v);
              } else {
                return /* Ok */Block.__(0, [/* Hearts */2]);
              }
          case "Spades" :
              if (tagged.length !== 1) {
                return Decco.error(undefined, "Invalid number of arguments to variant constructor", v);
              } else {
                return /* Ok */Block.__(0, [/* Spades */3]);
              }
          default:
            
        }
      }
      return Decco.error(undefined, "Invalid variant constructor", Belt_Array.getExn(jsonArr, 0));
    } else {
      return Decco.error(undefined, "Expected variant, found empty array", v);
    }
  }
}

function card_encode(v) {
  return Js_dict.fromArray([
              /* tuple */[
                "suit",
                suit_encode(v.suit)
              ],
              /* tuple */[
                "rank",
                Decco.intToJson(v.rank)
              ]
            ]);
}

function card_decode(v) {
  var match = Js_json.classify(v);
  if (typeof match === "number" || match.tag !== /* JSONObject */2) {
    return Decco.error(undefined, "Not an object", v);
  } else {
    var dict = match[0];
    var match$1 = suit_decode(Belt_Option.getWithDefault(Js_dict.get(dict, "suit"), null));
    if (match$1.tag) {
      var e = match$1[0];
      return /* Error */Block.__(1, [{
                  path: ".suit" + e.path,
                  message: e.message,
                  value: e.value
                }]);
    } else {
      var match$2 = Decco.intFromJson(Belt_Option.getWithDefault(Js_dict.get(dict, "rank"), null));
      if (match$2.tag) {
        var e$1 = match$2[0];
        return /* Error */Block.__(1, [{
                    path: ".rank" + e$1.path,
                    message: e$1.message,
                    value: e$1.value
                  }]);
      } else {
        return /* Ok */Block.__(0, [{
                    suit: match$1[0],
                    rank: match$2[0]
                  }]);
      }
    }
  }
}

var endpointRegistry = Hashtbl.create(undefined, 50);

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

exports.suit_encode = suit_encode;
exports.suit_decode = suit_decode;
exports.card_encode = card_encode;
exports.card_decode = card_decode;
exports.allSuits = allSuits;
exports.allRanks = allRanks;
exports.endpointRegistry = endpointRegistry;
/* endpointRegistry Not a pure module */
