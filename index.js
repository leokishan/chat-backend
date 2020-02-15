const Express = require('express');
const app = Express();
const httpGraphql = require('express-graphql');
const graphqlSchema = require('./graphql/index');
const socketOps = require('./config/socket.config');
const mongoConfig = require('./config/mongo.config');

// Allow CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}
	next();
});

app.listen(8085);

socketOps();

// log errors
app.use(
	'/graphql',
	httpGraphql({
		schema: graphqlSchema,
		graphiql: true,
		customFormatErrorFn(err) {
			return {
				message: err.message
			};
		}
	})
);
