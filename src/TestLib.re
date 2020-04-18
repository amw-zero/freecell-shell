type assertion = {
  result: bool,
  description: string,
  feedback: option(string),
};

let feedbackFor = (e, a, p) =>
  Some("Expected: " ++ p(e) ++ "\nActual: " ++ p(a) ++ "\n");

let assertEqual = (~cmp=(==), ~printer=?, ~expected, ~actual, description) => {
  let result = cmp(expected, actual);
  let feedback =
    switch (result, printer) {
    | (false, Some(p)) => feedbackFor(expected, actual, p)
    | _ => None
    };

  {result, description, feedback};
};

module Int = {
  let assertEqual = (~expected, ~actual, description) =>
    assertEqual(~expected, ~actual, ~printer=string_of_int, description);
};

module Bool = {
  let assertEqual = (~expected, ~actual, description) =>
    assertEqual(~expected, ~actual, ~printer=string_of_bool, description);
};

type suiteDiagnostic = {
  failingTests: list(assertion),
  assertionCount: int,
};

let printAssertion = a => {
  Js.log(a.description);
  switch (a.feedback) {
  | Some(f) => Js.log(f)
  | None => ()
  };
};

let _runSuite = suite => {
  let assertions = Belt.List.map(suite, t => t())->Belt.List.flatten;

  {
    assertionCount: Belt.List.length(assertions),
    failingTests: assertions->Belt.List.keep(a => a.result != true),
  };
};

let runSuite = suite => {
  let {failingTests, assertionCount} = _runSuite(suite);
  switch (List.length(failingTests)) {
  | 0 => Js.log("All tests passed.")
  | _ =>
    Js.log("Failing tests:\n");
    Belt.List.forEach(failingTests, printAssertion);
  };

  Js.log("Ran " ++ string_of_int(assertionCount) ++ " assertions.");
};