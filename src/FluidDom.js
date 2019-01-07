// Generated by BUCKLESCRIPT VERSION 4.0.6, PLEASE EDIT WITH CARE

import * as FluidMaker from "./FluidMaker.js";
import * as Js_primitive from "bs-platform/lib/es6/js_primitive.js";

var setDomProps = function (node,props){
      Object.keys(props).forEach(key => {
        if (key === 'checked' || key === 'value') {
          node[key] = props[key]
        } else if (typeof props[key] === 'function') {
          node[key] = props[key]
        } else {
          node.setAttribute(key, props[key])
        }
      })
    };

function createElement(typ, nativeProps) {
  var node = document.createElement(typ);
  setDomProps(node, nativeProps);
  return node;
}

function updateNativeProps(node, _, newProps) {
  return setDomProps(node, newProps);
}

function maybeUpdate(mounted, mountPoint, newElement) {
  if (mounted[/* tag */0] === newElement[/* tag */0]) {
    setDomProps(mountPoint, newElement[/* props */1]);
    return true;
  } else {
    return false;
  }
}

function inflate(param) {
  return createElement(param[/* tag */0], param[/* props */1]);
}

var include = FluidMaker.F([
      maybeUpdate,
      inflate,
      (function (prim) {
          return document.createTextNode(prim);
        }),
      (function (prim, prim$1) {
          prim.textContent = prim$1;
          return /* () */0;
        }),
      (function (prim) {
          return prim.parentNode;
        }),
      (function (prim, prim$1) {
          prim.appendChild(prim$1);
          return /* () */0;
        }),
      (function (prim, prim$1, prim$2) {
          prim.insertBefore(prim$1, prim$2);
          return /* () */0;
        }),
      (function (prim, prim$1) {
          prim.removeChild(prim$1);
          return /* () */0;
        }),
      (function (prim, prim$1) {
          prim.replaceWith(prim$1);
          return /* () */0;
        })
    ]);

var Hooks = include[10];

function div(id, _type, width, height, onclick, style, _) {
  var tmp = { };
  if (id !== undefined) {
    tmp.id = Js_primitive.valFromOption(id);
  }
  if (_type !== undefined) {
    tmp.type = Js_primitive.valFromOption(_type);
  }
  if (width !== undefined) {
    tmp.width = Js_primitive.valFromOption(width);
  }
  if (height !== undefined) {
    tmp.height = Js_primitive.valFromOption(height);
  }
  if (onclick !== undefined) {
    tmp.onclick = Js_primitive.valFromOption(onclick);
  }
  if (style !== undefined) {
    tmp.style = Js_primitive.valFromOption(style);
  }
  return /* record */[
          /* tag */"div",
          /* props */tmp
        ];
}

function button(id, _type, width, height, onclick, style, _) {
  var tmp = { };
  if (id !== undefined) {
    tmp.id = Js_primitive.valFromOption(id);
  }
  if (_type !== undefined) {
    tmp.type = Js_primitive.valFromOption(_type);
  }
  if (width !== undefined) {
    tmp.width = Js_primitive.valFromOption(width);
  }
  if (height !== undefined) {
    tmp.height = Js_primitive.valFromOption(height);
  }
  if (onclick !== undefined) {
    tmp.onclick = Js_primitive.valFromOption(onclick);
  }
  if (style !== undefined) {
    tmp.style = Js_primitive.valFromOption(style);
  }
  return /* record */[
          /* tag */"button",
          /* props */tmp
        ];
}

function input(id, _type, width, height, onchange, oninput, style, _) {
  var tmp = { };
  if (id !== undefined) {
    tmp.id = Js_primitive.valFromOption(id);
  }
  if (_type !== undefined) {
    tmp.type = Js_primitive.valFromOption(_type);
  }
  if (onchange !== undefined) {
    tmp.onchange = Js_primitive.valFromOption(onchange);
  }
  if (oninput !== undefined) {
    tmp.oninput = Js_primitive.valFromOption(oninput);
  }
  if (width !== undefined) {
    tmp.width = Js_primitive.valFromOption(width);
  }
  if (height !== undefined) {
    tmp.height = Js_primitive.valFromOption(height);
  }
  if (style !== undefined) {
    tmp.style = Js_primitive.valFromOption(style);
  }
  return /* record */[
          /* tag */"input",
          /* props */tmp
        ];
}

var Native = /* module */[
  /* div */div,
  /* button */button,
  /* input */input
];

function NativeInterface_002(prim) {
  return document.createTextNode(prim);
}

function NativeInterface_003(prim, prim$1) {
  prim.textContent = prim$1;
  return /* () */0;
}

function NativeInterface_004(prim) {
  return prim.parentNode;
}

function NativeInterface_005(prim, prim$1) {
  prim.appendChild(prim$1);
  return /* () */0;
}

function NativeInterface_006(prim, prim$1, prim$2) {
  prim.insertBefore(prim$1, prim$2);
  return /* () */0;
}

function NativeInterface_007(prim, prim$1) {
  prim.removeChild(prim$1);
  return /* () */0;
}

function NativeInterface_009(prim, prim$1) {
  prim.replaceWith(prim$1);
  return /* () */0;
}

var NativeInterface = [
  setDomProps,
  createElement,
  NativeInterface_002,
  NativeInterface_003,
  NativeInterface_004,
  NativeInterface_005,
  NativeInterface_006,
  NativeInterface_007,
  updateNativeProps,
  NativeInterface_009,
  maybeUpdate,
  inflate
];

var Fluid_000 = [
  setDomProps,
  createElement,
  (function (prim) {
      return document.createTextNode(prim);
    }),
  (function (prim, prim$1) {
      prim.textContent = prim$1;
      return /* () */0;
    }),
  (function (prim) {
      return prim.parentNode;
    }),
  (function (prim, prim$1) {
      prim.appendChild(prim$1);
      return /* () */0;
    }),
  (function (prim, prim$1, prim$2) {
      prim.insertBefore(prim$1, prim$2);
      return /* () */0;
    }),
  (function (prim, prim$1) {
      prim.removeChild(prim$1);
      return /* () */0;
    }),
  updateNativeProps,
  (function (prim, prim$1) {
      prim.replaceWith(prim$1);
      return /* () */0;
    }),
  maybeUpdate,
  inflate
];

var Fluid_001 = include[2];

var Fluid_002 = include[5];

var Fluid_003 = include[3];

var Fluid_004 = include[9];

var Fluid_005 = include[0];

var Fluid_006 = [
  Hooks[0],
  Hooks[1],
  Hooks[2],
  Hooks[3],
  Hooks[5],
  Hooks[6],
  Hooks[7]
];

var Fluid = [
  Fluid_000,
  Fluid_001,
  Fluid_002,
  Fluid_003,
  Fluid_004,
  Fluid_005,
  Fluid_006,
  Native
];

export {
  NativeInterface ,
  Fluid ,
  
}
/* include Not a pure module */