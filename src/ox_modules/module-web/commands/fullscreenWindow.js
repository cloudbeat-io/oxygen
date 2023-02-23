/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @summary Fullscreen Window.
 * @function fullscreenWindow
 * @example <caption>[javascript] Usage example</caption>
 * web.init();//Opens browser session.
 * web.fullscreenWindow();
 */
export async function fullscreenWindow() {
    await this.driver.fullscreenWindow();
}
