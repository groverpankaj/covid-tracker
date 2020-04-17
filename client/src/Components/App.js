import React, { Component } from 'react';
import Axios from 'axios';
import Home from './Home';
import Country from './Country';
import World from './World';
import Compare from './Compare';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class App extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    Axios({
      method: 'GET',
      url: '/latestdata',
    })
      .then(response => {
        this.setState({
          data: response.data.rows
        }
          // , () => console.log(this.state)
        )
      })
      .catch(() => console.log('Error fetching latest data'));
  }



  render() {
    return (
      <div>

        <Router>
          <div className="nav-container">
            <div style={{ "flexGrow": "1" }}>
              <Link className="navLinks" to="/">Home</Link>
            </div>
            <div style={{ "flexGrow": "1" }}>
              <Link className="navLinks" to="/world">World</Link>
            </div>
            <div style={{ "flexGrow": "1" }}>
              <Link className="navLinks" to="/country">Country</Link>
            </div>
            <div style={{ "flexGrow": "1" }}>
              <Link className="navLinks" to="/compare">Compare</Link>
            </div>
          </div>

          <Switch>

            <Route path="/world">
              <World
                latestData={this.state.data}
              ></World>
            </Route>

            <Route path="/country">
              <Country></Country>
            </Route>

            <Route path="/compare">
              <Compare></Compare>
            </Route>

            <Route path="/" exact>
              <Home
                latestData={this.state.data}
              ></Home>
            </Route>

          </Switch>

        </Router>

      </div>
    );
  }
}


export default App;