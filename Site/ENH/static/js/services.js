// beginGraph Services (Computer, Fixed-line phone, Cel phone, Internet, Pay TV)  
function updateServices(level) {
   
    var url = "/services/" + level;

    d3.json(url).then(function(data){
  
        var key = ["yes_cnt", "no_cnt"];
        var labels = ["Yes", "No"];
        var colors = [];

        var svgArea = d3.select("#graph2").select("svg");
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
                width = 480 - margin.left - margin.right,
                height = 250 - margin.top - margin.bottom,
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
                    .attr("y", function(d) { return yScale(d.data.item); })
                    .attr("x", function(d) { return xScale(d[0]); })
                    .attr("height", yScale.bandwidth())
                    .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]) });
        
                layer.selectAll("text")
                    .data(function (d) {
                        return d;
                    })
                    .enter().append("text")
                    //.attr("class", "label")
                    .classed("label", true)
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
                    //.attr("class", "label")
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
            element: 'graph2'
        });
    });

    return false;
}
// endGraph Services (Computer, Fixed-line phone, Cel phone, Internet, Pay TV)  

// Call the function to present the Graph Services (Computer, Fixed-line phone, Cel phone, Internet, Pay TV)  
updateServices('all');
