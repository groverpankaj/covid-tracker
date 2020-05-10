import React, { Component } from 'react';
import TableTopFive from './SubComponents/TableTopFive';
import Tracker from './SubComponents/Tracker';
import ChartCountry from './Charts/ChartCountry';
import Tabs from './SubComponents/TwoByTwoTabs';
import Source from '../Components/SubComponents/Source';
import CubeSpinner from '../Components/SubComponents/CubeSpinner';
import Axios from 'axios';

class Home extends Component {
  
  state = {
    data: this.props.latestData, // latest day data
    globalData: [],
    tabsArray : [
      {value: "Confirmed Cases", name: "confirmedcases"},
      {value: "Daily Cases", name: "confirmednewcases"},
      {value: "Deaths", name: "deaths"},
      {value: "Daily Deaths", name: "newdeaths"}
    ],
    selectedTab: "confirmedcases"
  }


  componentDidMount() {
    Axios({
      method: 'GET',
      url: '/globaldata',
    })
    .then(response => {
      this.setState({
        globalData: response.data.rows
      }
      // , () => console.log(this.state)
      )
    })
  }

  componentDidUpdate(prevProps) {
    
    if (this.props.latestData !== prevProps.latestData) {
      this.setState({
        data: this.props.latestData
      })
    }
  }


  sortUSData = () => {

    let usData;

    for (let i = 0; i < this.state.data.length; i++) {
      if(this.state.data[i].country === 'United States of America') {
        usData = this.state.data[i];
      }
    }
  
    return usData;
  }

  tabClickHandler = event => {
    this.setState({
      selectedTab: event.target.getAttribute("name")
    })
  }

  render() {

    return (
      <div>
        
        <div className="row">
          <div className="col-lg-12 text-center" style={{marginTop: "30px", color: "#"}}>
            <h1>COVID-19 TRACKER</h1>
          </div>
        </div>

        <div className="row">

          <div className="col-lg-1"></div>
         
          <div className="col-lg-4 marginTop"> 
            <Tracker
               tableData = {this.state.globalData[0]}
               seriesName="WORLD"
            ></Tracker>
          </div>

          <div className="col-lg-2"></div>
         
          <div className="col-lg-4 marginTop"> 
            <Tracker
               tableData = {this.sortUSData()}
               seriesName="USA"
            ></Tracker>
          </div>
          <div className="col-lg-1 marginTop"></div>

        </div>
        

        <div className="row marginBottom">
          <div className="col-lg-1"></div>

          <div className="col-lg-4 marginTop">
              <Tabs
                tabArray = {this.state.tabsArray}
                selectedTab = {this.state.selectedTab}
                click={this.tabClickHandler}
              ></Tabs>
              <ChartCountry
                chartData={this.state.globalData}
                field={this.state.selectedTab}
              />
          </div>

          <div className="col-lg-2"></div>

          <div className="col-lg-4 marginTop">
            <TableTopFive
              tableData = {this.state.data.sort( (a, b) =>  b.confirmednewcases - a.confirmednewcases ).slice(0,7) }
              tableClick = {this.tableClickHandler}
              series="confirmedcases"
            >
            </TableTopFive>
          </div>
  
          <div className="col-lg-1"></div>
        </div>

        <CubeSpinner data={this.state.data}></CubeSpinner>

        <Source></Source>

      </div>
    );
  }
}


export default Home;