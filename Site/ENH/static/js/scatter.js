// Global Variables
var estatus = ['Low','Medium low','Medium high','High'];
var Colors = ['#F39C12','#3498DB','#74898b','#008080'];

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
                size: 10
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

    d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.   
        .datum(getDataLine(data))         //Populate the <svg> element with chart data...
        .call(lineChart);          //Finally, render the chart!

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