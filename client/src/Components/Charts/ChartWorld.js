import Highcharts from "highcharts/highmaps";
import mapDataWorld from '@highcharts/map-collection/custom/world.geo.json';
import moment from "moment";


// Highcharts.setOptions({
//   lang: {
//     decimalPoint: '.',
//     thousandsSep: ','
//   }
// });

const ChartWorld = (data, field) => {
  
  // Series Name
  let seriesName = '';
  switch(field)  {
    case("confirmedcases"): 
      seriesName = "Confirmed Cases";
      break;

    case("confirmednewcases"): 
    seriesName = "Daily Cases";
    break;

    case("deaths"): 
      seriesName = "Deaths";
      break;
    
    case("newdeaths"): 
      seriesName = "Daily Deaths";
      break;
  }

  // Date 
  let displayDate = '';
  if(data.length > 0) {
    displayDate = moment.utc(data[0].reportdate).format("MMMM DD, YYYY");
    displayDate = ' as on ' + displayDate
  }
  

  let chartData = [];
  let total = 0;

  data.map(country => {
    let tempObj = {
      "code3": country.alphathreecode,
      "value": country[field]
    }
    chartData.push(tempObj);
    total += country[field];
  })
  total = total.toLocaleString();

  Highcharts.mapChart("world_map", {
    chart: {
      map: "custom/world",
      borderWidth: 1,
      events: {
        load: function () {
          this.credits.element.onclick = function () {
            window.open(
              'https://www.ecdc.europa.eu/',
              '_blank'
            );
          }
        }
      }
    },
    title: {
      text: (data.length > 0) ? 'Total: ' + total + displayDate: ' ' 
    },
    legend: {
      layout: 'horizontal',
      borderWidth: 0,
      backgroundColor: 'rgba(255,255,255,0.85)',
      floating: true,
      y: 5
    },
    mapNavigation: {
      enabled: false,
      buttonOptions: {
        verticalAlign: "bottom"
      }
    },
    colorAxis: {
      min: 1,
      minColor: '#EEEEFF',
      maxColor: '#000022',
      stops: [
        [0, '#ffebee'],
        [0.05, '#ff8a80'],
        [1, '#d50000']
      ]
    },
    series: [
      {
        animation: {
          duration: 1000
        },
        data: chartData,
        mapData: mapDataWorld,
        joinBy: ["iso-a3", "code3"],
        name: seriesName,
        states: {
          hover: {
            color: "#a4edba"
          }
        }
      }
    ],
    credits: {
      text: 'Source: ECDC',
      // href: 'https://www.ecdc.europa.eu/',
      enabled: true
    }

  })

}


export default ChartWorld;