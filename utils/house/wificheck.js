const dns = require('dns');

async function checkInternetConnection() {
    try {
        let response = await fetch ('https://www.google.com');

        return true;
    } catch (e) {
        return false;
    }
}

module.exports = { checkInternetConnection };
