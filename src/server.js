const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const {
    metricServiceRouter
} = require('./routes');


// Essential Middleware
app.use(helmet());
app.use(cors());

app.use(bodyParser.json({
    limit: '5mb'
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

// bodyparse error trap route
app.use((error, _, res, next) => {
    if (error) {
        res.status(400).json({ error });
    } else {
        next();
    }
});

// Service Route
app.use('/metric', metricServiceRouter);


// fallback route
app.use((_, res) => {
    res.status(400).json({ extra: res.customError, message: 'Resource not found!!!' });
});

module.exports = app;