/**
 * QuirksManager
 *
 * Copyright ©2017 Dana Basken <dbasken@gmail.com>
 *
 */
import Quirk from './quirks/Quirk.js';

class QuirksManager {

  constructor() {
    this._observe();
  }

  add(selector, quirk) {
    if (selector instanceof HTMLElement) {
      this._add(selector, quirk);
    } else {
      var elements = document.querySelectorAll(selector);
      elements.forEach(function(element) {
        this._add(element, quirk);
      }.bind(this));
    }
  }

  _add(element, quirk) {
    if (quirk instanceof Quirk) {
      if (!element.quirks) {
        element.quirks = [];
      }
      element.quirks.push(quirk);
      quirk.setElement(element);
      element.classList.add('quirk-enabled');
    } else {
      throw new Error('must be instance of Quirk');
    }
  }

  _observe() {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          if (mutation.removedNodes) {
            mutation.removedNodes.forEach(function(node) {
              if (node.quirks) {
                node.quirks.forEach(function(quirk) {
                  quirk.remove();
                }.bind(this));
              }
            }.bind(this));
          }
          if (mutation.addedNodes) {
            mutation.addedNodes.forEach(function(node) {
              if (node.quirks) {
                node.quirks.forEach(function(quirk) {
                  quirk.add();
                }.bind(this));
              }
            }.bind(this));
          }
        }
      }.bind(this));
    }.bind(this));
    var config = {attributes: false, childList: true, characterData: false, subtree: true};
    observer.observe(document, config);
  }

  start() {
    var elements = document.querySelectorAll('.quirk-enabled');
    elements.forEach(function(element) {
      element.quirks.forEach(function(quirk) {
        quirk.start();
      });
    });
  }

}

export {QuirksManager, Quirk};
