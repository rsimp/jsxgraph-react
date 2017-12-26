var fs = require('fs');
var packageMetadata = require("../../package.json");

const VERSIONS_FILEPATH = './src/versions.json';


//ensure versions.json is current
var publishedVersions = JSON.parse(fs.readFileSync(VERSIONS_FILEPATH, 'utf8'));
if (publishedVersions.length == 0 || publishedVersions[0] < packageMetadata.version) {
    publishedVersions.splice(0, 0, packageMetadata.version);
    fs.writeFileSync(VERSIONS_FILEPATH, JSON.stringify(publishedVersions, null, 2));
}