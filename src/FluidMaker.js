// Generated by BUCKLESCRIPT VERSION 4.0.6, PLEASE EDIT WITH CARE

import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Belt_List from "bs-platform/lib/es6/belt_List.js";

function F(NativeInterface) {
  var makeComponent = function (identity, render) {
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
  };
  var Maker = /* module */[/* makeComponent */makeComponent];
  var render = function (param) {
    var component = param[0];
    var effects = /* record */[/* contents : [] */0];
    var context_000 = /* hooks : record */[
      /* invalidate */(function () {
          component[/* invalidated */3] = true;
          return Curry._1(component[/* onChange */5], /* () */0);
        }),
      /* setReconciler */(function (oldData, data, reconcile) {
          component[/* reconciler */4] = /* tuple */[
            oldData,
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
  };
  var getNativeNode = function (_tree) {
    while(true) {
      var tree = _tree;
      switch (tree.tag | 0) {
        case 0 : 
        case 1 : 
            return tree[1];
        case 2 : 
            _tree = tree[0][/* mountedTree */1];
            continue ;
        
      }
    };
  };
  var instantiateTree = function (el) {
    switch (el.tag | 0) {
      case 0 : 
          return /* IString */Block.__(0, [el[0]]);
      case 1 : 
          return /* IBuiltin */Block.__(1, [
                    el[0],
                    Belt_List.map(el[1], instantiateTree)
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
  };
  var runEffect = function (param) {
    var cleanup = param[/* cleanup */0];
    if (cleanup !== undefined) {
      Curry._1(cleanup, /* () */0);
    }
    return Curry._1(param[/* setCleanup */2], Curry._1(param[/* fn */1], /* () */0));
  };
  var inflateTree = function (el) {
    switch (el.tag | 0) {
      case 0 : 
          var contents = el[0];
          return /* MString */Block.__(0, [
                    contents,
                    Curry._1(NativeInterface[/* createTextNode */2], contents)
                  ]);
      case 1 : 
          var nativeElement = el[0];
          var node = Curry._1(NativeInterface[/* inflate */1], nativeElement);
          var children = Belt_List.map(el[1], inflateTree);
          Belt_List.forEach(children, (function (child) {
                  return Curry._2(NativeInterface[/* appendChild */5], node, getNativeNode(child));
                }));
          return /* MBuiltin */Block.__(1, [
                    nativeElement,
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
  };
  var listenForChanges = function (component, container) {
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
  };
  var reconcileTrees = function (prev, next) {
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
                  Curry._2(NativeInterface[/* setTextContent */3], node, b);
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
          var node$1 = prev[1];
          switch (next.tag | 0) {
            case 1 : 
                var bElement = next[0];
                if (Curry._3(NativeInterface[/* maybeUpdate */0], prev[0], node$1, bElement)) {
                  return /* MBuiltin */Block.__(1, [
                            bElement,
                            node$1,
                            reconcileChildren(node$1, prev[2], next[1])
                          ]);
                } else {
                  var tree = inflateTree(instantiateTree(next));
                  Curry._2(NativeInterface[/* replaceWith */8], getNativeNode(prev), getNativeNode(tree));
                  return tree;
                }
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
                    var tree$1 = inflateTree(instantiateTree(next));
                    Curry._2(NativeInterface[/* replaceWith */8], getNativeNode(prev), getNativeNode(tree$1));
                    return tree$1;
                  }
                } else {
                  var custom = match[1];
                  var match$1 = render(custom);
                  var tree$2 = reconcileTrees(a[/* mountedTree */1], match$1[0]);
                  a[/* custom */0] = custom;
                  a[/* mountedTree */1] = tree$2;
                  Belt_List.forEach(match$1[1], runEffect);
                  return /* MCustom */Block.__(2, [a]);
                }
            
          }
          break;
      
    }
    if (exit === 1) {
      var tree$3 = inflateTree(instantiateTree(next));
      Curry._2(NativeInterface[/* replaceWith */8], getNativeNode(prev), getNativeNode(tree$3));
      return tree$3;
    }
    
  };
  var reconcileChildren = function (parentNode, aChildren, bChildren) {
    if (aChildren) {
      if (bChildren) {
        return /* :: */[
                reconcileTrees(aChildren[0], bChildren[0]),
                reconcileChildren(parentNode, aChildren[1], bChildren[1])
              ];
      } else {
        Belt_List.forEach(aChildren, (function (child) {
                return Curry._2(NativeInterface[/* removeChild */7], parentNode, getNativeNode(child));
              }));
        return /* [] */0;
      }
    } else if (bChildren) {
      var more = Belt_List.map(bChildren, (function (child) {
              return inflateTree(instantiateTree(child));
            }));
      Belt_List.forEach(more, (function (child) {
              return Curry._2(NativeInterface[/* appendChild */5], parentNode, getNativeNode(child));
            }));
      return more;
    } else {
      return /* [] */0;
    }
  };
  var mount = function (el, node) {
    var tree = inflateTree(instantiateTree(el));
    return Curry._2(NativeInterface[/* appendChild */5], node, getNativeNode(tree));
  };
  return /* module */[
          /* Maker */Maker,
          /* render */render,
          /* getNativeNode */getNativeNode,
          /* instantiateTree */instantiateTree,
          /* runEffect */runEffect,
          /* inflateTree */inflateTree,
          /* listenForChanges */listenForChanges,
          /* reconcileTrees */reconcileTrees,
          /* reconcileChildren */reconcileChildren,
          /* mount */mount
        ];
}

export {
  F ,
  
}
/* No side effect */
