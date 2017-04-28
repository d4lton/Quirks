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
      // TODO: fix this, Quirk is currently only aware of being owned by 1 element
      var elements = document.querySelectorAll(selector);
      elements.forEach(function(element) {
        this._add(element, quirk);
      }.bind(this));
    }
  }

  start() {
    var elements = document.querySelectorAll('.quirk-enabled');
    elements.forEach(function(element) {
      element.quirks.forEach(function(quirk) {
        quirk.start();
      });
    });
  }

  _add(element, quirk) {
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

  _observe() {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          if (mutation.removedNodes) {
            mutation.removedNodes.forEach(function(node) {
              if (node.quirks) {
                node.quirks.forEach(function(quirk) {
                  quirk.remove(node);
                }.bind(this));
              }
            }.bind(this));
          }
          if (mutation.addedNodes) {
            mutation.addedNodes.forEach(function(node) {
              if (node.quirks) {
                node.quirks.forEach(function(quirk) {
                  quirk.add(node);
                }.bind(this));
              }
            }.bind(this));
          }
        }
      }.bind(this));
    }.bind(this));
    var config = {childList: true, subtree: true};
    observer.observe(document, config);
  }

}

export {QuirksManager, Quirk};
