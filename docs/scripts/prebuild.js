var fs = require('fs');

const VERSIONS_FILEPATH = './src/versions.json';

//ensure versions.json is current
var versions = JSON.parse(fs.readFileSync(VERSIONS_FILEPATH, 'utf8'));
var version = require("../../package.json").version;

if (versions.length == 0 || versions[0] < version) {
    versions.splice(0, 0, version);
    fs.writeFileSync(VERSIONS_FILEPATH, JSON.stringify(versions, null, 2));
}