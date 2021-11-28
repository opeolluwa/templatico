const bcrypt = require('bcrypt');
const salt_round = 15;

//take raw password return hash
const hash_password = (raw_password: String): String =>
    bcrypt.hashSync(raw_password, salt_round);

//take raw password and hased password and compare, return boolean
const compare_hash = (raw_password: String, hashed_passsword: String): Boolean => bcrypt.compareSync(raw_password, hashed_passsword);

//export modules
module.exports = { hash_password, compare_hash }