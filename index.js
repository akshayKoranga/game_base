let express = require('express');
require('dotenv').config({
    path: __dirname + '/.env'
});
let cors = require('cors');
let bodyParser = require('body-parser');
let app = express();
let appConstants = require('./config').appConstants;
let routes = require('./app/routes');

// -------------------- use cors globaly --------------------
app.use(cors());
// ------------------------------------------------------------
// Body parser middleware
app.use(bodyParser.json({
    limit: appConstants.bodyLimit
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

// -------------- Define Static authorization --------------
// app.use(basicAuth({
//     users: { 'delivery@emilence.com': 'Emilence@1' }
// }));
// -------------- End Define Static authorization --------------
// elasticService.connect().then(() => {
//     console.log('Elastic cluster is up!');
// }).catch((error) => {
//     console.log('Error! Elastic cluster is down.', error);
// });
// Define App Routes
app.get('/', (req, res)=> {
    res.status(200).send('Server is up and running')
});
app.use('/v1', routes());
// Start application
app.all('*', (req, res)=> {
    res.status(404).send('NOT FOUND')
});

let PORT = process.env.PORT || appConstants.port;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console 
    console.log(`Connection established on Port: ${PORT}`);
});