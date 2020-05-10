import React, { Component } from 'react';
import Axios from 'axios';
import CountriesListDropdown from './SubComponents/CountriesListDropdown';
import TableCountry from './SubComponents/TableCountry';
import ChartCountry from './Charts/ChartCountry';
import Tabs from './SubComponents/SingleLineTabs';
import CountryStats from '../Components/SubComponents/CountryStats';
import Source from '../Components/SubComponents/Source';


class Country extends Component {

  state = {
    countriesList: [],
    countryName: 'United States of America',
    countryData: [],
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
    this.fetchCountryData();
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
    this.setState({
      countryName: event.target.value
    }
      , () => this.fetchCountryData()
    )
  }

  tabClickHandler = event => {
    this.setState({
      selectedTab: event.target.getAttribute("name")
    })
  }

  // fetch data of the country selected
  fetchCountryData = () => {
    Axios({
      method: 'GET',
      url: '/countrydata',
      params: {
        countryName: this.state.countryName
      }
    })
      .then(response => {
        this.setState({
          countryData: response.data.rows
        })
      })
      .catch(() => console.log(`error getting country data for ${this.state.countryName}`))
  }

  render() {

    return (
      <div className="marginTopBottom responsiveContainer">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <CountriesListDropdown
              name="countryName"
              firstSelected={this.state.countryName}
              countriesList={this.state.countriesList}
              changeHandle={this.countriesDropDownChangeHandler}
            />
          </div>
          <div className="col-lg-3"></div>
        </div>

        <div className="row" style={{marginTop: "20px"}}>
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <CountryStats
              countryData = {this.state.countryData}
            >
            </CountryStats> 
           </div>
           <div className="col-lg-3"></div>
        </div>     

        

        <div className="row marginTop">
          <div className="col-lg-1"></div>
          <div className="col-lg-10">
            <div className="containerBox">
            <Tabs
              tabArray = {this.state.tabsArray}
              selectedTab = {this.state.selectedTab}
              click={this.tabClickHandler}
            ></Tabs>
            </div>
          </div>
          <div className="col-lg-1"></div>
          </div>

          <div className="row">

            <div className="col-lg-1"></div>
              <div className="col-lg-10">
                <ChartCountry
                  chartData={this.state.countryData}
                  field={this.state.selectedTab}
                />
              <div className="col-lg-1"></div>
            </div>

        </div>

        <div className="row marginTopBottom">
          <div className="col-lg-1"></div>
          <div className="col-lg-10">
            <div className="containerBox">  
              <TableCountry 
                tableData = {this.state.countryData}
              />
            </div>
          </div>
          <div className="col-lg-1"></div>
        </div>  

        <Source></Source>
      </div>
    );
  }
}


export default Country;