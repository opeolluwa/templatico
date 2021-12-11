const database = require("../../config/config.database"); // load in db util
class SSRender {
    //takes database name and  an Array representing database fields to be fetched
    constructor(database_name, ...fields) {
        this.database_name = database_name; //get database name
        this.fields = fields // get  fields
    }

    //api to fetch and return data from database using provided database name
    render() {
        //prepare query to get provided fields or all if no field is provided
        const query = `SELECT ${this.fields.join(",") || "*"} FROM ${this.database_name}`
        //connect to database,  fetch data
        database.promise().query(query)
            .then(([rows, fields]) => rows)
            //TODO:: return fetched data
            .then(fetched_data => { console.log(fetched_data); return fetched_data; })
            .catch(error => console.log(error))
            .then(() => database.end());
    }

    promised() {
        return new Promise((resolve, reject) => {
            //prepare query to get provided fields or all if no field is provided
            const query = `SELECT ${this.fields.join(",") || "*"} FROM ${this.database_name}`;

            database.query(query, (err, rows, fields) => {
                if (err) { reject(err) }
                resolve(rows)
            })

            database.end()
        })
    }
}
module.exports = SSRender;

// const user = new SSRender("users", "user_id", "password", "user_email")
// const render = user.render()
// console.log(render)


const user = new SSRender("users", "user_id", "password", "user_email")
const render = user.promised()
render.then(data => console.log(data)).catch(err => err)
// console.log(render)