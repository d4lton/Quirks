class Quirk {

  constructor({animated = false} = {}) {
    this._animated = animated;
  };

  setElement(element) {
    this._element = element;
  };

  start() {
    this.onStart();
    this._animate();
  };

  _animate() {
    if (this._animated) {
      window.requestAnimationFrame(this.update.bind(this));
    }
  };

  _asyncCall(method, ...args) {
    if (typeof this[method] === 'function') {
      setTimeout(function() {
        this[method].apply(this, args);
      }.bind(this), 0);
    }
  };

  update(timestamp) {
    this.onUpdate(timestamp);
    this._animate();
  };

  add() {
    this._asyncCall('onAdd');
  };

  remove() {
    this._animated = false;
    this._asyncCall('onRemove');
  };

  onStart() {
  };

  onUpdate(timestamp) {
  };

  onAdd() {
  };

  onRemove() {
  };

};

export default Quirk;
