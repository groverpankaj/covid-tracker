import express  from 'express';

const path = require('path');

const controller = require('../controller/index');

const morgan = require('morgan');
const bodyParser = require('body-parser');

const compression = require('compression');


import { renderToString } from 'react-dom/server';
import React from 'react';
import { matchPath, StaticRouter } from 'react-router-dom';
import routes from '../client/src/Components/routes';
import App from '../client/src/Components/App';

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

app.use(express.static('./client/dist'));

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






app.get('*', (req, res, next) => {

  

  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  let namePass = "";
  if (activeRoute.fetchInitialData) {
    namePass = activeRoute.fetchInitialData(req.url);
  }

    const context = {namePass};

    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )
    
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Covid 19 Tracker</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__="${namePass}"</script>
          <!-- Global site tag (gtag.js) - Google Analytics -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-70724916-3"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'UA-70724916-3');
          </script>
          </head>
        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)  
});