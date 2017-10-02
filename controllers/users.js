const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');

signToken = user => {
		return JWT.sign({
			iss: 'dobbieAzure',
			sub: user.id,
			iat: new Date().getTime(),
			exp: new Date().setDate(new Date().getDate() + 1)
		}, JWT_SECRET);
}

module.exports = {


	signIn: async (req, res, next)=> {
		console.log('UserController.signIn');



		
	}, 


	signUp: async (req, res, next)=> {
		const { email, password } = req.value.body;
		//Check User
		const foundUser = await User.findOne({email});
		if(foundUser) {
			//return directly
			return res.status(403).json({
				error: 'Email is already in use'
			});
		}

		// Create a new user;
		const newUser = new User({email,password});
		await newUser.save();


		//Response With Token
		const token = signToken(newUser);


		res.status(200).json({token});

	}, 
	secret: async (req, res, next)=> {
		console.log('UserController.secret')
		res.json({
			secret: 'resoucces'
		})
	}, 
}