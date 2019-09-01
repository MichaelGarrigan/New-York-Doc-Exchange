const express = require('express');
const bodyParser = require('body-parser');

// Controllers
const { locationController } = require('./controllers/locationController.js');
const { searchController } = require('./controllers/searchController.js');

//express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

// routes 
app.use('/location', locationController);
app.use('/search', searchController);


let port = process.env.PORT || 5050;
//creates server connection
app.listen(port, () => {
  console.log(`Connected to port ${port}...`);
});
