const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const { MIN_PASSWORD_LENGTH, MESSAGES } = require('../configs/auth');

const SignupError = function(code) {
    this.code = code;
    this.toString = () => this.code;
};

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
(email, password, done) => {
    if (!email) {
        return done(null, null, { message: MESSAGES.NO_EMAIL });
    }

    email = email.toLowerCase();

    process.nextTick(() => {
        User.findOne({
            email: email
        })
            .then((user) => {
                if (user && user.validPassword(password)) {
                    return done(null, user);
                } else {
                    return done(null, null, { message: MESSAGES.WRONG_USERNAME_OR_PASSWORD });
                }
            })
            .catch((err) => done(err, null, { message: MESSAGES.SERVER_ERROR }));
    });
}));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
(req, email, password, done) => {
    const name = req.body.name;

    if (!email) {
        return done(null, null, { message: MESSAGES.NO_EMAIL });
    }

    if (!name) {
        return done(null, null, { message: MESSAGES.NO_NAME });
    }

    if (!password) {
        return done(null, null, { message: MESSAGES.NO_PASSWORD });
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
        return done(null, null, { message: MESSAGES.SHORT_PASSWORD });
    }

    email = email.toLowerCase();

    process.nextTick(() => {
        User
            .count({ name: name })
        // проверяем занятость имени пользователя
            .then(userCount => {
                if (userCount > 0) {
                    throw new SignupError(MESSAGES.NAME_EXIST);
                } else {
                    return User.findOne({ email });
                }
            })
        // проверяем занятость почты
            .then(user => {
                if (user) {
                    throw new SignupError(MESSAGES.EMAIL_EXIST);
                } else {
                    user = new User({ email, name, password });

                    return user.save();
                }
            })
        // новый пользователь успешно добавлен
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                throw new SignupError(MESSAGES.SERVER_ERROR);
            })
        // ловим ошибки
            .catch(err => done(!err.code && err, null, {
                message: err.code || MESSAGES.SERVER_ERROR
            }));
    });
}));

module.exports = passport;
