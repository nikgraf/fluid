// Generated by BUCKLESCRIPT VERSION 4.0.6, PLEASE EDIT WITH CARE

import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Belt_List from "bs-platform/lib/es6/belt_List.js";
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

function createElement(typ, domProps) {
  var node = document.createElement(typ);
  setDomProps(node, domProps);
  return node;
}

function updateDomProps(node, _, newProps) {
  return setDomProps(node, newProps);
}

function makeComponent(identity, render) {
  return /* record */[
          /* init */(function () {
              return /* WithState */[/* record */[
                        /* identity */identity,
                        /* render */render,
                        /* hooks */undefined,
                        /* invalidated */false,
                        /* reconciler */undefined,
                        /* onChange */(function () {
                            return /* () */0;
                          })
                      ]];
            }),
          /* clone */(function (param) {
              var contents = param[0];
              if (contents[/* identity */0] === identity) {
                if (contents[/* render */1] === render) {
                  return /* Same */925282182;
                } else {
                  return /* `Compatible */[
                          785637236,
                          /* WithState */[/* record */[
                              /* identity */contents[/* identity */0],
                              /* render */render,
                              /* hooks */contents[/* hooks */2],
                              /* invalidated */contents[/* invalidated */3],
                              /* reconciler */contents[/* reconciler */4],
                              /* onChange */contents[/* onChange */5]
                            ]]
                        ];
                }
              } else {
                return /* Different */-890978471;
              }
            })
        ];
}

var Maker = /* module */[/* makeComponent */makeComponent];

function render(param) {
  var component = param[0];
  var effects = /* record */[/* contents : [] */0];
  var context_000 = /* hooks : record */[
    /* invalidate */(function () {
        component[/* invalidated */3] = true;
        return Curry._1(component[/* onChange */5], /* () */0);
      }),
    /* setReconciler */(function (data, reconcile) {
        var match = component[/* reconciler */4];
        component[/* reconciler */4] = /* tuple */[
          match !== undefined ? Js_primitive.some(match[1]) : undefined,
          data,
          reconcile
        ];
        return /* () */0;
      }),
    /* triggerEffect */(function (cleanup, fn, setCleanup) {
        effects[/* contents */0] = /* :: */[
          /* record */[
            /* cleanup */cleanup,
            /* fn */fn,
            /* setCleanup */setCleanup
          ],
          effects[/* contents */0]
        ];
        return /* () */0;
      }),
    /* current */component[/* hooks */2]
  ];
  var context_001 = function (v) {
    component[/* hooks */2] = v[/* current */3];
    return /* () */0;
  };
  var context = /* record */[
    context_000,
    context_001
  ];
  component[/* invalidated */3] = false;
  var tree = Curry._1(component[/* render */1], context);
  return /* tuple */[
          tree,
          effects[0]
        ];
}

function getDomNode(_tree) {
  while(true) {
    var tree = _tree;
    switch (tree.tag | 0) {
      case 0 : 
          return tree[1];
      case 1 : 
          return tree[2];
      case 2 : 
          _tree = tree[0][/* mountedTree */1];
          continue ;
      
    }
  };
}

function instantiateTree(el) {
  switch (el.tag | 0) {
    case 0 : 
        return /* IString */Block.__(0, [el[0]]);
    case 1 : 
        return /* IBuiltin */Block.__(1, [
                  el[0],
                  el[1],
                  Belt_List.map(el[2], instantiateTree)
                ]);
    case 2 : 
        var custom = Curry._1(el[0][/* init */0], /* () */0);
        var match = render(custom);
        return /* ICustom */Block.__(2, [
                  custom,
                  instantiateTree(match[0]),
                  match[1]
                ]);
    
  }
}

function runEffect(param) {
  var cleanup = param[/* cleanup */0];
  if (cleanup !== undefined) {
    Curry._1(cleanup, /* () */0);
  }
  return Curry._1(param[/* setCleanup */2], Curry._1(param[/* fn */1], /* () */0));
}

function inflateTree(el) {
  switch (el.tag | 0) {
    case 0 : 
        var contents = el[0];
        return /* MString */Block.__(0, [
                  contents,
                  document.createTextNode(contents)
                ]);
    case 1 : 
        var domProps = el[1];
        var string = el[0];
        var node = createElement(string, domProps);
        var children = Belt_List.map(el[2], inflateTree);
        Belt_List.forEach(children, (function (child) {
                node.appendChild(getDomNode(child));
                return /* () */0;
              }));
        return /* MBuiltin */Block.__(1, [
                  string,
                  domProps,
                  node,
                  children
                ]);
    case 2 : 
        var custom = el[0];
        var mountedTree = inflateTree(el[1]);
        var container = /* record */[
          /* custom */custom,
          /* mountedTree */mountedTree
        ];
        listenForChanges(custom, container);
        Belt_List.forEach(el[2], runEffect);
        return /* MCustom */Block.__(2, [container]);
    
  }
}

