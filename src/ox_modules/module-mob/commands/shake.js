/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @summary Perform shake action on the device
 * @description Supported on Android and iOS 9 or earlier versions. 
 * @function shake
 * @for ios
 * @example <caption>[javascript] Usage example</caption>
 * mob.init(caps);//Starts a mobile session and opens app from desired capabilities
 * mob.shake();//Perform shake action on the device.
 */
export async function shake() {
    await this.helpers.assertContext(this.helpers.contextList.ios);
    await this.driver.shake();
}
