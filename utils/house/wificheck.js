function checkInternetConnection(callback) {
    dns.lookup('www.google.com', (err) => {
        if (err) {
            callback(false);
        } else {
            callback(true);
        }
    });
}

module.exports = { checkInternetConnection };