const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;

const app = express();

// MongoDB setup
const mongoUri =
	'mongodb+srv://admin:Password01@cluster0.j9t0v.mongodb.net/gql-mf?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
	console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
	console.log('Error connecting to mongo', err);
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log('Now listening for request on port 4000!');
});

