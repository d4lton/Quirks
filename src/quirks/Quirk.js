/**
 * Quirk
 *
 * Copyright ©2017 Dana Basken <dbasken@gmail.com>
 *
 */
class Quirk {

  constructor() {
    this._private('_animated', false);
    this._private('_element', null);
    this._private('_observer', null);
  }

  get animated() {
    return this._animated;
  }

  set animated(value) {
    if (this._animated !== value) {
      this._animated = value;
      this._animate();
    }
  }

  get element() {
    return this._element;
  }

  set element(value) {
    this._element = value;
    this._observe();
  }

  start() {
    this.onStart();
    this._animate();
  }

  update(timestamp) {
    this.onUpdate(timestamp);
    this._animate();
  }

  add(element) {
    this.element = element;
    this._asyncCall('onAdd', element);
  }

  remove(element) {
    this._animated = false;
    this._asyncCall('onRemove', element);
  }

  change(element, mutation) {
    this._asyncCall('onChange', element, mutation);
  }

  onStart() {
  }

  onUpdate(timestamp) {
  }

  onAdd(element) {
  }

  onRemove(element) {
  }

  onChange(element, mutation) {
  }

  _animate() {
    if (this._animated) {
      window.requestAnimationFrame(this.update.bind(this));
    }
  }

  _observe() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    if (this._element) {
      this._observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {

            var quirks = [];
            if (mutation.type === 'characterData') {
              quirks = quirks.concat(this._findMutatedQuirks(mutation.target));
              quirks = quirks.concat(this._findMutatedQuirks(mutation.target.parentElement));
            }
            if (mutation.type === 'attributes') {
              quirks = quirks.concat(this._findMutatedQuirks(mutation.target));
            }
            quirks.forEach(function(quirk) {
              quirk.change(this._element, mutation);
            }.bind(this));
/*
            mutation.removedNodes.forEach(function(node) {
              if (node.quirks) {
                node.quirks.forEach(function(quirk) {
                  quirk.remove(node);
                }.bind(this));
              }
            }.bind(this));
*/

        }.bind(this));
      }.bind(this));
      var config = {attributes: true, characterData: true, subtree: true};
      this._observer.observe(this._element, config);
    }
  }

  _findMutatedQuirks(element) {
    var results = [];
    if (element.quirks) {
      results = element.quirks;
    }
    return results;
  }

  _asyncCall(method, ...args) {
    if (typeof this[method] === 'function') {
      setTimeout(function() {
        this[method].apply(this, args);
      }.bind(this), 0);
    } else {
      throw new Error('method does not exist: ' + method);
    }
  }

  _private(name, value) {
    Object.defineProperty(this, name, {configurable: false, enumerable: false, value: value, writable: true});
  }

}

export default Quirk;
