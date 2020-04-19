'use strict';

var Async = require("serbet/src/Async.bs.js");
var Block = require("bs-platform/lib/js/block.js");
var Serbet = require("serbet/src/Serbet.bs.js");

var hello = Serbet.endpoint(undefined, {
      path: "/",
      verb: /* GET */0,
      handler: (function (_req) {
          return Async.async(/* OkString */Block.__(3, ["Hello, world"]));
        })
    });

var app = Serbet.application(3110, /* :: */[
      hello,
      /* [] */0
    ]);

exports.hello = hello;
exports.app = app;
/* hello Not a pure module */
