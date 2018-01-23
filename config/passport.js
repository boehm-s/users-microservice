import passport         from 'passport';
import bcrypt		from 'bcrypt-then';
import userModel        from '../API/models/users';
import {buildUser}      from '../API/helpers/users';

const LocalStrategy = require('passport-local').Strategy;
const conf = {
    secret: "this_is_so_secret",
    strategy: new LocalStrategy(
        {usernameField: 'email'},
        async (email, password, done) => {
            const user = await userModel.getBy({email});
            const userJSON = user.toJSON({hidden: []});
            const isPasswordCorrect = await bcrypt.compare(password, userJSON.password);

            return isPasswordCorrect
                ? done(null, buildUser(userJSON))
                : done(null, false);
        }
    ),
    redis: {
        host: process.env.HOST || 'localhost',
        port: process.env.REDIS_POST || 6397
    }
};

passport.use(conf.strategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;
export {conf, passport};
