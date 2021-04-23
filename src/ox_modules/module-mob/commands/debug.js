/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @summary Start debug
 * @function debug
 * @example <caption>[javascript] Usage example</caption>
 * mob.init();//Starts a mobile session
 * mob.open("www.yourwebsite.com");// Opens a website.
 * mob.debug();//Start debug
 */

module.exports = async function() {
    await this.replStart();
};