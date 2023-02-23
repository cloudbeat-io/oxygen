/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @summary _**deprecated**_ Use isSelected instead. Determines if checkbox or radio element is checked.
 * @function isChecked
 * @param {String|Element} locator - Element locator.
 * @param {Number=} timeout - Timeout in milliseconds. Default is 60 seconds.
 * @return {Boolean} - true if element is checked. false otherwise.
 * @for android
 * @example <caption>[javascript] Usage example</caption>
 * web.init(caps);
 * var checked = web.isChecked("id=checkBox");
 */
export async function isChecked(locator, timeout) {
    this.helpers.assertArgumentTimeout(timeout, 'timeout');

    var el = await this.helpers.getElement(locator, false, timeout);
    return await el.getAttribute('checked') == 'true';
}
