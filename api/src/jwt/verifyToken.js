const jwt = require("jsonwebtoken");
const LocalStorage = require("node-localstorage").LocalStorage;
//1 día = 86400000
localStorage = new LocalStorage("./blacklistJWT");

const secret = process.env.SECRET;

function createIfNotExists() {
    let blacklist = localStorage.getItem("blacklist");
    if (!blacklist) {
        blacklist = [];
        localStorage.setItem("blacklist", JSON.stringify(blacklist));
    }
    blacklist = JSON.parse(blacklist);
    return blacklist;
}
function clearBlacklist() {
    let blacklist = createIfNotExists();
    let day = 86400000;
    blacklist = blacklist.filter((item) => Date.now() - item.createdAt <= day);
    localStorage.setItem("blacklist", JSON.stringify(blacklist));
    return blacklist;
}

function inArray(array, token) {
    if (array.find((item) => item.token === token)) return true;
    return false;
}

function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token)
        return res
            .status(422)
            .send({ auth: false, message: "No token provided" });
    jwt.verify(token, secret, async (err, decoded) => {
        const blacklist = clearBlacklist();
        if (err || inArray(blacklist, decoded.id)) return res.sendStatus(401);
        req.userId = decoded.id;
        req.token = token;
    });
    next();
}

module.exports = verifyToken;
