(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.QuirksManager = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Quirk = function () {
  function Quirk() {
    classCallCheck(this, Quirk);
  }

  createClass(Quirk, [{
    key: "setElement",
    value: function setElement(element) {
      this._element = element;
    }
  }, {
    key: "onStart",
    value: function onStart() {}
  }]);
  return Quirk;
}();

var QuirksManager = function () {
  function QuirksManager() {
    classCallCheck(this, QuirksManager);
  }

  createClass(QuirksManager, [{
    key: 'add',
    value: function add(selector, quirk) {
      if (selector instanceof HTMLElement) {
        this._add(selector, quirk);
      } else {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (element) {
          this._add(element, quirk);
        }.bind(this));
      }
    }
  }, {
    key: '_add',
    value: function _add(element, quirk) {
      if (!element.quirks) {
        element.quirks = [];
      }
      element.quirks.push(quirk);
      quirk.setElement(element);
      element.classList.add('quirk-enabled');
    }
  }, {
    key: 'start',
    value: function start() {
      var elements = document.querySelectorAll('.quirk-enabled');
      elements.forEach(function (element) {
        element.quirks.forEach(function (quirk) {
          quirk.onStart();
        });
      });
    }
  }]);
  return QuirksManager;
}();



QuirksManager.Quirk = Quirk;

return QuirksManager;

})));
//# sourceMappingURL=QuirksManager.umd.js.map
