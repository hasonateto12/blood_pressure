const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'good'
    },
    host: 'localhost:2135'
};

const outputFile = './swagger-output.json';
const routes = ['./index.js']; // התאימי בהתאם לנתיבים שלך

swaggerAutogen(outputFile, routes, doc).then(() => {
    console.log("swagger-output.json good!");
});