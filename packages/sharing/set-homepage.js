const fs = require('fs');
const path = require('path');

const packageJson = require('./package.json');

const env = process.env.REACT_APP_ENV || 'development';

const homepages = {
    development: '/',
    production: '/_sharing',
};

packageJson.homepage = homepages[env];

fs.writeFileSync(
    path.join(__dirname, 'package.json'),
    JSON.stringify(packageJson, null, 2)
);

console.log(`Homepage set to: ${packageJson.homepage}`);