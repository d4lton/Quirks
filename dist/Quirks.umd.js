(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Quirks = global.Quirks || {})));
}(this, (function (exports) { 'use strict';

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







var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
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

















var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
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

/**
 * Quirk
 *
 * Copyright ©2017 Dana Basken <dbasken@gmail.com>
 *
 */
var Quirk = function () {
  function Quirk() {
    classCallCheck(this, Quirk);
  }

  createClass(Quirk, [{
    key: 'start',
    value: function start() {
      this.onStart();
      this._animate();
    }
  }, {
    key: 'update',
    value: function update(timestamp) {
      this.onUpdate(timestamp);
      this._animate();
    }
  }, {
    key: 'add',
    value: function add() {
      this._asyncCall('onAdd');
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.animated = false;
      this._asyncCall('onRemove');
    }
  }, {
    key: 'onStart',
    value: function onStart() {}
  }, {
    key: 'onUpdate',
    value: function onUpdate(timestamp) {}
  }, {
    key: 'onAdd',
    value: function onAdd() {}
  }, {
    key: 'onRemove',
    value: function onRemove() {}
  }, {
    key: '_animate',
    value: function _animate() {
      if (this.animated) {
        window.requestAnimationFrame(this.update.bind(this));
      }
    }
  }, {
    key: '_asyncCall',
    value: function _asyncCall(method) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (typeof this[method] === 'function') {
        setTimeout(function () {
          this[method].apply(this, args);
        }.bind(this), 0);
      }
    }
  }, {
    key: 'element',
    set: function set(value) {
      this._element = value;
    }
  }, {
    key: 'animated',
    set: function set(value) {
      this._animated = value;
    },
    get: function get() {
      return this._animated;
    }
  }]);
  return Quirk;
}();

/**
 * QuirksManager
 *
 * Copyright ©2017 Dana Basken <dbasken@gmail.com>
 *
 */
var QuirksManager = function () {
  function QuirksManager() {
    classCallCheck(this, QuirksManager);

    this._observe();
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
    key: 'start',
    value: function start() {
      var elements = document.querySelectorAll('.quirk-enabled');
      elements.forEach(function (element) {
        element.quirks.forEach(function (quirk) {
          quirk.start();
        });
      });
    }
  }, {
    key: '_add',
    value: function _add(element, quirk) {
      if (quirk instanceof Quirk) {
        if (!element.quirks) {
          element.quirks = [];
        }
        element.quirks.push(quirk);
        quirk.element = element;
        element.classList.add('quirk-enabled');
      } else {
        throw new Error('must be instance of Quirk');
      }
    }
  }, {
    key: '_observe',
    value: function _observe() {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === 'childList') {
            if (mutation.removedNodes) {
              mutation.removedNodes.forEach(function (node) {
                if (node.quirks) {
                  node.quirks.forEach(function (quirk) {
                    quirk.remove();
                  }.bind(this));
                }
              }.bind(this));
            }
            if (mutation.addedNodes) {
              mutation.addedNodes.forEach(function (node) {
                if (node.quirks) {
                  node.quirks.forEach(function (quirk) {
                    quirk.add();
                  }.bind(this));
                }
              }.bind(this));
            }
          }
        }.bind(this));
      }.bind(this));
      var config = { attributes: false, childList: true, characterData: false, subtree: true };
      observer.observe(document, config);
    }
  }]);
  return QuirksManager;
}();

exports.QuirksManager = QuirksManager;
exports.Quirk = Quirk;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Quirks.umd.js.map
