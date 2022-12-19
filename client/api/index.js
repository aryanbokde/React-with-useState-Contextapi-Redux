
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
//include for middleware 
const cors = require('cors');
//Include databse connection to connect database
const connectToMongo = require('./db');

//Get Authetication route and other routes file .
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const catRoute = require('./routes/categories');
const multer = require('multer');
const path = require("path");


//Check database connection 
connectToMongo();

// middleware
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

//Available Routes 
app.get('/', (req, res) => {   
    res.send('Hello RAKESH!');
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename:(req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });

app.post('/api/upload' , upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', catRoute);

app.listen( port, () => {
    console.log("Your Host Started at : http://localhost:" + port);
})


