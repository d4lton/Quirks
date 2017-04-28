import Quirk from './quirks/Quirk.js';

class QuirksManager {

  constructor() {
  };

  add(selector, quirk) {
    if (selector instanceof HTMLElement) {
      this._add(selector, quirk);
    } else {
      var elements = document.querySelectorAll(selector);
      elements.forEach(function(element) {
        this._add(element, quirk);
      }.bind(this));
    }
  };

  _add(element, quirk) {
    if (!element.quirks) {
      element.quirks = [];
    }
    element.quirks.push(quirk);
    quirk.setElement(element);
    element.classList.add('quirk-enabled');
  };

  start() {
    var elements = document.querySelectorAll('.quirk-enabled');
    elements.forEach(function(element) {
      element.quirks.forEach(function(quirk) {
        quirk.start();
      });
    });
  };

};

QuirksManager.Quirk = Quirk;

export default QuirksManager;
