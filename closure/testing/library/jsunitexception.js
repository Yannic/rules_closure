/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.provide('goog.testing.JsUnitException');
goog.setTestOnly();

goog.require('goog.testing.stacktrace');


goog.testing.JsUnitException = class extends Error {
  /**
   * @param {string} comment A summary for the exception.
   * @param {?string=} opt_message A description of the exception.
   */
  constructor(comment, opt_message) {
    'use strict';
    super();
    this.isJsUnitException = true;
    this.message =
        goog.testing.JsUnitException.generateMessage(comment, opt_message);
    this.stackTrace = goog.testing.stacktrace.get();
    // These fields are for compatibility with jsUnitTestManager.
    this.comment = comment || null;
    this.jsUnitMessage = opt_message || '';

    // Ensure there is a stack trace.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, goog.testing.JsUnitException);
    } else {
      this.stack = new Error().stack || '';
    }
  }
};

/**
 * @param {string} comment A summary for the exception.
 * @param {?string=} opt_message A description of the exception.
 * @return {string} Concatenated message
 */
goog.testing.JsUnitException.generateMessage = function(comment, opt_message) {
  'use strict';
  return (comment || '') + (comment && opt_message ? '\n' : '') +
      (opt_message || '');
};


/** @override */
goog.testing.JsUnitException.prototype.toString = function() {
  'use strict';
  return this.message || this.jsUnitMessage;
};