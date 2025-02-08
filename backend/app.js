const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require("cors")

const dbURI = "mongodb+srv://<username>:<pass>@nodejscluster.ns38w.mongodb.net/inotebook?retryWrites=true&w=majority&appName=NodejsCluster";

mongoose.connect(dbURI)
    .then(() => {console.log("connected to db"); })
    .catch(err => console.log("unable to connect to db"));


app.get('/', (req,res) => {
        res.send("hello world");
})

app.use(cors())
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(5000); 
