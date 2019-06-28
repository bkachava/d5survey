// #region Reloj
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function ActualizarHora() {
    var today = new Date();
    var hr = today.getHours();
    var min = checkTime(today.getMinutes());
    var sec = checkTime(today.getSeconds());
    ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;
    
    hr = checkTime(hr);
    document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
    
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
    document.getElementById("date").innerHTML = date;
}

// #endregion

// beginGraph Services (Computer, Fixed-line phone, Cel phone, Internet, Pay TV)  
function updateServices(level) {
   
    //NOTA: los data se reemplazaran con los datos que se obtengan de la base de datos
    
   var data = [];
    var key = ["Yes", "No"];
    var colors = [];

    var svgArea = d3.select("#graph2").select("svg");
    if (!svgArea.empty()) {
        svgArea.remove();
    }
    d3.selectAll("a.btn").classed("active",false);
    switch(level)
    {
    case "low": 
        data = [{"service":"Pay TV","total":100,"Yes":29,"No":71},
            {"service":"Cel phone","total":100,"Yes":73,"No":27},        
            {"service":"Fixed-line phone","total":100,"Yes":11,"No":89},
            {"service":"Internet","total":100,"Yes":7,"No":93},
            {"service":"Computer","total":100,"Yes":9,"No":91}
        ];
        colors = ['#F39C12','#fcebcf'];
        d3.select("a.btn.btn-outline-warning").classed("active",true);
        break;
    case "mdlow":
        data = [{"service":"Pay TV","total":100,"Yes":43,"No":57},
            {"service":"Cel phone","total":100,"Yes":89,"No":11},        
            {"service":"Fixed-line phone","total":100,"Yes":34,"No":66},
            {"service":"Internet","total":100,"Yes":38,"No":62},
            {"service":"Computer","total":100,"Yes":31,"No":69}
        ];
        colors = ['#3498DB',' #d4e9f7'];
        d3.select("a.btn.btn-outline-info").classed("active",true);
        break;
    case "mdhigh":
        data = [{"service":"Pay TV","total":100,"Yes":57,"No":43},
            {"service":"Cel phone","total":100,"Yes":94,"No":6},        
            {"service":"Fixed-line phone","total":100,"Yes":65,"No":35},
            {"service":"Internet","total":100,"Yes":70,"No":30},
            {"service":"Computer","total":100,"Yes":58,"No":42}
        ];
        colors = ['#95a5a6',' #c7d0d1'];
        d3.select("a.btn.btn-outline-secondary").classed("active",true);
        break;
    case "high":           
        data = [{"service":"Pay TV","total":100,"Yes":72,"No":28},
            {"service":"Cel phone","total":100,"Yes":97,"No":3},        
            {"service":"Fixed-line phone","total":100,"Yes":74,"No":26},
            {"service":"Internet","total":100,"Yes":82,"No":18},
            {"service":"Computer","total":100,"Yes":76,"No":24}
        ];
        colors = ['#008080','#8ef0dd'];
        d3.select("a.btn.btn-outline-success").classed("active",true);
        break;
    default:
        data = [{"service":"Pay TV","total":100,"Yes":46,"No":54},
            {"service":"Cel phone","total":100,"Yes":88,"No":12},        
            {"service":"Fixed-line phone","total":100,"Yes":40,"No":60},
            {"service":"Internet","total":100,"Yes":43,"No":57},
            {"service":"Computer","total":100,"Yes":36,"No":64}
            ];
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
                yScale.domain(data.map(function(d) { return d.service; }));
                xScale.domain([0, 100]).nice();
   
            var layer = svg.selectAll(".layer")
                .data(layers)
                .enter().append("g")
                .attr("class", "layer")
                .style("fill", function(d, i) { return color(i); });
    
              layer.selectAll("rect")
                  .data(function(d) { return d; })
                .enter().append("rect")
                  .attr("y", function(d) { return yScale(d.data.service); })
                  .attr("x", function(d) { return xScale(d[0]); })
                  .attr("height", yScale.bandwidth())
                  .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]) });
    
               layer.selectAll("text")
                  .data(function (d) {
                      return d;
                  })
                  .enter().append("text")
                  .attr("class", "label")
                  .attr("y", function (d) {
                      return yScale(d.data.service) + 20;
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
                .attr("class", "label")
                .attr("y", -3)
                .attr("x", function (d, i) {
                    return (i * (width /2)) + 25;
                })

                .text(function (d, i) {
                    return key[i] +  "(%)";
                });
        }
    }
    
    initStackedBarChart.draw({
        data: data,
        key: key,
        element: 'graph2'
    });
    
    return false;
}
// endGraph Services (Computer, Fixed-line phone, Cel phone, Internet, Pay TV)  

// Invoca el metodo Actualiza hora cada segundo
setInterval(ActualizarHora,1000);

// Call the function to present the Graph Services (Computer, Fixed-line phone, Cel phone, Internet, Pay TV)  
updateServices('all');

