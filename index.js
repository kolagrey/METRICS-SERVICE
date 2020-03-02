require('dotenv').config();
const server = require('./src/server');
const PLATFORM = process.env.PLATFORM || 'Metric'
const PORT = process.env.SERVICE_PORT || 6969;
const { eventLogger } = require('./src/utils');
server.listen(PORT, () => {
    eventLogger().createEvent({
        type: 'Server Start',
        description: `${process.env.PLATFORM} Service running on PORT ${PORT} at ${new Date()}`,
        payload: {}
    });
    
    console.log(`${PLATFORM} Service running on PORT ${PORT}`);
});

module.exports = server;