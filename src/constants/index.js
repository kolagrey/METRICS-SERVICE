const messageConstants = {
    CATCH_MESSAGE: 'Unable to process this request',
    FOUND: 'Service responded successfully',
    CREATED: 'Resource created successfully',
    FAILED: 'Resource creation failed',
    NOT_FOUND: 'Resource not found',
    DELETED: 'Resource removed successfully',
    INVALID_PARAMS: 'Invalid parameter passed to service',
    ERROR_500: 'Unable to process this request',
    NOT_AUTHORIZED: 'Protected resource. Authentication/Authorization required.',
    MISSING_FIELDS: 'Missing required field(s)',
    MISSING_URL_ID: 'Missing required url parameter',
    GENERIC: 'Task successful',
};

const eventType = {
    CREATE_NEW: 'CREATE NEW METRIC',
    CREATE_ERROR: 'CREATE NEW METRIC ERROR',
    INVALID_INPUT: 'INVALID INPUT',
    REQUEST: 'REQUEST FOR METRIC',
    INVALID_REQUEST: 'INVALID REQUEST FOR METRIC',
    REQUEST_ERROR: 'REQUEST ERROR FOR METRIC'
};


const requestConstants = {
    BODY: 'body',
    PARAMS: 'params',
    QUERY: 'query'
};

module.exports = {
    messageConstants,
    requestConstants,
    eventType
};
