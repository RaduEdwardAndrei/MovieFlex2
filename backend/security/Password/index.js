const bcryptjs = require('bcryptjs');

// folosesc hash atunci cand stochez parola in baza de date, la register
// salt va aparea la inceputul parolei criptate salt.hashedpassword
const hash = async (plainTextPassword) => {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(plainTextPassword, salt);
    return hash;

};

// folosesc compare atunci cand primesc cerere de autentificare
const compare = async (plainTextPassword, hashedPassword) => {
    const isOk = await bcryptjs.compare(plainTextPassword, hashedPassword);
    return isOk;
};

module.exports = {
    hash,
    compare
}