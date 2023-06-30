const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

app.use('/todoRoutes', routes);

//Start Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});