window.onload = function () {

// Create and format the axis of the chart          

var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
      
    axisX: {
        interval: 1,
        title: "Socioeconomic stratum"               
          },
          
    axisY: {
        suffix: "%",
        title: "Percentage"
          },
    
    toolTip: {
        shared: true
          },
    
    legend: {
        reversed: true,
        verticalAlign: "center",
        horizontalAlign: "right"
          },
          
//Define the data and format the bar

    data: [{
        type: "stackedColumn100",
        name: "Literate",
        color: '#00b3b3',
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
            { y: 74, label: "Low"},
            { y: 85, label: "Medium low"},
            { y: 91, label: "Medium high"},
            { y: 92, label: "High"}
              
            ]
          }, 
                
          {
            type: "stackedColumn100",
            name: "Nonliterate",
            color: '#9fadaf',
            showInLegend: true,
            xValueFormatString: "YYYY",
            yValueFormatString: "#,##0\"%\"",
            dataPoints: [
              { y: 26, label: "Low"},
              { y: 15, label: "Medium Low"},
              { y: 9, label: "Medium High"},
              { y: 8, label: "High"}
                
            ]
          }, 
          ]
        });
        chart.render();
                
        }