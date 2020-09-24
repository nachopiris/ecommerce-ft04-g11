const jwt = require("jsonwebtoken");
const LocalStorage = require("node-localstorage").LocalStorage;
//1 día = 86400000
localStorage = new LocalStorage("./blacklistJWT");

const secret = process.env.SECRET;

function getBlacklist() {
    let blacklist = localStorage.getItem("blacklist");
    blacklist = JSON.parse(blacklist);
    return blacklist;
}
async function clearBlacklist() {
    let blacklist = getBlacklist();
    if(blacklist.length){
        let day = 86400000;
        blacklist = blacklist.filter((item) => Date.now() - item.createdAt <= day);
        await localStorage.setItem("blacklist", JSON.stringify(blacklist));
    }
    return blacklist;
}

function inArray(array, token) {
    if (array.find((item) => item.token === token)) return true;
    return false;
}

async function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token)
        return res
            .status(422)
            .send({ auth: false, message: "No token provided" });
    await jwt.verify(token, secret, async (err, decoded) => {
        const blacklist = await clearBlacklist();
        // console.log(token);
        if(err) {
            console.log(err);
            return res.sendStatus(401);
        }
        if (inArray(blacklist, token)){
            console.log('blacklisted');
            return res.sendStatus(401)
        }
        req.userId = decoded.id;
        req.token = token;
        next();
    });
}

module.exports = verifyToken;
