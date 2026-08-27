const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'EventPulse API',
            version: '1.0.0',
            description: 'Backend API for an event booking and real-time announcement platform'
        },
        servers: [{ url: '/' }],
        components: {
            securitySchemes: {
                bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
            }
        }
    },
    apis: ['./routes/*.js'] // reads JSDoc comments from your route files
};

module.exports = swaggerJsdoc(options);