const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();

var corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

dotenv.config();
const { HOST, PORT } = require('./config');
const {
	routes,
	adminRoutes,
	examinerRoutes,
	studentRoutes,
} = require('../routes');
const passport = require('passport');
require('../db').connection;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('../auth/passportAuth')(passport);
app.use('/api', routes());
app.use('/api/admin', adminRoutes());
app.use('/api/examiner', examinerRoutes());
app.use('/api/student', studentRoutes());

app.listen(PORT, HOST, (err) => {
	if (err) console.log(err);
	else console.log(`Running on ${HOST}:${PORT}`);
});
