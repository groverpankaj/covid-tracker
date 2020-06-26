import React from "react";
import Axios from 'axios';
import ChartWorld from './Charts/ChartWorld';
import Tabs from './SubComponents/GraphTabs';
import Source from '../Components/SubComponents/Source';
import Footer from '../Components/SubComponents/Footer';

class World extends React.Component {

  state = {
    data: [],
    tabsArray : [
      {value: "Confirmed Cases", name: "confirmedcases"},
      {value: "Deaths", name: "deaths"},
      {value: "Daily Cases", name: "confirmednewcases"},
      {value: "Daily Deaths", name: "newdeaths"}
    ],
    selectedTab: "confirmedcases"
  }


  componentDidMount() {
    this.fetchWorldData();
  }

  fetchWorldData = () => {
    Axios({
      method: 'GET',
      url: '/latestdata',
    })
      .then(response => { 
        this.setState({
          data: response.data.rows
        }
          , () => ChartWorld(this.state.data, this.state.selectedTab)
        )
      })
      .catch(() => console.log('Error fetching latest data'));
  }


  tabClickHandler = event => {
    this.setState({
      selectedTab: event.target.getAttribute("name")
    }
    , () => ChartWorld(this.state.data, this.state.selectedTab)
    )
  }

  render() {
    return (

      <div>
        <div className="row marginTop">
        <div className="col-md-1"></div>
          <div className="col-md-10">
            <Tabs
              tabArray = {this.state.tabsArray}
              selectedTab = {this.state.selectedTab}
              clickHandle={this.tabClickHandler}
            ></Tabs>
            <div id="world_map" className="containerBox" style={{ minHeight: '650px' }}></div>
          </div>
          <div className="col-md-1"></div>
        </div>

        <Source></Source>
        <Footer></Footer> 
      </div>

      
    );
  }
}

export default World;
