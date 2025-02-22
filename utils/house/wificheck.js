const dns = require('dns');

function checkInternetConnection() {
    dns.lookup('www.google.com', (err) => {
        if (err) {
            return false
        } else {
            return true
        }
    });
}

module.exports = { checkInternetConnection };