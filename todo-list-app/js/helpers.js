/*global NodeList */
(function (window) {
	'use strict';

	/**
   * Get element by CSS selector
   * @param {string} selector CSS element
   * @param {object} scope Object where the element can be found
   */
	window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
  };
  
  /**
   * Get elements by CSS selector
   * @param {string} selector CSS element
   * @param {object} scope Object where the element can be found
   */
	window.qsa = function (selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};

	/**
   * addEventListener wrapper
   * @param {object} target Target of the function
   * @param {string} type Event type
   * @param {function} callback Callback function
   * @param {object} useCapture Used element
   */
	window.$on = function (target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	};

	/**
   * Attach a handler to event for all elements that match the selector,
   * now or in the future, based on a root element
   * @param {object} target Target of the function
   * @param {string} selector HTML element
   * @param {boolean} type Event type
   * @param {function} handler A callback to execute under condition
   */
	window.$delegate = function (target, selector, type, handler) {
		function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = window.qsa(selector, target);
			var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}

		// https://developer.mozilla.org/en-US/docs/Web/Events/blur
		var useCapture = type === 'blur' || type === 'focus';

		window.$on(target, type, dispatchEvent, useCapture);
	};

	/**
   * Find the element's parent with the given tag name:
   * $parent(qs('a'), 'div');
   * @param {object} element Active element
   * @param {string} tagName Tagname de l'élément
   */
	window.$parent = function (element, tagName) {
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		}
		return window.$parent(element.parentNode, tagName);
	};

	// Allow for looping on nodes by chaining:
	// qsa('.foo').forEach(function () {})
	NodeList.prototype.forEach = Array.prototype.forEach;
})(window);
