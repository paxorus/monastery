/**
 * Prakhar Sahay 09/24/2016
 *
 * Provides example config information (mLab) for deriving URL.
 */

var util = require('util');

exports.username = "tectonic";
exports.password = "2birds2stones";
exports.dbName = "seismic-test";

exports.url = function () {
	var format = "mongodb://%s:%s@ds017258.mlab.com:17258/%s";
	return util.format(format, exports.username, exports.password, exports.dbName);
}