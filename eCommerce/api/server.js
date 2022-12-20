const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handle uncouth Error 
process.on("uncoughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Sutting down the server due to Uncought Rejection`);
    process.exit(1);
});

//Config 
dotenv.config({path:"config/config.env"})

//Connecting to database 
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})


//Unhandled Promises Rejection 
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Sutting down the server due to unhandled promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});