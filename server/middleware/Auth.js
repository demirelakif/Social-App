const jwt = require("jsonwebtoken");

const config = process.env;

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.status(403).send("Login required!");
//     }
//     try {
//         const data = jwt.verify(token, config.SECRET);
//         req.user = data;
//         return next();
//     } catch (err) {
//         return res.status(401).send("Invalid Token");
//     }
// };

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    try {
        const data = jwt.verify(token, config.SECRET);
        req.user = data;
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

};

module.exports = verifyToken;