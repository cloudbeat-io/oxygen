/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @summary Navigate backwards in the browser history or simulates back button on Android device.
 * @function back
 */
export async function back() {
    await this.driver.back();
}
