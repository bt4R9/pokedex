const dbConfig = require('../configs/db');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

module.exports = dbConnection => {
    return session({
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongooseConnection: dbConnection
        }),
        secret: dbConfig.sessionSecret
    });
};
