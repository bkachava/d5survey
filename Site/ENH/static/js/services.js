
// beginGraph Services Percentages (Computer, Fixed-line phone, Cel phone, Internet, Pay TV)  
function updateServices(level) {
   
    var url = "/services/" + level;

    d3.json(url, function (data) {
  
        var key = ["yes_cnt", "no_cnt"];
        var labels = ["Yes", "No"];
        var colors = [];

        var svgArea = d3.select("#percServ").select("svg");
        if (!svgArea.empty()) {
            svgArea.remove();
        }
        d3.selectAll("a.btn").classed("active",false);
        switch(level)
        {
        case "low": 
            colors = ['#F39C12','#fcebcf'];
            d3.select("a.btn.btn-outline-warning").classed("active",true);
            break;
        case "mdlow":
            colors = ['#3498DB',' #d4e9f7'];
            d3.select("a.btn.btn-outline-info").classed("active",true);
            break;
        case "mdhigh":
            colors = ['#95a5a6',' #c7d0d1'];
            d3.select("a.btn.btn-outline-secondary").classed("active",true);
            break;
        case "high":           
            colors = ['#008080','#8ef0dd'];
            d3.select("a.btn.btn-outline-success").classed("active",true);
            break;
        default:
            colors = ['#7b99b7','#bdccdb'];
            d3.select("a.btn.btn-outline-primary").classed("active",true);
        }

        var initStackedBarChart = {
            draw: function(config) {
                me = this,
                domEle = config.element,
                stackKey = config.key,
                data = config.data,
                margin = {top: 20, right: 20, bottom: 30, left: 100},
                width = 500 - margin.left - margin.right,
                height = 320 - margin.top - margin.bottom,
                xScale = d3.scaleLinear().rangeRound([0, width]),
                yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1),
                color = d3.scaleOrdinal(colors),   
                xAxis = d3.axisBottom(xScale),
                yAxis =  d3.axisLeft(yScale),
                svg = d3.select("#"+domEle).append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
                var stack = d3.stack()
                    .keys(stackKey)
                    .offset(d3.stackOffsetNone);
            
                var layers = stack(data);
                    data.sort(function(a, b) { return b.total - a.total; });
                    yScale.domain(data.map(function(d) { return d.item; }));
                    xScale.domain([0, 100]).nice();
    
                var layer = svg.selectAll(".layer")
                    .data(layers)
                    .enter().append("g")
                    .attr("class", "layer")
                    .style("fill", function(d, i) { return color(i); });
        
                layer.selectAll("rect")
                    .data(function(d) { return d; })
                    .enter().append("rect")
                    .transition()
                    .delay(400)
                    .duration(900)
                    .attr("y", function(d) { return yScale(d.data.item); })
                    .attr("x", function(d) { return xScale(d[0]); })
                    .attr("height", yScale.bandwidth())
                    .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]) });
        
                layer.selectAll("text")
                    .data(function (d) {
                        return d;
                    })
                    .enter().append("text")
                    .classed("label", true)
                    .transition()
                    .delay(650)
                    .duration(1200)
                    .attr("y", function (d) {
                        return yScale(d.data.item) + 20;
                    })
                    .attr("x", function (d) {
                        return xScale(d[0]) - 20;
                    })
                    .text(function (d) {
                        if (d[0] > 0) {
                            return d[0];
                        }
                    });

                    svg.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + (height+5) + ")")
                    .call(xAxis);
        
                    svg.append("g")
                    .attr("class", "axis axis--y")
                    .attr("transform", "translate(0,0)")
                    .call(yAxis);							

                    
                var legend = svg.selectAll(".legend")
                    .data(layers)
                    .enter()
                    .append("g");

                legend.append("rect")
                    .attr("fill", function (d, i) {
                        return colors[i];
                    })
                    .attr("width", 10)
                    .attr("height", 10)
                    .attr("y", -10)
                    .attr("x", function (d, i) {
                        return (i * (width /2)) + 10;
                    }) ;

                legend.append("text")
                    .classed("label", true)
                    .attr("y", -3)
                    .attr("x", function (d, i) {
                        return (i * (width /2)) + 25;
                    })
                    .text(function (d, i) {
                        return labels[i] +  "(%)";
                    });
            }
        }
        
        initStackedBarChart.draw({
            data: data,
            key: key,
            element: 'percServ'
        });

        updateStates(level);

        updateLabels(level);

    });
    
    return false;
}
// endGraph Services Percentages (Computer, Fixed-line phone, Cel phone, Internet, Pay TV)  

