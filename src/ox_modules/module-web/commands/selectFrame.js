/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @summary Selects a frame or an iframe within the current window.
 * @description Available frame locators:  
 *              - `'parent'` - Select parent frame.  
 *              - `'top'` - Select top window.  
 *              - `NUMBER` - Select frame by its 0-based index.  
 *              - `LOCATOR` - Locator identifying the frame (relative to the top window).
 *              Multiple locators can be passed in order to switch between nested frames.
 * @function selectFrame
 * @param {...String|Number} frameLocator - A locator identifying the frame or iframe. Or a series 
 *         of locators.
 * @example <caption>[javascript] Usage example</caption>
 * web.init();//Opens browser session.
 * web.open("www.yourwebsite.com");
 * web.selectFrame("//iframe[@id='frame1']", "//iframe[@id='nested_frame']");
 * web.click("id=SaveButton");//Clicks on element that exists in the second iframe
 */
export async function selectFrame(frameLocator) {
    if (frameLocator === 'parent') {                // parent
        await this.driver.switchToParentFrame();
    } else if (frameLocator === 'top') {            // top
        await this.driver.switchToFrame(null);
    } else if (!isNaN(frameLocator)) {              // frame index
        await this.driver.switchToFrame(frameLocator);
    } else {                                        // frame locator(s)
        await this.driver.switchToFrame(null);
        for (var i = 0; i < arguments.length; i++) {
            var locator = arguments[i];
            var el = await this.helpers.getElement(locator);
            await this.driver.switchToFrame(el);
        }
    }
}
