/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @summary Enable or disable wifi or data.
 * @function enableNetwork
 * @param {Boolean} wifi - Enable (true) or disable (false) wifi.
 * @param {Boolean} data - Enable (true) or disable (false) data.
 * @for android
 * @example <caption>[javascript] Usage example</caption>
 * mob.init(caps);//Starts a mobile session and opens app from desired capabilities
 * mob.enableNetwork(true,false);//Enable wifi and disable data.
 */
module.exports = async function(wifi, data) {
    this.helpers.assertArgumentBool(wifi, 'wifi');
    this.helpers.assertArgumentBool(data, 'data');
    await this.helpers.assertContext(this.helpers.contextList.android);

    /* According to Appium docs (https://appium.io/docs/en/writing-running-appium/other/network-connection/):
        Real Devices
         - Changing Airplane Mode state only works for Android 6 and older
         - Chaning data connection state works for Android 4.4 and older. Newer OS releases (5.0+) must be rooted in order to make the feature working (e. g. su binary should available)
         - Changing Wi-Fi connection state should work for all Android versions
        Emulators
         - Changing Airplane Mode state only works for Android 6 and older
         - Chaning data connection state should work for all Android versions
         - Changing Wi-Fi connection state should work for all Android versions

         This however doesn't seem to be entirely correct. Needs more reasearch...
    */
    var mode = 0;
    if (wifi) {
        mode |= 2;
    }
    if (data) {
        mode |= 4;
    }

    try {
        await this.driver.setNetworkConnection(mode);
    } catch (e) { // ignore any errors
    }

    let serial;

    if (
        this.driver &&
        this.driver.capabilities
    ) {
        if (this.driver.capabilities.deviceUDID) {
            serial = this.driver.capabilities.deviceUDID;
        } else if (this.driver.capabilities.deviceName) {
            serial = this.driver.capabilities.deviceName;
        }
    }
    // attempt to do it using 'adb shell svc' just in case setNetworkConnection has failed.
    var cp = require('child_process');

    cp.execFileSync('adb', [
        '-s',
        serial,
        'shell',
        'svc',
        'data',
        data ? 'enable' : 'disable'
    ],
    {stdio: 'inherit'});

    cp.execFileSync('adb', [
        '-s',
        serial,
        'shell',
        'svc',
        'wifi',
        wifi ? 'enable' : 'disable'
    ],
    {stdio: 'inherit'});
};
