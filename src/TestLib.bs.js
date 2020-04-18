'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

function feedbackFor(e, a, p) {
  return "Expected: " + (Curry._1(p, e) + ("\nActual: " + (Curry._1(p, a) + "\n")));
}

function assertEqual(cmpOpt, printer, expected, actual, description) {
  var cmp = cmpOpt !== undefined ? cmpOpt : Caml_obj.caml_equal;
  var result = Curry._2(cmp, expected, actual);
  var feedback = result || printer === undefined ? undefined : feedbackFor(expected, actual, printer);
  return {
          result: result,
          description: description,
          feedback: feedback
        };
}

function assertEqual$1(expected, actual, description) {
  return assertEqual(undefined, (function (prim) {
                return String(prim);
              }), expected, actual, description);
}

var Int = {
  assertEqual: assertEqual$1
};

function assertEqual$2(expected, actual, description) {
  return assertEqual(undefined, Pervasives.string_of_bool, expected, actual, description);
}

var Bool = {
  assertEqual: assertEqual$2
};

function printAssertion(a) {
  console.log(a.description);
  var match = a.feedback;
  if (match !== undefined) {
    console.log(match);
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function _runSuite(suite) {
  var assertions = Belt_List.flatten(Belt_List.map(suite, (function (t) {
              return Curry._1(t, /* () */0);
            })));
  return {
          failingTests: Belt_List.keep(assertions, (function (a) {
                  return a.result !== true;
                })),
          assertionCount: Belt_List.length(assertions)
        };
}

function runSuite(suite) {
  var match = _runSuite(suite);
  var failingTests = match.failingTests;
  var match$1 = List.length(failingTests);
  if (match$1 !== 0) {
    console.log("Failing tests:\n");
    Belt_List.forEach(failingTests, printAssertion);
  } else {
    console.log("All tests passed.");
  }
  console.log("Ran " + (String(match.assertionCount) + " assertions."));
  return /* () */0;
}

exports.feedbackFor = feedbackFor;
exports.assertEqual = assertEqual;
exports.Int = Int;
exports.Bool = Bool;
exports.printAssertion = printAssertion;
exports._runSuite = _runSuite;
exports.runSuite = runSuite;
/* No side effect */
