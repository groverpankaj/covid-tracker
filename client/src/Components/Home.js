import React, { Component } from 'react';
import TableTopFive from './SubComponents/TableTopFive';
import Tracker from './SubComponents/Tracker';
import ChartCountry from './Charts/ChartCountry';
import Tabs from './SubComponents/GraphTabs';
import AverageRadioBtn from '../Components/SubComponents/AverageRadioBtn';
import Footer from '../Components/SubComponents/Footer';

import Source from '../Components/SubComponents/Source';
import CubeSpinner from '../Components/SubComponents/CubeSpinner';
import Axios from 'axios';
import formula from '../Components/SubComponents/formulas';

class Home extends Component {
  
  state = {
    data: [], // latest day data
    globalData: [],
    tabsArray : [
      {value: "Confirmed Cases", name: "confirmedcases"},
      {value: "Daily Cases", name: "confirmednewcases"},
      {value: "Deaths", name: "deaths"},
      {value: "Daily Deaths", name: "newdeaths"}
    ],
    selectedTab: "confirmednewcases",
    averageType: "ema"
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

  topFiveClickHandler = nameOfCountry => {
    let urlOfCountry = formula.countryNameToUrl(nameOfCountry);
    // So that country page can get the country name
    window.__INITIAL_DATA__ = nameOfCountry;
    // Navigate to another page
    this.props.history.push(`/country/${urlOfCountry}`);
  }

  radioSelectHandler = event => {
    this.setState({
      averageType: event.target.value
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
                clickHandle={this.tabClickHandler}
                smallOrNot={true}
              ></Tabs>
              <ChartCountry
                chartData={this.state.globalData}
                field={this.state.selectedTab}
                averageType={this.state.averageType}
              />
              <div>
                {(this.state.selectedTab === 'confirmednewcases' || this.state.selectedTab === 'newdeaths')
                  ?
                    <AverageRadioBtn
                      clickHandle={this.radioSelectHandler}
                      selected={this.state.averageType}
                    ></AverageRadioBtn>
                  :
                    null
                  }
              </div>
          </div>

          <div className="col-lg-2"></div>

          <div className="col-lg-4 marginTop">
            <TableTopFive
              tableData = {formula.sortCases(this.state.data)}
              series="confirmedcases"
              clickHandle={this.topFiveClickHandler}
            >
            </TableTopFive>
          </div>
  
          <div className="col-lg-1"></div>
        </div>

        <CubeSpinner data={this.state.data}></CubeSpinner>

        <Source></Source>
        <Footer></Footer>          
      </div>
    );
  }
}


export default Home;