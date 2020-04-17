const express = require('express');

const path = require('path');

const controller = require('../controller/index');

const morgan = require('morgan');
const bodyParser = require('body-parser');

const compression = require('compression')

const app = express();

const PORT = 80;

app.use(compression({ filter: shouldCompress }));

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
 
  // fallback to standard filter function
  return compression.filter(req, res)
}

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, () => console.log('Server listening on port: ' + PORT));


app.get('/latestdata', (request, response) => {

  controller.control.getLatestData( (error, data) => {
    if(error) {
      console.log(`error feching latest data`)
      response.send()
    } else {
      response.send(data);
    }
  });

});

app.get('/globaldata', (request, response) => {

  controller.control.getGlobalData( (error, data) => {
    if(error) {
      console.log(`error feching latest data`)
      response.send()
    } else {
      response.send(data);
    }
  });

});

app.get('/data', (request, response) => {
  let requiredDate = request.query.reqDate;
  controller.control.getDateData(requiredDate, (error, data) => {
    if(error) {
      console.log(`error feching data for ${requiredDate}`)
      response.send()
    } else {
      response.send(data);
    }
  });
  
});

// Fetch the list of countries
app.get('/countrieslist', (request, response) => {

  controller.control.getCountryList( (error, data) => {
    if(error) {
      console.log('error fetching counties list')
      response.send()
    } else {
      response.send(data);
    }
  });
  
});

// Fetch the list of countries
app.get('/countrydata', (request, response) => {
  let requiredCountry = request.query.countryName;

  controller.control.getcountryData(requiredCountry, (error, data) => {
    if(error) {
      console.log(`error fetching data for ${requiredCountry}`)
      response.send()
    } else {
      response.send(data);
    }
  });
  
});






