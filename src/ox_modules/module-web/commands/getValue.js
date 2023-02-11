/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @summary Returns the (whitespace-trimmed) value of an input field.
 * @function getValue
 * @param {String|Element} locator - An element locator.
 * @param {Number=} timeout - Timeout in milliseconds. Default is 60 seconds.
 * @return {String} The value.
 * @example <caption>[javascript] Usage example</caption>
 * web.init();//Opens browser session.
 * web.open("www.yourwebsite.com");// Opens a website.
 * web.getValue("id=UserName");//Gets the value from an element.
 */
export async function getValue(locator, timeout) {
    this.helpers.assertArgumentTimeout(timeout, 'timeout');

    var el = await this.helpers.getElement(locator, true, timeout);
    let val;

    try {
        val = await el.getValue();
    } catch (e) {
        console.log('web.getValue error', e);
        val = await el.getAttribute('value');
    }

    if (val) {
        return val.trim().replace(/\s+/g, ' ');
    }
    return val;
}