function listenForChanges(component, container) {
  var contents = component[0];
  contents[/* onChange */5] = (function () {
      var match = render(component);
      var newElement = match[0];
      var match$1 = contents[/* reconciler */4];
      var tmp;
      if (match$1 !== undefined) {
        var match$2 = match$1;
        tmp = Curry._4(match$2[2], match$2[0], match$2[1], container[/* mountedTree */1], newElement);
      } else {
        tmp = reconcileTrees(container[/* mountedTree */1], newElement);
      }
      container[/* mountedTree */1] = tmp;
      return Belt_List.forEach(match[1], runEffect);
    });
  return /* () */0;
}

function reconcileTrees(prev, next) {
  var exit = 0;
  switch (prev.tag | 0) {
    case 0 : 
        var node = prev[1];
        switch (next.tag | 0) {
          case 0 : 
              var b = next[0];
              if (prev[0] === b) {
                return prev;
              } else {
                node.textContent = b;
                return /* MString */Block.__(0, [
                          b,
                          node
                        ]);
              }
          case 1 : 
          case 2 : 
              exit = 1;
              break;
          
        }
        break;
    case 1 : 
        var node$1 = prev[2];
        switch (next.tag | 0) {
          case 1 : 
              var b$1 = next[0];
              if (prev[0] === b$1) {
                var bProps = next[1];
                setDomProps(node$1, bProps);
                return /* MBuiltin */Block.__(1, [
                          b$1,
                          bProps,
                          node$1,
                          reconcileChildren(node$1, prev[3], next[2])
                        ]);
              } else {
                exit = 1;
              }
              break;
          case 0 : 
          case 2 : 
              exit = 1;
              break;
          
        }
        break;
    case 2 : 
        var a = prev[0];
        switch (next.tag | 0) {
          case 0 : 
          case 1 : 
              exit = 1;
              break;
          case 2 : 
              var match = Curry._1(next[0][/* clone */1], a[/* custom */0]);
              if (typeof match === "number") {
                if (match >= 925282182) {
                  return /* MCustom */Block.__(2, [a]);
                } else {
                  var tree = inflateTree(instantiateTree(next));
                  getDomNode(prev).replaceWith(getDomNode(tree));
                  return tree;
                }
              } else {
                var custom = match[1];
                var match$1 = render(custom);
                var tree$1 = reconcileTrees(a[/* mountedTree */1], match$1[0]);
                a[/* custom */0] = custom;
                a[/* mountedTree */1] = tree$1;
                Belt_List.forEach(match$1[1], runEffect);
                return /* MCustom */Block.__(2, [a]);
              }
          
        }
        break;
    
  }
  if (exit === 1) {
    var tree$2 = inflateTree(instantiateTree(next));
    getDomNode(prev).replaceWith(getDomNode(tree$2));
    return tree$2;
  }
  
}

function reconcileChildren(parentNode, aChildren, bChildren) {
  if (aChildren) {
    if (bChildren) {
      return /* :: */[
              reconcileTrees(aChildren[0], bChildren[0]),
              reconcileChildren(parentNode, aChildren[1], bChildren[1])
            ];
    } else {
      Belt_List.forEach(aChildren, (function (child) {
              parentNode.removeChild(getDomNode(child));
              return /* () */0;
            }));
      return /* [] */0;
    }
  } else if (bChildren) {
    var more = Belt_List.map(bChildren, (function (child) {
            return inflateTree(instantiateTree(child));
          }));
    Belt_List.forEach(more, (function (child) {
            parentNode.appendChild(getDomNode(child));
            return /* () */0;
          }));
    return more;
  } else {
    return /* [] */0;
  }
}

function mount(el, node) {
  var tree = inflateTree(instantiateTree(el));
  node.appendChild(getDomNode(tree));
  return /* () */0;
}

export {
  setDomProps ,
  createElement ,
  updateDomProps ,
  Maker ,
  render ,
  getDomNode ,
  instantiateTree ,
  runEffect ,
  inflateTree ,
  listenForChanges ,
  reconcileTrees ,
  reconcileChildren ,
  mount ,
  
}
/* No side effect */
