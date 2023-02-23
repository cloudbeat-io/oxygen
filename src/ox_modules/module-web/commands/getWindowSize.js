/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @summary Sets the size of the outer browser window.
 * @function getWindowSize
 * @return {Object} Size object. Example: { height: 1056, width: 1936, x: -8, y: -8 }
 * @example <caption>[javascript] Usage example</caption>
 * web.init();//Opens browser session.
 * web.open("www.yourwebsite.com");// Opens a website.
 * const sizeObject = web.getWindowSize();
 */
export async function getWindowSize() {
    return await this.driver.getWindowSize();
}