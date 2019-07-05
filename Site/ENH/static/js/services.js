// beginGraph Services Percentages (Computer, Fixed-line phone, Cel phone, Internet, Pay TV)  
function updateServices(level) {
   
    var url = "/services/" + level;
    // load and handle the data
    d3.json(url, function (data) {
      
      var lcolors = [];
      var svgArea = d3.select("#percServ").select("svg");
      if (!svgArea.empty()) {
          svgArea.remove();
        }
  
      d3.selectAll("a.btn").classed("active",false);
      switch(level)
          {
          case "low": 
              lcolors = ['#F39C12','#fcebcf'];
              d3.select("a.btn.btn-outline-warning").classed("active",true);
              break;
          case "mdlow":
              lcolors = ['#3498DB',' #bedef3'];
              d3.select("a.btn.btn-outline-info").classed("active",true);
              break;
          case "mdhigh":
              lcolors = ['#95a5a6',' #c7d0d1'];
              d3.select("a.btn.btn-outline-secondary").classed("active",true);
              break;
          case "high":           
              lcolors = ['#008080','#8ef0dd'];
              d3.select("a.btn.btn-outline-success").classed("active",true);
              break;
          default:
              lcolors = ['#7b99b7','#bdccdb'];
              d3.select("a.btn.btn-outline-primary").classed("active",true);
      }
  
      var margin = {top: 20, right: 20, bottom: 30, left: 100},
          width = 500 - margin.left - margin.right,
          height = 320 - margin.top - margin.bottom;
  
      var xscale = d3.scaleBand().rangeRound([0, width]).padding(0.1);
      var yscale = d3.scaleLinear().rangeRound([height, 0]);
      var colors = d3.scaleOrdinal().range(lcolors);
  
      var xaxis = d3.axisBottom(xscale);
      var yaxis =  d3.axisLeft(yscale).tickFormat(d3.format(".0%"));
  
      var svg = d3.select("#percServ").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
      // rotate the data
      var categories = d3.keys(data[0]).filter(function(key) { return key !== "Absolutes"; });
      var parsedata = categories.map(function(name) { return { "Absolutes": name }; });
  
      data.forEach(function(d) {
          parsedata.forEach(function(pd) {
              pd[d["Absolutes"]] = d[pd["Absolutes"]];
          });
      });
      
      // map column headers to colors (except for 'Absolutes' and 'Base')
      colors.domain(d3.keys(parsedata[0]).filter(function(key) { return key !== "Absolutes" && key !== "Base"; }));
      
      // add a 'responses' parameter to each row that has the height percentage values for each rect
      parsedata.forEach(function(pd) {
          var y0 = 0;
          // colors.domain() is an array of the column headers (text)
          // pd.responses will be an array of objects with the column header
          // and the range of values it represents
          pd.responses = colors.domain().map(function(response) {
              var responseobj = {response: response, y0: y0, yp0: y0};
              y0 += +pd[response];
              responseobj.y1 = y0;
              responseobj.yp1 = y0;
              return responseobj;
          });
          // y0 is now the sum of all the values in the row for this category
          // convert the range values to percentages
          pd.responses.forEach(function(d) { d.yp0 /= y0; d.yp1 /= y0; });
          // save the total
          pd.totalresponses = pd.responses[pd.responses.length - 1].y1;
      });
      
      // ordinal-ly map categories to x positions
      xscale.domain(parsedata.map(function(d) { return d.Absolutes; }));
      
      // add the x axis and rotate its labels
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xaxis);
  
      // add the y axis
      svg.append("g")
          .attr("class", "y axis")
          .call(yaxis);
      
      // create svg groups ("g") and place them
      var category = svg.selectAll(".category")
          .data(parsedata)
          .enter().append("g")
          .attr("class", "category")
          .attr("transform", function(d) { return "translate(" + xscale(d.Absolutes) + ",0)"; });
      
      // draw the rects within the groups
      category.selectAll("rect")
          .data(function(d) { return d.responses; })
          .enter().append("rect")
          .attr("width", xscale.bandwidth())
          .attr("y", height)
          .attr("height", 0)
          .transition()
          .delay(200)
          .duration(500)
          .attr("y", function(d) { return yscale(d.yp1); })
          .attr("height", function(d) { return yscale(d.yp0) - yscale(d.yp1); })
          .style("fill", function(d) { return colors(d.response); });
  
      category.selectAll("text")
          .data(function(d) { return d.responses; })
          .enter().append("text")
          .attr("width", xscale.bandwidth())
          .classed("label", true)
          .attr("y", height)
          .attr("height", 0)
          .transition()
          .delay(350)
          .duration(650)
          .attr("x", xscale.bandwidth()/3)
          .attr("y", function(d) { return yscale(d.yp1) + 20; })
          .text(function (d) { 
                  if (d.yp0 === 0) {
                      return (parseFloat(d.yp1 * 100).toFixed(0)+"%");
                  }
             })  
          .style("fill", '#ffffff');
  
      // position the legend elements
      var legend = svg.selectAll(".legend")
          .data(colors.domain())
          .enter().append("g")
          .attr("class", "label");
  
      legend.append("rect")
          .attr("x", function(d, i) { return 100 + (i * 100); })
          .attr("y", -20)
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", colors);
  
      legend.append("text")
          .attr("x", function(d, i) { return 120 + (i * 100); })
          .attr("y", -15)
          .attr("dy", ".35em")
          .style("text-anchor", "start")
          .text(function(d) { return d; });
      
      // animation
      d3.selectAll("input").on("change", handleFormClick);
  
      function handleFormClick() {
      
          if (document.getElementById('bypercent').checked) {
              d3.select("#txtp").classed("text-secondary", false).classed("text-info", true);
              d3.select("#txtn").classed("text-secondary", true).classed("text-info", false);
              transitionPercent();
          } else {
              d3.select("#txtp").classed("text-secondary", true).classed("text-info", false);
              d3.select("#txtn").classed("text-secondary", false).classed("text-info", true);
               transitionCount();
          }
          updateStates(level);
      }
      
      // transition to 'percent' presentation
      function transitionPercent() {
          // reset the yscale domain to default
          yscale.domain([0, 1]);
  
          svg.selectAll(".category")
              .selectAll("rect")
              .attr("y", height)
              .attr("height", 0)
              .transition()
              .duration(400)
              .attr("y", function(d) { return yscale(d.yp1); })
              .attr("height", function(d) { return yscale(d.yp0) - yscale(d.yp1); })
              .style("fill", function(d) { return colors(d.response); });
  
  
          category.selectAll("text")
              .attr("x", xscale.bandwidth()/3)
              .attr("y", height)
              .attr("height", 0)
              .transition()
              .delay(350)
              .duration(650)
              .attr("y", function(d)  { return yscale(d.yp1) + 20; })
              .text(function (d) { 
                  if (d.yp0 === 0) {
                      return (parseFloat(d.yp1 * 100).toFixed(0)+"%");
                  } 
              })  
              .style("fill", '#ffffff');
      
  
          // change the y-axis
          // set the y axis tick format
          yaxis.tickFormat(d3.format(".0%"));
          svg.selectAll(".y.axis").call(yaxis);
      }
      
      // transition to 'count' presentation
      function transitionCount() {
          // set the yscale domain
          yscale.domain([0, d3.max(parsedata, function(d) { return d.totalresponses; })]);
  
          svg.selectAll(".category")
          .selectAll("rect")
          .attr("y", height)
          .attr("height", 0)
          .transition()
          .duration(150)
          .attr("y", function(d) { return this.getBBox().y + this.getBBox().height - (yscale(d.y0) - yscale(d.y1)) })
          .attr("height", function(d) { return yscale(d.y0) - yscale(d.y1); })
          .transition()
           .delay(250)
          .duration(250)
          //.ease("bounce")
          .attr("y", function(d) { return yscale(d.y1); })
          .style("fill", function(d) { return colors(d.response); });
  
          // change the y-axis
          // set the y axis tick format
          yaxis.tickFormat(d3.format(""));   //.2s
  
          category.selectAll("text")
          .attr("x", xscale.bandwidth()/4 - 7)
          .attr("y", height)
          .attr("height", 0)
          .transition()
          .delay(350)
          .duration(650)
          .attr("y", function(d) { return yscale(d.y1) + 20; })
          .text(function (d) { 
                  if (d.y0 === 0) {
                      var parts = d.y1.toFixed(0).split(".");
                      var num = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + 
                          (parts[1] ? "." + parts[1] : "");
                      return (num);
                  }
             })  
          .style("fill", '#ffffff');
  
          svg.selectAll(".y.axis").call(yaxis);
      }
  
      d3.select(self.frameElement).style("height", (height + margin.top + margin.bottom) + "px");	
  
      if (!document.getElementById('bypercent').checked) {
          transitionCount();
      }
  
      updateStates(level);
  
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
      var type = "";
      var column = "";
      if (document.getElementById('bypercent').checked) {
          type ="percent";
          column = "Yes Percent";
      }
      else {
          type = "count";
          column = "Yes Counter";
      }
      var url = "/servicesByState/" + level + "/" + type; 
  
      d3.json(url, function (data) {
  
        var myChart = new dimple.chart(svg, data);
        myChart.setBounds(60, 30, 500, 255)
        var x = myChart.addCategoryAxis("x", ["Services", "State"]);
        var myAxis = myChart.addMeasureAxis("y", column);
        if (type === "count") {
            myAxis.tickFormat = d3.format("");
        }
        else {
          myAxis.tickFormat = d3.format(".0f");
        }
        
        x.addOrderRule("Services");
        x.addGroupOrderRule("Services", "State");
  
        var myLegend = myChart.addLegend(100, 1, 510, 20, "left");
        myLegend.verticalPadding = 3;
        myLegend.fontFamily = "sans-serif";
        
         var s = myChart.addSeries("State", dimple.plot.bar);
          s.stacked = false;
        s.addOrderRule("State");
  
        myChart.draw();
      });
  
      return false;
  }
  // endGraph Services by State (Computer, Fixed-line phone, Cel phone, Internet, Pay TV)  
  
// Call the function to present the Graphs Services (Computer, Fixed-line phone, Cel phone, Internet, Pay TV)  
updateServices('all');
  