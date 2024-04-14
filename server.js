const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

app.use(express.json());

const MONGO_URL = "mongodb://localhost:27017";
const PORT = 3000

mongoose.connect(MONGO_URL, {
    dbName: "Travel",
}).then(() => {
    console.log("Database connected");
}).catch((error) => console.log(error));

app.use('/api',router);

app.listen(PORT, () => {
    console.log(`Node API is running on port ${PORT}`);
});