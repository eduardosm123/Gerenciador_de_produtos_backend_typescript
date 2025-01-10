const express = require('express');
const cors = require("cors");
const path = require('path');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json())

const conn = require("./db/conn")
conn();

const routes = require("./routes/router");
app.use('/api', routes);

app.use('/uploads', express.static(path.join(__dirname, '..','uploads')))
app.listen(3000, function() {
    console.log("Servidor Online!");
    console.log("Acesse as imagens em http://localhost:3000/uploads");
})
