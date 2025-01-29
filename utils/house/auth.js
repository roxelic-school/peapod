function genAuthCode() {
    const letters = Array.from({ length: 16 }, () => 
        String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    ).join('');

    const numbers = Array.from({ length: 16 }, () => 
        Math.floor(Math.random() * 10)
    ).join('');

    const alphanumeric = Array.from({ length: 8 }, () => 
        Math.random() < 0.5
            ? String.fromCharCode(Math.floor(Math.random() * 26) + 97)
            : Math.floor(Math.random() * 10)
    ).join('');

    return `${letters}.${numbers}.${alphanumeric}`;
}

module.exports = { genAuthCode };