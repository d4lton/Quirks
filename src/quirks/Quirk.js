class Quirk {

  constructor({animated = false} = {}) {
    this._animated = animated;
  };

  setElement(element) {
    this._element = element;
  };

  start() {
    this.onStart();
    if (this._animated) {
      window.requestAnimationFrame(this.update.bind(this));
    }
  };

  update(timestamp) {
    this._timestamp = timestamp;
    this.onUpdate();
    window.requestAnimationFrame(this.update.bind(this));
  };

  onStart() {
  };

  onUpdate() {
  };

};

export default Quirk;
