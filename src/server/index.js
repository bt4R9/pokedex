const path = require('path');
const express = require('express');
const csrfProtection = require('csurf')({ cookie: false });

const appConfig = require('./configs/app');
const dbConfig = require('./configs/db');
const template = require('./template');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url);
const session = require('./middleware/session')(mongoose.connection);
const passport = require('./middleware/passport');

const app = express();
const http = require('http').Server(app);
const routes = require('./routes/');

app.set('x-powered-by', false);
app.use('/build', express.static(path.join(__dirname, '../../build/')));
app.use('/service-worker.js', express.static(path.join(__dirname, '../../service-worker.js')));

app.use(require('morgan')('dev'));
app.use(require('connect-slashes')(true, { code: 302 }));

app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// index
app.get('/', (req, res) => {
    res.send(template());
});

// api
app.use('/api', routes.pokemons(csrfProtection));

app.use(csrfProtection);
app.use(require('./middleware/setCSRFCookie'));

app.use('/*', require('./middleware/render'));

http.listen(appConfig.port, () => {
    console.log(`listening on *:${appConfig.port}`);
});
