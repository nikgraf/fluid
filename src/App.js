// Generated by BUCKLESCRIPT VERSION 4.0.6, PLEASE EDIT WITH CARE

import * as Basic from "./Basic.js";
import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Js_primitive from "bs-platform/lib/es6/js_primitive.js";
import * as Caml_builtin_exceptions from "bs-platform/lib/es6/caml_builtin_exceptions.js";

function props(value, toString) {
  return /* tuple */[
          value,
          toString
        ];
}

function maker_000() {
  return "Folks";
}

function maker_002(param, state, setState) {
  return /* Builtin */Block.__(1, [
            "div",
            { },
            /* :: */[
              /* Builtin */Block.__(1, [
                  "div",
                  {
                    onclick: (function () {
                        return Curry._1(setState, state + "1");
                      })
                  },
                  /* :: */[
                    /* String */Block.__(0, ["Awesome " + Curry._1(param[1], param[0])]),
                    /* [] */0
                  ]
                ]),
              /* [] */0
            ]
          ]);
}

var maker = /* record */[
  maker_000,
  /* newStateForProps */undefined,
  maker_002
];

function make(props) {
  return Basic.Maker[/* makeComponent */0](maker, props);
}

var Awesome = /* module */[
  /* props */props,
  /* maker */maker,
  /* make */make
];

var partial_arg = Basic.Maker[/* statefulComponent */2];

function arg(props, state, setState) {
  return /* Builtin */Block.__(1, [
            "div",
            { },
            /* :: */[
              /* Builtin */Block.__(1, [
                  "div",
                  {
                    onclick: (function () {
                        return Curry._1(setState, state + "1");
                      })
                  },
                  /* :: */[
                    /* String */Block.__(0, [state]),
                    /* [] */0
                  ]
                ]),
              props
            ]
          ]);
}

function awesome(param) {
  var param$1 = param;
  var param$2 = arg;
  return partial_arg((function () {
                return "Folks";
              }), param$1, param$2);
}

var partial_arg$1 = Basic.Maker[/* statefulComponent */2];

function func(param, param$1) {
  return partial_arg$1((function (param) {
                return /* tuple */[
                        "Recursion!",
                        param[1]
                      ];
              }), param, param$1);
}

function arg$1(param, param$1, setState) {
  var depth = param$1[1];
  var text = param$1[0];
  var loop = param[0];
  var recur = function (num) {
    var match = num > 0;
    if (match) {
      return /* :: */[
              /* Custom */Block.__(2, [Curry._1(loop, depth - 1 | 0)]),
              recur(num - 1 | 0)
            ];
    } else {
      return /* [] */0;
    }
  };
  return /* Builtin */Block.__(1, [
            "div",
            { },
            /* :: */[
              /* String */Block.__(0, ["[depth " + (String(depth) + (":" + (String(param[1]) + "]")))]),
              /* :: */[
                /* Builtin */Block.__(1, [
                    "div",
                    {
                      onclick: (function () {
                          return Curry._1(setState, /* tuple */[
                                      text + "1",
                                      depth - 1 | 0
                                    ]);
                        }),
                      style: "cursor: pointer"
                    },
                    /* :: */[
                      /* String */Block.__(0, [text]),
                      /* [] */0
                    ]
                  ]),
                /* :: */[
                  /* Builtin */Block.__(1, [
                      "div",
                      {
                        style: "padding-left: 20px; border-left: 2px solid #aaa"
                      },
                      recur(depth)
                    ]),
                  /* [] */0
                ]
              ]
            ]
          ]);
}

function partial_arg$2(eta) {
  return Curry._3(func, undefined, arg$1, eta);
}

var partial_arg$3 = Basic.Maker[/* recursiveComponent */3];

function recursive(param) {
  return partial_arg$3(partial_arg$2, param);
}

function props_001(prim) {
  return String(prim);
}

var props$1 = /* tuple */[
  3,
  props_001
];

function props_001$1(x) {
  return x;
}

var props$2 = /* tuple */[
  "Hi",
  props_001$1
];

var first_001 = {
  id: "awesome"
};

var first_002 = /* :: */[
  /* String */Block.__(0, ["Hello"]),
  /* :: */[
    /* Custom */Block.__(2, [Basic.Maker[/* makeComponent */0](maker, props$1)]),
    /* :: */[
      /* Custom */Block.__(2, [Basic.Maker[/* makeComponent */0](maker, props$2)]),
      /* :: */[
        /* Custom */Block.__(2, [Curry._1(awesome(undefined), /* :: */[
                  /* String */Block.__(0, [">>"]),
                  /* :: */[
                    /* Custom */Block.__(2, [Curry._1(awesome(undefined), /* [] */0)]),
                    /* [] */0
                  ]
                ])]),
        /* :: */[
          /* Builtin */Block.__(1, [
              "div",
              {
                id: "Inner"
              },
              /* :: */[
                /* String */Block.__(0, ["world"]),
                /* :: */[
                  /* Custom */Block.__(2, [recursive(3)]),
                  /* [] */0
                ]
              ]
            ]),
          /* [] */0
        ]
      ]
    ]
  ]
];

var first = /* Builtin */Block.__(1, [
    "div",
    first_001,
    first_002
  ]);

var match = document.getElementById("root");

if (match !== undefined) {
  Basic.mount(first, Js_primitive.valFromOption(match));
} else {
  throw [
        Caml_builtin_exceptions.assert_failure,
        /* tuple */[
          "App.re",
          138,
          12
        ]
      ];
}

export {
  Awesome ,
  awesome ,
  recursive ,
  first ,
  
}
/* first Not a pure module */
