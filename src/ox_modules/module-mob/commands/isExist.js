/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @summary Wait for an element to become available.
 * @description The element is not necessary needs to be visible.
 * @function isExist
 * @param {String|Element} locator - Element locator.
 * @param {Number=} timeout - Time in milliseconds to wait for the element. Default is 60 seconds.
 * @return {Boolean} - true if the element exists. false otherwise.
 * @for android, ios, hybrid, web
 * @example <caption>[javascript] Usage example</caption>
 * mob.init(caps);//Starts a mobile session and opens app from desired capabilities
 * mob.isExist("id=Element");//Determines if element exists.
 */
module.exports = async function(locator, timeout) {
    this.helpers.assertArgumentTimeout(timeout, 'timeout');

    try {
        const el = await this.helpers.getElement(locator, false, timeout);
        return !!el;
    } catch (e) {
        return false;
    }
};
