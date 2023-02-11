/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @summary Opens an URL.
 * @description The `open` command waits for the page to load before proceeding.
 * @function open
 * @param {String} url - The URL to open; may be relative or absolute.
 * @example <caption>[javascript] Usage example</caption>
 * web.init();//Opens browser session.
 * web.open("www.yourwebsite.com");// Opens a website.
 */
export async function open(url) {
    this.helpers.assertArgumentNonEmptyString(url, 'url');
    try {
        await this.driver.url(url);
    } catch (e) {
        if (e && e.message.startsWith('Specified URL')) {
            throw new this.OxError(this.errHelper.errorCode.SCRIPT_ERROR, e.message);
        } else if (e && e.message.startsWith('Reached error page:')) {  // geckodriver - site cannot be reached
            throw new this.OxError(this.errHelper.errorCode.URL_OPEN_ERROR, e.message);
        } else if (e && e.message.startsWith('unknown error: net::')) { // chromedriver 85
            throw new this.OxError(this.errHelper.errorCode.URL_OPEN_ERROR, e.message);
        }
        throw e;
    }
}
