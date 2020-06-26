import React, { Component } from 'react';
import Axios from 'axios';
import CountriesListDropdown from './SubComponents/CountriesListDropdown';
import TableCountry from './SubComponents/TableCountry';
import ChartCountry from './Charts/ChartCountry';
import Tabs from './SubComponents/GraphTabs';
import CountryStats from '../Components/SubComponents/CountryStats';
import Source from '../Components/SubComponents/Source';
import Footer from '../Components/SubComponents/Footer';
import AverageRadioBtn from '../Components/SubComponents/AverageRadioBtn';
import formulas from '../Components/SubComponents/formulas';


class Country extends Component {

  constructor (props) {
    super(props);

    let countrySelected = '' 
    if (__isBrowser__) {
      // Client side rendering
      countrySelected = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      // Server Side Rendering
      countrySelected = props.staticContext.data;
    }

    if (countrySelected) {
      countrySelected = formulas.urlToCountryName(countrySelected)
    } else {
      countrySelected = "United States of America"; // Default if no country selected
    }


    this.state = {
      countriesList: [],
      countryName: countrySelected,
      countryData: [],
      tabsArray : [
        {value: "Confirmed Cases", name: "confirmedcases"},
        {value: "Deaths", name: "deaths"},
        {value: "Daily Cases", name: "confirmednewcases"},
        {value: "Daily Deaths", name: "newdeaths"}
      ],
      selectedTab: "confirmednewcases",
      averageType: "ema"
    }
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


  // Change URL
  changeURL = urlText => {
    let newUrl = formulas.countryNameToUrl(urlText);

    let endpoint = (window.location.href).split('/').pop()
    
    // if browser on /country and not on /country/xyz 
    if (endpoint === 'country') newUrl = `country/${newUrl}`
    // Change url without refereshing
    window.history.pushState('', '', newUrl);
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
        // Country has no data i.e. country name is bad
        if (response.data.rows.length === 0) { 
          // Default to USA
          this.setState({
            countryName: 'United States of America'
          }
           , () => this.fetchCountryData()
          )
        } else {
          this.setState({
            countryData: response.data.rows
          }
            // Change URL
          , () => this.changeURL(this.state.countryName)
          )
        }
      })
      .catch(() => console.log(`error getting country data for ${this.state.countryName}`))
  }

  radioSelectHandler = event => {
    this.setState({
      averageType: event.target.value
    })
  }

  render() {

    return (
      <div className="marginTopBottom">
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
            <Tabs
              tabArray = {this.state.tabsArray}
              selectedTab = {this.state.selectedTab}
              clickHandle={this.tabClickHandler}
            ></Tabs>
          </div>
          <div className="col-lg-1"></div>
          </div>

          <div className="row">

            <div className="col-lg-1"></div>
              <div className="col-lg-10">
                <ChartCountry
                  chartData={this.state.countryData}
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
        <Footer></Footer> 
      </div>
    );
  }
}


export default Country;