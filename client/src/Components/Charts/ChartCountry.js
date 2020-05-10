import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';


const ChartCountry = ( {chartData, field} ) => {
    
    let seriesData = [];
    for (let i = chartData.length-1; i >= 0; i--) {
        let epochTime = moment.utc(chartData[i].reportdate).unix() * 1000;
        seriesData.push([epochTime, parseInt(chartData[i][field])]);
    }

    // Sub Title
    let subTitle = '';
    if(chartData.length > 0) {
        subTitle = parseInt(chartData[0][field]).toLocaleString();
        subTitle = subTitle + ' cases on ' + moment.utc(chartData[0].reportdate).format("MMMM DD, YYYY");
    }

    // Title , Series Name, Series Type
    let titleName = '';
    let seriesName = '';
    let seriesType = '';

    let countryName = '';
    if(chartData.length > 0) {
        if(chartData[0].country) {
            countryName = chartData[0].country
        } else {
            countryName = " "
        }
    }

    switch(field) {
        case 'confirmedcases':
            titleName = `Confirmed cases ${chartData[0] ? countryName : ' '}`
            seriesName = 'Confirmed Cases';
            seriesType = 'spline';
            break;
        
        case 'deaths':
        titleName = `Deaths ${chartData[0] ? countryName : ' '}`
        seriesName = 'Deaths';
        seriesType = 'spline';
        break;

        case 'confirmednewcases':
            titleName = `Confirmed Daily cases ${chartData[0] ? countryName : ' '}`
            seriesName = 'Confirmed Daily Cases';
            seriesType = 'column';
            break;
        
        case 'newdeaths':
        titleName = `Daily Deaths ${chartData[0] ? countryName : ' '}`
        seriesName = 'Daily Deaths';
        seriesType = 'column';
        break;   

    }

    Highcharts.setOptions({
        lang: {
          decimalPoint: '.',
          thousandsSep: ','
        }
      });

    let options = {
 
        title: {
            text: titleName
        },
    
        subtitle: {
            text: subTitle
        },
        
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },
        yAxis: {
            title: {
                text: seriesName,
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }
        },
    
        xAxis: {
            type: 'datetime'
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series: [{
            name: seriesName,
            data: seriesData,
            type: seriesType,
            marker: {
                enabled: false
            },
            showInLegend: false,
            // dashStyle: 'shortdot',
        }
    ],
    tooltip: {
        formatter: function() {
            return (
                Highcharts.dateFormat('%b %e, %Y', new Date(this.x))
                + '<br/><b>'  + this.series.name +': </b>' +  (this.y).toLocaleString() 
            );
        }
    },
    credits: {
        text: 'Source: ECDC ',
        // href: 'https://www.who.int/',
        enabled: true
    },
    chart: {
        events:{
            load: function() {
                this.credits.element.onclick = function() {
                    window.open(
                      'https://www.ecdc.europa.eu/',
                      '_blank'
                    );
                 }
            }
        }                
    }    

    }

    return (
        <div className="containerBox">
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                oneToOne={true}
            />
        </div>
    );
}



export default ChartCountry;