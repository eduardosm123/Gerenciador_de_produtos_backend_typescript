const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_CONNECT = process.env.MONGO_CONNECT

async function main() {

    try {
        await mongoose.connect(`${MONGO_CONNECT}`);
        console.log("Conectado ao banco");
    } catch (err) {
        console.log(err);
    }
}

module.exports = main