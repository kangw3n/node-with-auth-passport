const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./config');
const User = require('./models/user');

// JSON Web Token Strategy
passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: JWT_SECRET
}, async (payload, done) => {
	try {
		// Find the user specified in token
		const user = await User.findById(payload.sub);
		// If user does not exit, handle it 
		if(!user) {
			return done(null, false);
		}
		// Return the user
		done(null, user);
	} catch (err) {
		done(err, false);
	}
}));

// Local Strategy
passport.use(new LocalStrategy({
	usernameField: 'email'
}, async (email, password, done) => {
	const user = await User.findOne({email});

	if(!user) {
		return done(null, false);
	}

	// check if the password is correct

	//if not handle it

	//return the user
}));