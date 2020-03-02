
// Service Failed Response to Client
const failedResponse = (req, res) => {
    return res.status(400).json({
        success: false,
        message: res.message,
        request: {
            type: req.method,
            url: `${process.env.SERVICE_URL}${req.url}`
        }
    });
};


// Catch Error Response to Client
const catchResponse = (error, req, res, next) => {
    res.customError = {
        error, meta: {
            success: false,
            message: res.message,
            request: {
                type: req.method,
                url: `${process.env.SERVICE_URL}${req.url}`
            },
            timestamp: new Date()
        }
    };
    return next();
};


// Service Success Response to Client
const successResponse = (req, res) => {
    return res.status(200).json({value: res.result});
};


module.exports = {
    successResponse,
    failedResponse,
    catchResponse
};