// Create a public variable
var estatus = ['Low','Medium low','Medium high','High'];

// Read information in API
d3.json("/rent/ByAge", function(error, data) {
    // Foreach by status
    for (i = 0; i < estatus.length; i++) {
        // Clean Variables
        cleanVariables();
        // Filter by status
        filter = data.filter(d => d.est_socio == i + 1);  
        // Average by status
        avrRent = parseInt(d3.mean(filter, function(d) { return d.pago_renta; }));
        // Save Age and rent by status 
        filter.forEach(function(d) {    
            ageX.push(parseInt(d.edad));
            rentY.push(parseInt(d.pago_renta));
        });
        // Create line of status
        for (j = 0; j < 99; j++) {
            avrX.push(j);
            avrY.push(avrRent);
        }
        // Create markers
        if (i == 0) { 
            var lowMarker = { x: ageX, y: rentY, mode: 'markers', type: 'scatter', name: estatus[i], marker: { color: Colors[i], size: 8 } };
            var lowMarkerAvg = { x: avrX, y: avrY, mode: 'lines', type: 'scatter', name: "Mean " + estatus[i], marker: {color: Colors[i] } };                
        }      
        if (i == 1) {
            var mediumLMarker = { x: ageX, y: rentY, mode: 'markers', type: 'scatter', name: estatus[i], marker: {color: Colors[i], size: 8 }};
            var mediumLMarkerAvg = { x: avrX, y: avrY, mode: 'lines', type: 'scatter', name: "Mean " + estatus[i], marker: {color: Colors[i] }};
        }      
        if (i == 2) {
            var mediumHMarker = { x: ageX, y: rentY, mode: 'markers', type: 'scatter', name: estatus[i], marker: {color: Colors[i], size: 8 }};
            var mediumHMarkerAvg = { x: avrX, y: avrY, mode: 'lines', type: 'scatter', name: "Mean " + estatus[i], marker: {color: Colors[i] }};        
        }      
        if (i == 3) {
            var highMarker = { x: ageX, y: rentY, mode: 'markers', type: 'scatter', name: estatus[i], marker: {color: Colors[i], size: 8 }};
            var highMarkerAvg = { x: avrX, y: avrY, mode: 'lines', type: 'scatter', name: "Mean " + estatus[i],  marker: {color: Colors[i] }};                                
        }        
      }
      // Create data set
      var info = [lowMarker, mediumLMarker, mediumHMarker, highMarker, lowMarkerAvg, mediumLMarkerAvg, mediumHMarkerAvg, highMarkerAvg];
      
    // Create Layout
    var layout = { xaxis: { title: { text: 'Age', font: { family: 'Courier New, monospace', size: 18, color: '#7f7f7f' } } , ticks: 'outside', zeroline: false } , yaxis: { title: { text: 'Rent ($)' } , ticks: 'outside', zeroline: false } };

    // Save image
    var img_jpg = d3.select('#png-export');
    Plotly.newPlot('chart', info, layout, {displayModeBar: false}).then(
      function(gd)
       {
        Plotly.toImage(gd,{height:600,width:1000})
           .then(
               function(url)
           {
               img_jpg.attr("src", url);
               return Plotly.toImage(gd,{format:'jpeg',height:800,width:800});
           }
           )
      });
});

function cleanVariables(){
    ageX = [];
    rentY =[];    
    avrX = [];
    avrY =[];    
}

// Global Variables
/* with NVD3
var estatus = ['Low','Medium low','Medium high','High'];
var Colors = ['#F39C12','#3498DB','#95a5a6','#008080'];

// Create data to create the graph
function getData(points) {
    var data = [];
   
    for (i = 0; i < estatus.length; i++) {
        data.push({
            key: estatus[i],
            values: []
        });
        filter = points.filter(d => d.est_socio == i + 1);  
        filter.forEach(function(d) {    
            data[i].values.push({
                x: parseInt(d.edad),
                y: parseInt(d.pago_renta),
                size: Math.random() * (0.1630011615713984 - 0.1530011615713984) + 0.1530011615713984
                });
            });
    }
    return data;
};

// Create data to create the line
function getDataLine(points) {
    var dataLine = [];

    for (i = 0; i < estatus.length; i++) {
        dataLine.push({
            key: estatus[i],
            values: [],
            color: Colors[i]
        });

        filter = points.filter(d => d.est_socio == i + 1);  
        avrRent = parseInt(d3.mean(filter, function(d) { return d.pago_renta; }));    

        for (j = 0; j < 99; j++) {
            dataLine[i].values.push({
                x: j,
                y: parseInt(avrRent),
                });
        }
      }
      return dataLine;
}

nv.addGraph(function() {
    d3.scale.myColors = function() {
        return d3.scale.ordinal().range(Colors);
    };
     // load data
     d3.json("/rent/ByAge", function(error, data) {  
        var ageMax = d3.max(data, function(d) { return d.edad; });

    var lineChart = nv.models.lineChart()
        .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
        .showLegend(false)       //Show the legend, allowing users to turn on/off line series.
        .showYAxis(false)        //Show the y-axis
        .showXAxis(false)        //Show the x-axis

//    d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.   
//        .datum(getDataLine(data))         //Populate the <svg> element with chart data...
//        .call(lineChart);          //Finally, render the chart!

    var chart = nv.models.scatterChart()
        .showDistX(true)
        .showDistY(true)
        .xDomain([0, parseInt(ageMax) + 2])
        .color(d3.scale.myColors().range());

    chart.xAxis.tickFormat(d3.format(''));
    chart.yAxis.tickFormat(d3.format('$,'));
    chart.xAxis.tickValues(['10', '20', '30', '40', '50', '60', '70', '80', '90' ]);
    chart.yAxis.tickValues(['2000', '4000', '6000', '8000', '10000', '20000', '30000', '40000', '50000' ]);
    chart.xAxis.axisLabel('Age');
    chart.yAxis.axisLabel('Rent ($)');

    d3.select('#chart svg')
        .datum(getData(data))
        .transition().duration(500)
        .call(chart);

    var line = d3.select('#chart svg')
        .append('line')
        .attr({
            x1: 75 + chart.xAxis.scale()(0),
            y1: 30 + chart.yAxis.scale()(10),
            x2: 75 + chart.xAxis.scale()(parseInt(ageMax) + 2),
            y2: 30 + chart.yAxis.scale()(10)
        })
        .style("stroke", "#000");
    
    nv.utils.windowResize(function(){
        chart.update();
        line.attr({
            x1: 75 + chart.xAxis.scale()(0),
            y1: 30 + chart.yAxis.scale()(10),
            x2: 75 + chart.xAxis.scale()(parseInt(ageMax) + 2),
            y2: 30 + chart.yAxis.scale()(10)
            })
        });
    });
    return chart;
});

nv.addGraph();
*/
