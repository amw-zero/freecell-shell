'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Relude_IO = require("relude/src/Relude_IO.bs.js");
var Relude_List = require("relude/src/Relude_List.bs.js");
var Relude_Option = require("relude/src/Relude_Option.bs.js");
var FreecellShell$ReasonReactExamples = require("./FreecellShell.bs.js");

function fetchNetworkBridge(param) {
  return Relude_IO.pure(5);
}

var shell = {
  environment: FreecellShell$ReasonReactExamples.emptyEnvironment
};

function FreecellView(Props) {
  var match = React.useState((function () {
          return FreecellShell$ReasonReactExamples.emptyEnvironment;
        }));
  var setState = match[1];
  var handleCommandResult = function (r) {
    if (r.tag) {
      var env = r[0];
      return Curry._1(setState, (function (param) {
                    return env;
                  }));
    } else {
      var env$1 = r[0];
      return Curry._1(setState, (function (param) {
                    return env$1;
                  }));
    }
  };
  return React.createElement(React.Fragment, undefined, Relude_Option.fold("none", (function (c) {
                    return String(c.rank);
                  }), Curry._2(Relude_Option.flatMap, Relude_List.head, Relude_List.head(match[0].cards))), React.createElement("button", {
                  onClick: (function (param) {
                      var io = FreecellShell$ReasonReactExamples.Command.createGame(undefined, /* () */0);
                      return Relude_IO.unsafeRunAsync(handleCommandResult, io);
                    })
                }, "Create game"));
}

var Command = /* alias */0;

var IO = /* alias */0;

var L = /* alias */0;

var O = /* alias */0;

var make = FreecellView;

exports.Command = Command;
exports.IO = IO;
exports.L = L;
exports.O = O;
exports.fetchNetworkBridge = fetchNetworkBridge;
exports.shell = shell;
exports.make = make;
/* react Not a pure module */
