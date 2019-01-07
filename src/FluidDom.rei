module NativeInterface:
  {
    type nativeProps;
    type nativeNode;
    let nativeProps:
      (~id: string=?, ~_type: string=?, ~onchange: Dom.event => unit=?,
      ~oninput: Dom.event => unit=?, ~width: int=?, ~height: int=?,
      ~onclick: Dom.event => unit=?, ~style: string=?, unit) =>
      nativeProps;

    /*
    let _createElement: string => nativeNode; */

    let setDomProps: (nativeNode, nativeProps) => unit;
    let createElement: (string, nativeProps) => nativeNode;
    let createTextNode: string => nativeNode;
    let setTextContent: (nativeNode, string) => unit;
    let parentNode: nativeNode => nativeNode;
    let appendChild: (nativeNode, nativeNode) => unit;
    let insertBefore:
      (nativeNode, nativeNode, ~reference: nativeNode) => unit;
    let removeChild: (nativeNode, nativeNode) => unit;

    let updateNativeProps: (nativeNode, 'a, nativeProps) => unit;
    let replaceWith: (nativeNode, nativeNode) => unit;

    type element = { tag: string, props: nativeProps, };
    let maybeUpdate:
      (~mounted: element, ~mountPoint: nativeNode,
      ~newElement: element) => bool;
    let inflate: element => nativeNode;
  };

module Fluid: {
    include FluidMaker.Fluid with module NativeInterface = NativeInterface;
    module Native:
      {
        let div:
          (~id: string=?, ~_type: string=?, ~width: int=?, ~height: int=?,
          ~onclick: Dom.event => unit=?, ~style: string=?, unit) =>
          NativeInterface.element;
        let button:
          (~id: string=?, ~_type: string=?, ~width: int=?, ~height: int=?,
          ~onclick: Dom.event => unit=?, ~style: string=?, unit) =>
          NativeInterface.element;
        let input:
          (~id: string=?, ~_type: string=?, ~width: int=?, ~height: int=?,
          ~onchange: Dom.event => unit=?, ~oninput: Dom.event => unit=?,
          ~style: string=?, unit) => NativeInterface.element;
      };
  };