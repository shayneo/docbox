'use strict';

var fs = require('fs');

/**
 * This file exports the content of your website, as a bunch of concatenated
 * Markdown files. By doing this explicitly, you can control the order
 * of content without any level of abstraction.
 *
 * Using the brfs module, fs.readFileSync calls in this file are translated
 * into strings of those files' content before the file is delivered to a
 * browser: the content is read ahead-of-time and included in bundle.js.
 */
module.exports = '# Introduction\n' + fs.readFileSync('./content/introduction.md', 'utf8') + '\n' + '# Platform\n' + fs.readFileSync('./content/platform.md', 'utf8') + '\n' + '# Platform Services\n' + fs.readFileSync('./content/device.md', 'utf8') + '\n' + fs.readFileSync('./content/vehicle.md', 'utf8') + '\n' + fs.readFileSync('./content/transaction.md', 'utf8') + '\n' + '# Telemetry Service\n' + fs.readFileSync('./content/telemetry.md', 'utf8') + '\n' + '# Event Service\n' + fs.readFileSync('./content/event.md', 'utf8') + '\n' + '# Rule Service\n' + fs.readFileSync('./content/rule.md', 'utf8') + '\n' + '# Diagnostic Service\n' + fs.readFileSync('./content/diagnostic.md', 'utf8') + '\n' + '# Distance Service\n' + fs.readFileSync('./content/distance.md', 'utf8') + '\n' + '# Trip Service\n' + fs.readFileSync('./content/trip.md', 'utf8') + '\n' + '# Behavioral Service\n' + fs.readFileSync('./content/behavioral.md', 'utf8') + '\n' + '# Safety Service\n' + fs.readFileSync('./content/safety.md', 'utf8') + '\n' + '# Virtual Vinli\n' + fs.readFileSync('./content/dummy.md', 'utf8');