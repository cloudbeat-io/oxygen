/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @summary Makes hidden element visible.
 * @description This a workaround command for situations which require manipulation of hidden
 * elements, such as when using `web.type` command for file input fields which tend to be hidden.  
 * Specifically `makeVisible` will apply following styles to the specified element and all the
 * parent elements:  
 * - visibility = 'visible' if set to 'hidden'  
 * - opacity = 1 if set to 0  
 * - display = 'block' if set to 'none'  
 * - width/height = 1px if set to 0.
 * @function makeVisible
 * @param {String|Element} locator - An element locator. If multiple elements match the locator, visibility
 *                           is applied to all.
 * @example <caption>[javascript] Usage example</caption>
 * web.init();//Opens browser session.
 * web.open("www.yourwebsite.com");// Opens a website.
 * web.makeVisible("id=SaveButton");// Makes an invisible/hidden element to become visible.
 */
export async function makeVisible(locator) {
    var el = await this.helpers.getElement(locator);

    /*global window*/
    await this.driver.execute(function (domEl) {
        // make sure current element and all its ancestors have "display" style value different from "none"
        var curElm = domEl;
        while (curElm) {
            var styles = window.getComputedStyle(curElm, null);
            var visibility = styles.visibility;
            var display = styles.display;
            var opacity = styles.opacity;
            var height = styles.height;
            var width = styles.width;
            if (display === 'none') {
                // in order to override any previously set '!important' style
                // it needs to be set via cssText
                curElm.style.cssText += ';display:block !important;';
            }
            if (visibility === 'hidden') {
                curElm.style.cssText += ';visibility:visible !important;';
            }
            if (opacity === '0') {
                curElm.style.cssText += ';opacity:1 !important;';
            }
            if (height === '0' || height === '0px') {
                curElm.style.cssText += ';height:1px !important;';
            }
            if (width === '0' || width === '0px') {
                curElm.style.cssText += ';width:1px !important;';
            }
            curElm = curElm.parentElement;
        }
    }, el);
}
