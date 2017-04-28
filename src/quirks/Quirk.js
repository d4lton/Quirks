/**
 * Quirk
 *
 * Copyright ©2017 Dana Basken <dbasken@gmail.com>
 *
 */
class Quirk {

  constructor() {
  }

  set element(value) {
    this._element = value;
  }

  set animated(value) {
    this._animated = value;
  }

  get animated() {
    return this._animated;
  }

  start() {
    this.onStart();
    this._animate();
  }

  update(timestamp) {
    this.onUpdate(timestamp);
    this._animate();
  }

  add() {
    this._asyncCall('onAdd');
  }

  remove() {
    this.animated = false;
    this._asyncCall('onRemove');
  }

  onStart() {
  }

  onUpdate(timestamp) {
  }

  onAdd() {
  }

  onRemove() {
  }

  _animate() {
    if (this.animated) {
      window.requestAnimationFrame(this.update.bind(this));
    }
  }

  _asyncCall(method, ...args) {
    if (typeof this[method] === 'function') {
      setTimeout(function() {
        this[method].apply(this, args);
      }.bind(this), 0);
    }
  }

}

export default Quirk;
