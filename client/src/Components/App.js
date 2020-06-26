import React, { Component } from 'react';
import Navbar from '../Components/SubComponents/Navbar';
import routes from './routes';

import { Switch, Route } from "react-router-dom";


class App extends Component {

  render() {
    return (
      <div>
          <Navbar></Navbar>
          <Switch>

          {
            routes.map(({path, exact, component: C, ...rest}) => (
              <Route
                key = {path}
                path = {path}
                exact = {exact}
                render = {(props) => (
                  <C {...props} {...rest} />
                )}
              >
              </Route>

            ))
          }

          </Switch>

 

      </div>
    );
  }
}


export default App;