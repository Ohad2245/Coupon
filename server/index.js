require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const userRoutes = require("./routes/user")
const config = require("./config/config")
app.use(express.json({limit:'50mb'}));

app.use(cors())


app.use("/users", userRoutes);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect(config.DB_CONNECTION, options, () => {
        app.listen(config.PORT, () => {
            console.log(`Server has started on ${config.PORT}!`)
        })
    })
