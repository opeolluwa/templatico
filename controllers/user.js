//load in dependencies
const {  User } = require("./../models")

async function register(req, res) {
    //get fields from payload
    const { firstname, lastname, email, phone } = req.body
    //try to create user
    try {
        const user = await User.create({ firstname, lastname, email, phone })
        return res.send({ user })
    } catch (error) {
        res.send({ error })
    }
}


module.exports = { register }