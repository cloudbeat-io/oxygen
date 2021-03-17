/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @name serial
 * @description Provides methods for working with serial ports.
 */
import OxError from '../errors/OxygenError';
var errHelper = require('../errors/helper');

module.exports = function() {
    var SerialPort = require('serialport');
    var deasync = require('deasync');
    var utils = require('./utils');

    var serialPort;
    var stringBuffer;

    module.isInitialized = function() {
        return serialPort !== undefined;
    };

    /**
     * @summary Returns list of available ports.
     * @description See https://github.com/EmergingTechnologyAdvisors/node-serialport#module_serialport--SerialPort.list
     *              for details about the structure of returned values.
     * @function list
     * @return {Object[]} Array of port descriptions.
     */
    module.list = function() {
        var ret;

        SerialPort.list()
            .then((ports) => { ret = ports; })
            .catch((err) => { ret = err; });

        deasync.loopWhile(() => !ret);

        if (ret.type == 'Error') {
            throw ret;
        }

        return ret;
    };

    /**
     * @summary Opens a serial port.
     * @description Data from the opened port will be automatically read line by line into a circular buffer.
     *              Once the buffer reaches it's maximum capacity specified by `bufferSize` argument, eldest entries are 
     *              evicted to make room for new data.
     * @function open
     * @param {String} port - Path to serial port. E.g. '/dev/tty-usbserial1', 'COM5', etc.
     * @param {Object} opts - Port properties.
     * @param {Number=} bufferSize - Size of the input data buffer. Default is 65536 bytes.
     * @return {SerialPort} SerialPort object.
     * @example <caption>[json] Serial port properties with default values</caption>
     * {
     *   baudRate: 9600,
     *   dataBits: 8,        // Must be one of: 8, 7, 6, or 5.
     *   stopBits: 1,        // Must be one of: 1 or 2.
     *   parity: 'none'      // Must be one of: 'none', 'even', 'mark', 'odd', 'space'.
     *   rtscts: false,
     *   xon: false,
     *   xoff: false,
     *   xany: false
     * }
     */
    module.open = function(port, opts, bufferSize = 65536) {
        utils.assertArgumentNonEmptyString(port, 'port');
        utils.assertArgumentNumberNonNegative(bufferSize, 'bufferSize');

        if (port) {
            serialPort = new SerialPort(port, opts);

            var opened = false;
            serialPort.on('open', () => {
                opened = true;
            });

            var error;
            serialPort.on('error', (err) => {
                error = err;
            });

            var parser = serialPort.pipe(new SerialPort.parsers.Readline());
            stringBuffer = new CircularStringBuffer(bufferSize);
            parser.on('data', (data) => {
                stringBuffer.push(data.toString());
            });

            deasync.loopWhile(() => !error && !opened);

            if (error) {
                throw new OxError(errHelper.errorCode.SERIAL_PORT_ERROR, error.message);
            }
        }

        return serialPort;
    };

    /**
     * @summary Waits for text to appear in the input data buffer.
     * @description Text pattern can be any of the supported 
     *  string matching patterns(on the top of page).
     * @function waitForText
     * @param {String} pattern - Text pattern.
     * @param {Number=} timeout - Timeout in milliseconds. Default is 60 seconds.
     */
    module.waitForText = function(pattern, timeout = 60000) {
        utils.assertArgumentNonEmptyString(pattern, 'pattern');
        utils.assertArgumentNumberNonNegative(timeout, 'timeout');

        if (stringBuffer) {
            var now = (new Date).getTime();
            deasync.loopWhile(() => {
                var i;
                for (i = stringBuffer.length; i >= 0; i--) {
                    if (utils.matchPattern(stringBuffer[i], pattern)) {
                        return false;
                    }
                }

                if ((new Date).getTime() - now >= timeout) {
                    throw new OxError(errHelper.errorCode.TIMEOUT);
                }

                deasync.sleep(500);
                return true;
            });
        }
    };

    /**
     * @summary Write data to the port.
     * @function write
     * @param {(String|Array)} data - Data to send. Either a string or an array of bytes.
     * @example <caption>[javascript] Usage example</caption>
     * serial.write('Hello\r\n');
     */
    module.write = function(data) {
        utils.assertArgument(data, 'data');

        if (serialPort) {
            var done;
            serialPort.write(data);
            serialPort.drain(() => { done = true;});
            deasync.loopWhile(() => !done);
        }
    };

    /**
     * @summary Return data buffer.
     * @function getBuffer
     * @return {CircularStringBuffer} Data buffer.
     */
    module.getBuffer = function() {
        return stringBuffer;
    };

    module.dispose = function() {
        if (serialPort) {
            serialPort.close();
        }
    };

    function CircularStringBuffer(maxSize) {
        this.maxSize = maxSize;
        this.size = 0;
    }

    CircularStringBuffer.prototype = Object.create(Array.prototype);

    CircularStringBuffer.prototype.push = function(string) {
        while (this.size + string.length > this.maxSize) {
            this.size -= string.length;
            this.shift();
        }
        Array.prototype.push.call(this, string);
        this.size += string.length;
    };

    return module;
};
