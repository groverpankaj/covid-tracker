import React, { Component } from 'react';
import Axios from 'axios';
import CountriesListDropdown from './SubComponents/CountriesListDropdown';
import ChartCompare from './Charts/ChartCompare';
import Tabs from './SubComponents/SingleLineTabs';

class Country extends Component {

  state = {
    countriesList: [],
    countryNameOne: 'United States of America',
    countryDataOne: [],
    countryNameTwo: 'China',
    countryDataTwo: [],
    tabsArray : [
      {value: "Confirmed Cases", name: "confirmedcases"},
      {value: "Deaths", name: "deaths"},
      {value: "Daily Cases", name: "confirmednewcases"},
      {value: "Daily Deaths", name: "newdeaths"}
    ],
    selectedTab: "confirmedcases"
  }

  componentDidMount = () => {
    this.fetchCountriesList();
    this.fetchCountryData("countryNameOne");
    this.fetchCountryData("countryNameTwo");
  }

  // Fetch the list of all countries in the DB
  fetchCountriesList = () => {
    Axios({
      method: 'GET',
      url: '/countrieslist'
    })
      .then((response) => {
        this.setState({
          countriesList: response.data.rows
        })
      })
      .catch(() => console.log('Error fetching countries list'))
  }


  // Countries Dropdown Change Handler
  countriesDropDownChangeHandler = (event) => {
    let targetSelector = event.target.name;
    this.setState({
      [targetSelector]: event.target.value
    }
      , () => this.fetchCountryData(targetSelector)
    )
  }

  // fetch data of the country selected
  fetchCountryData = (countrySelectorName) => {
   
    let countryName = this.state.countryNameTwo;
    let datafield = 'countryDataTwo';

    if (countrySelectorName === 'countryNameOne') {
      countryName = this.state.countryNameOne;
      datafield = 'countryDataOne';
    }

    Axios({
      method: 'GET',
      url: '/countrydata',
      params: {
        countryName: countryName
      }
    })
      .then(response => {
        this.setState({
          [datafield]: response.data.rows
        }
          // , () => console.log(this.state)
        )
      })
      .catch(() => console.log(`error getting country data for ${this.state.countryName}`))
  }

  tabClickHandler = event => {
    this.setState({
      selectedTab: event.target.getAttribute("name")
    })
  }

  render() {
    return (
      <div className="marginTop">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <CountriesListDropdown
              name="countryNameOne"
              firstSelected={this.state.countryNameOne}
              countriesList={this.state.countriesList}
              changeHandle={this.countriesDropDownChangeHandler}
            />
          </div>
          <div className="col-md-2 vsFont">Vs</div>
          <div className="col-md-4">
            <CountriesListDropdown
              name="countryNameTwo"
              firstSelected={this.state.countryNameTwo}
              countriesList={this.state.countriesList}
              changeHandle={this.countriesDropDownChangeHandler}
            />
          </div>
          <div className="col-md-1"></div>
        </div>

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
          <div className="col-md-10">
            <ChartCompare
              chartDataOne={this.state.countryDataOne}
              chartDataTwo={this.state.countryDataTwo}
              field={this.state.selectedTab}
            />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
}


export default Country;