const { GraphQLScalarType } = require('graphql');

const parseISO8601 = (value) => {
	// input format
	return value.toLocaleString();
};

const serializeISO8601 = (value) => {
	// output format
	return value.getTime();
};

const parseLiteralISO8601 = (ast) => {
	return ast.value.toLocaleString();
};

const GraphQLDateTime = new GraphQLScalarType({
	name: 'GraphQLDateTime',
	description: 'This is custom date time',
	parseLiteral: parseLiteralISO8601,
	parseValue: parseISO8601,
	serialize: serializeISO8601
});

module.exports = {
	GraphQLDateTime
};
