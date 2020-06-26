import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './Components/App';

// Import Bootstrap CSS 
import 'bootstrap/dist/css/bootstrap.min.css';

import '../src/Components/Styles/style.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('app'));