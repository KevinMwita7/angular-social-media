const cors = require('cors');
const errorhandler = require('errorhandler');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');

module.exports = {
    register: (app) => {
        app.use(logger('dev'));
        app.use(cors({
            origin: 'http://localhost:4200',
            optionsSuccessStatus: 200
        }));
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(errorhandler());
        app.use(compression());
        //support parsing of application/x-www-form-urlencoded post data
        app.use(bodyParser.urlencoded({ extended: true }));
    }
};