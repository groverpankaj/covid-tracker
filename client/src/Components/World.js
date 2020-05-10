import React from "react";
import Axios from 'axios';
import ChartWorld from './Charts/ChartWorld';
import Tabs from './SubComponents/SingleLineTabs';
import Source from '../Components/SubComponents/Source';

class World extends React.Component {

  state = {
    data: this.props.latestData,
    tabsArray : [
      {value: "Confirmed Cases", name: "confirmedcases"},
      {value: "Deaths", name: "deaths"},
      {value: "Daily Cases", name: "confirmednewcases"},
      {value: "Daily Deaths", name: "newdeaths"}
    ],
    selectedTab: "confirmedcases"
  }


  componentDidMount() {
    // this.fetchWorldData();
    ChartWorld(this.state.data, this.state.selectedTab);
  }

  fetchWorldData = () => {
    // Axios({
    //   method: 'GET',
    //   url: '/data',
    //   params: {
    //     reqDate: '2020-03-24'
    //   }
    // })
    //   .then(response => {
    //     this.setState({
    //       data: response.data.rows
    //     }
    //       // Re-render the chart
    //       , () => ChartWorld(this.state.data, this.state.field)
    //     )
    //   })
    //   .catch(() => console.log('error fetching world data'))
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
              click={this.tabClickHandler}
            ></Tabs>
          </div>
          <div className="col-md-1"></div>
        </div>

        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10" id="world_map" style={{ minHeight: '650px' }} />
          <div className="col-md-1"></div>
        </div>

        <Source></Source>
      </div>

      
    );
  }
}

export default World;
