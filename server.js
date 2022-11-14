const express = require("express");
//const cors = require("cors");
const db = require("./app/models");
const path = require("path");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const {token} = require("mysql/lib/protocol/Auth");

const app = express();
app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs")

const JWT_Secret = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2ODM5Njg4NywiaWF0IjoxNjY4Mzk2ODg3fQ.2XYpoI7H3Rb6yVoUf_LlRuEEbWgS7MFU7b9tAt9NJd8"


// var corsOptions = {
//     origin: "http://localhost:8081"
// };
//
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.static("app"))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to bezkoder application." });
// });


require("./app/routes/customer.route.js")(app);
require("./app/routes/car.route")(app);

// app.post("/login", (req, res) => {
//     const {username, password} = req.body;
//     if (username === "admin" && password === "admin") {
//         // return res.json({
//         //     token: jwt.sign({user: "admin"}, JWT_Secret),
//         // });
//         const token = jwt.sign({user: "admin"}, JWT_Secret);
//         let Header = new Headers({"Content-Type": "application/json", "Authorization": "Bearer " + token})
//         res.redirect("/api/cars")
//     } else {
//         return res
//             .status(401)
//             .json({
//                 message: "Invalid"
//             })
//     }
// });
function auth(req, res,next) {
    let authheader = req.headers.authorization;
    if (!authheader) {
        var err = new Error('You are not authenticated!2');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }
    var auth = new Buffer.from(authheader.split(' ')[1],
        'base64').toString().split(':');
    req.body.username = auth[0];
    req.body.password = auth[1];
    if (req.body.username === "admin" && req.body.password === "admin") {
        const token = jwt.sign({user: "admin"}, JWT_Secret);
        res.cookie("token",token)
        console.log(req.headers.authorization)
        res.redirect("/api/cars")
    } else {
        console.log(authheader)
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }
}

app.get("/logout", (req, res) => {
    if (req.headers.authorization) {
        res.setHeader("WWW-Authenticate", null);
        res.redirect("/");
    }
});

app.use(auth)
//using sequelize
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
