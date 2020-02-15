const Bcryptjs = require('bcryptjs');
const JwtToken = require('jsonwebtoken');
const jwtObject = require('../utilities/constants').jwtObject;
const generatedSalt = Bcryptjs.genSaltSync(10);

function logSomething(req, res, next) {
	console.log('called');
	next();
	console.log('after');
	console.log(res.status);
}
async function encryptPassword(password) {
	let hashed = await Bcryptjs.hash(password, generatedSalt).then((hash) => {
		return hash;
	});
	return hashed;
}
async function comparePasswordHash(enteredPassword, hashedPassword) {
	let result = await Bcryptjs.compare(enteredPassword, hashedPassword)
		.then((sucObj) => {
			return sucObj;
		})
		.catch((errObj) => {
			return errObj;
		});
	return result;
}
async function generateJWTToken(userObj) {
	let token = await JwtToken.sign(userObj, jwtObject.secret, {
		algorithm: jwtObject.algo
	});
	return token;
}
// async function verifyJWTToken(req, res, next) {
//     let token = req.headers['riders_token'];
//     if(token)
//     {
// 	JwtToken.verify(
// 		token,
// 		jwtObject.secret,
// 		{
// 			algorithms: [ jwtObject.algo ]
// 		},
// 		function(err, result) {
// 			err
// 				? errorObj(res, 404, 'Unauthorized user1', err)
// 				: UserSession.findOne({
// 						where: {
// 							token: token,
// 							userId: result.userId
//                         }
// 					})
// 					.then((sucObj) => {
// 						if(sucObj){
// 							req["resolvedUserId"] = result.userId
// 							next();
// 						}
// 						else{
// 							errorObj(res, 404, 'No user by id '+result.userId);
// 						}
// 					})
// 					.catch((errObj) => {
// 						console.log(errObj);
// 						errorObj(res, 404, 'Unauthorized user', errObj);
// 					});
// 		}
//     );}
//     else { errorObj(res, 400, 'Invalid headers'); }
// }
function checkAuthentication(req, res, next) {
	console.log(req.headers['something']);
	next();
}
module.exports = {
	logSomething,
	checkAuthentication,
	encryptPassword,
	comparePasswordHash,
	generateJWTToken
	// verifyJWTToken
};
