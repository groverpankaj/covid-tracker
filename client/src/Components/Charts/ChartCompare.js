import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import formulas from '../SubComponents/formulas';

// Highcharts.setOptions({
//     lang: {
//       decimalPoint: '.',
//       thousandsSep: ','
//     }
//   });

const ChartCompare = ( {chartDataOne, chartDataTwo, field, averageType} ) => {

    let seriesDataOne = [];
    for (let i = chartDataOne.length-1; i >= 0; i--) {
        let epochTime = moment.utc(chartDataOne[i].reportdate).unix() * 1000;
        seriesDataOne.push([epochTime, chartDataOne[i][field]]);
    }

    seriesDataOne = formulas.movingAverages(seriesDataOne, averageType, 10);

    let seriesDataTwo = [];
    for (let i = chartDataTwo.length-1; i >= 0; i--) {
        let epochTime = moment.utc(chartDataTwo[i].reportdate).unix() * 1000;
        seriesDataTwo.push([epochTime, chartDataTwo[i][field]]);
    }

    seriesDataTwo = formulas.movingAverages(seriesDataTwo, averageType, 10);
    
    let seriesNameOne = (chartDataOne.length> 0) ? chartDataOne[0].country: ' ';
    let seriesNameTwo = (chartDataTwo.length> 0) ? chartDataTwo[0].country: ' ';
    

    let subTitle = '';
    if(chartDataOne[0]) {
        subTitle =  seriesNameOne + ' Vs ' + seriesNameTwo;
    }

    let titleName = ''; 
    let seriesName = '';
    let seriesType = 'spline';

    switch(field) {
        case 'confirmedcases':
            titleName = `Confirmed cases`
            seriesName = 'Confirmed Cases';
            seriesType = 'spline';
            break;
        
        case 'deaths':
            titleName = `Deaths`
            seriesName = 'Deaths';
            seriesType = 'spline';
            break;

        case 'confirmednewcases':
            titleName = `Confirmed Daily cases`
            seriesName = 'Confirmed Daily Cases';
            seriesType = 'spline';
            break;
        
        case 'newdeaths':
            titleName = `Daily Deaths`
            seriesName = 'Daily Deaths';
            seriesType = 'spline';
            break;   

    }
    

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
                    // color: Highcharts.getOptions().colors[0]
                }
            }
        },
    
        xAxis: {
            type: 'datetime'
        },
    
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
        },
        series: [{
            name: seriesNameOne,
            data: seriesDataOne,
            type: seriesType,
            marker: {
                enabled: false
            },
            showInLegend: true
        },
        {
          name: seriesNameTwo,
          data: seriesDataTwo,
          type: seriesType,
          marker: {
              enabled: false
          },
          showInLegend: true,
      }
    ],
    tooltip: {

        shared: true,
        formatter: function () {
            var points = this.points;
            var pointsLength = points.length;
            var tooltipMarkup = pointsLength ? '<span style="font-size: 10px">' + Highcharts.dateFormat('%b %e, %Y', new Date(this.x)) + '</span><br/>' : '';
            var index;
            var y_value_kwh;

            for(index = 0; index < pointsLength; index += 1) {
              y_value_kwh = points[index].y;

              tooltipMarkup += '<span style="color:' + points[index].series.color + '">\u25CF</span> ' + points[index].series.name + ': <b>' + (points[index].y).toLocaleString()  + ' </b><br/>';
            }

            return tooltipMarkup;
        }
    },
    credits: {
        text: 'ECDC ',
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
    },
 

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



export default ChartCompare;