// beginGraph Services by State (Computer, Fixed-line phone, Cel phone, Internet, Pay TV)  
function updateStates(level) {

    var svgArea = d3.select("#stateServ").select("svg");
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    var svg = dimple.newSvg("#stateServ", 580, 350);
    var url = "/servicesByState/" + level;

    d3.json(url, function (data) {

      var myChart = new dimple.chart(svg, data);
      myChart.setBounds(60, 30, 500, 255)
      myChart.addCategoryAxis("x", ["Services", "State"]);
      myChart.addMeasureAxis("y", "Yes Counter");
      var s = myChart.addSeries("State", dimple.plot.bar);
      s.stacked = false;
      var myLegend = myChart.addLegend(60, 5, 510, 20, "right");
      myLegend.verticalPadding = 3;
      myLegend.fontFamily = "sans-serif";

      switch(level)
      {
        case "low": 
            myChart.defaultColors = [
                new dimple.color("#ffeda0", "#888"), 
                new dimple.color("#fed976", "#888"), 
                new dimple.color("#feb24c", "#888"), 
                new dimple.color("#fd8d3c", "#888"), 
                new dimple.color("#fc4e2a", "#888"), 
                new dimple.color("#e31a1c", "#888"), 
                new dimple.color("#bd0026", "#888") 
                ];
            break;
        case "mdlow":
                myChart.defaultColors = [
                    new dimple.color("#ece7f2", "#888"), 
                    new dimple.color("#d0d1e6", "#888"), 
                    new dimple.color("#a6bddb", "#888"), 
                    new dimple.color("#74a9cf", "#888"), 
                    new dimple.color("#3690c0", "#888"), 
                    new dimple.color("#0570b0", "#888"), 
                    new dimple.color("#045a8d", "#888") 
                    ];
            break;
        case "mdhigh":
                myChart.defaultColors = [
                    new dimple.color("#efedf5", "#888"), 
                    new dimple.color("#dadaeb", "#888"), 
                    new dimple.color("#bcbddc", "#888"), 
                    new dimple.color("#9e9ac8", "#888"), 
                    new dimple.color("#807dba", "#888"), 
                    new dimple.color("#6a51a3", "#888"), 
                    new dimple.color("#54278f", "#888") 
                    ];
            break;
        case "high":
                myChart.defaultColors = [
                    new dimple.color("#2c8147", "#888"), 
                    new dimple.color("#cff24d", "#888"), 
                    new dimple.color("#3bdf78", "#888"), 
                    new dimple.color("#8ceac6", "#888"), 
                    new dimple.color("#ffe67f", "#888"), 
                    new dimple.color("#46f1df", "#888"), 
                    new dimple.color("#8fdfda", "#888") 
                    ];
            break;
        default:
                myChart.defaultColors = [
                    new dimple.color("#edf8fb", "#888"), 
                    new dimple.color("#bfd3e6", "#888"), 
                    new dimple.color("#9ebcda", "#888"), 
                    new dimple.color("#8c96c6", "#888"), 
                    new dimple.color("#8c6bb1", "#888"), 
                    new dimple.color("#88419d", "#888"), 
                    new dimple.color("#6e016b", "#888") 
                    ];
      }

      myChart.draw();
    });

    return false;
}
// endGraph Services by State (Computer, Fixed-line phone, Cel phone, Internet, Pay TV)  


function updateLabels(level) {

    let houses = [];
    switch(level)
    {
    case "low": 
        houses = ['1,821','5','461','164','198','576','328','89'];
        break;
    case "mdlow":
        houses = ['7,278','728','1,081','1,170','1,136','812','830','1,521'];
        break;
    case "mdhigh":
        houses = ['2,172','795','99','303','238','219','390','128'];
        break;
    case "high":           
        houses = ['1,024','248','80','191','60','90','282','73'];
        break;
    default:
        houses = ['12,295','1,776','1,721','1,828','1,632','1,697','1,830','1,811'];
    }

    let selection = d3.select("#tot");
    // Use `.html("") to clear any existing metadata
    selection.html("");
    // Use d3 to append new tags for each value
    selection.append("span").text("Living spaces - Total sample: ").classed("text-primary font-weight-bold", true);
    selection.append("span").text(houses[0]).classed("text-info font-weight-bold", true);
    selection.append("p");
    selection.append("span").text("Ciudad de México: ").classed("text-muted font-weight-bold", true);
    selection.append("span").text(houses[1]).classed("text-info font-weight-bold", true);
    selection.append("span").text(" - Hidalgo: ").classed("text-muted font-weight-bold", true);
    selection.append("span").text(houses[2]).classed("text-info font-weight-bold", true);
    selection.append("span").text(" - México: ").classed("text-muted font-weight-bold", true);
    selection.append("span").text(houses[3]).classed("text-info font-weight-bold", true);
    selection.append("span").text(" - Morelos: ").classed("text-muted font-weight-bold", true);
    selection.append("span").text(houses[4]).classed("text-info font-weight-bold", true);
    selection.append("span").text(" - Puebla: ").classed("text-muted font-weight-bold", true);
    selection.append("span").text(houses[5]).classed("text-info font-weight-bold", true);
    selection.append("span").text(" - Querétaro: ").classed("text-muted font-weight-bold", true);
    selection.append("span").text(houses[6]).classed("text-info font-weight-bold", true);
    selection.append("span").text(" - Tlaxcala: ").classed("text-muted font-weight-bold", true);
    selection.append("span").text(houses[7]).classed("text-info font-weight-bold", true);
    selection.append("p");
}


// Call the function to present the Graphs Services (Computer, Fixed-line phone, Cel phone, Internet, Pay TV)  
updateServices('all');

