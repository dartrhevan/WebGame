
const bCrypt = require("bcryptjs");

function isValidPassword(expected, actual) {
    const r = bCrypt.compareSync(expected, actual);
    console.log(r);
    return r;
}

module.exports = isValidPassword;
