// Open form to fill survey
function openForm() {
    document.getElementById("form").style.display = "block";
  }
  // Close form to fill survey
  function closeForm() {
    document.getElementById("form").style.display = "none";
  }
// Create PopUp to send e-mail
function PopUp() {
    // Save image
    //canvasImg();
    // Create sweet message
  swal({
      title: "Are you sure that you want to create a report?",
      text: "The information contained in these documents is confidential ",
      icon: "warning",
      buttons: true,
      textAlign: "center",
      dangerMode: true,
    })
    .then((willCreate) => {
      // Conditional 
      if (willCreate) {
          swal("Insert your e-mail:", {
              content: "input",
            })
            .then((value) => {            
              scatter = d3.select('#png-export').attr('src').replace("data:image/png;base64", "");
              boxPlot = d3.select('#jpg-export').attr('src').replace("data:image/png;base64,", "");
              sendMail(value, scatter, boxPlot );
              swal(`Your report was sending by e-mail! ${value}`, {
                  icon: "success",
                });
            });
      } else {
        swal("You don't create the report!");
      }
    });
  }
   
// Send email
function sendMail(correo, gScatter, sBoxPlot) {
    $.post("/rent/SendMail",
    {
      email: correo,
      boxPlot: sBoxPlot,
      scatter: gScatter
    },
    function(data,status){
  
    });
  }
  
// Create variables X and Y
var rent = [];
var age = [];

// Clean and inicialize variables
for(var i = 0; i < 20;i++){
    rent[i] = []
    age[i] = []
}

// Create array with colors
var Colors = ['#F39C12','#3498DB','#95a5a6','#008080'];

// load data
d3.json("/rent/ByAge", function(error, data) { 
    // Analize data row by row
    data.forEach(function (d) {
        if(d.edad <= 30) {
            if(d.est_socio == 1) { rent[0].push(d.pago_renta); age[0].push('<= 30 Years') }
            if(d.est_socio == 2) { rent[1].push(d.pago_renta); age[1].push('<= 30 Years')}
            if(d.est_socio == 3) { rent[2].push(d.pago_renta); age[2].push('<= 30 Years')}
            if(d.est_socio == 4) { rent[3].push(d.pago_renta); age[3].push('<= 30 Years')}
        } else if (d.edad > 30 && d.edad <= 45) {
            if(d.est_socio == 1) { rent[0].push(d.pago_renta); age[0].push('> 30 & <= 45 Years')}
            if(d.est_socio == 2) { rent[1].push(d.pago_renta); age[1].push('> 30 & <= 45 Years')}
            if(d.est_socio == 3) { rent[2].push(d.pago_renta); age[2].push('> 30 & <= 45 Years')}
            if(d.est_socio == 4) { rent[3].push(d.pago_renta); age[3].push('> 30 & <= 45 Years')}
        } else if (d.edad > 45 && d.edad <= 60) {
            if(d.est_socio == 1) { rent[0].push(d.pago_renta); age[0].push('> 45 & <= 60 Years')}
            if(d.est_socio == 2) { rent[1].push(d.pago_renta); age[1].push('> 45 & <= 60 Years')}
            if(d.est_socio == 3) { rent[2].push(d.pago_renta); age[2].push('> 45 & <= 60 Years')}
            if(d.est_socio == 4) { rent[3].push(d.pago_renta); age[3].push('> 45 & <= 60 Years')}
        } else if (d.edad > 60 && d.edad <= 75) {
            if(d.est_socio == 1) { rent[0].push(d.pago_renta); age[0].push('> 60 & <= 75 Years')}
            if(d.est_socio == 2) { rent[1].push(d.pago_renta); age[1].push('> 60 & <= 75 Years')}
            if(d.est_socio == 3) { rent[2].push(d.pago_renta); age[2].push('> 60 & <= 75 Years')}
            if(d.est_socio == 4) { rent[3].push(d.pago_renta); age[3].push('> 60 & <= 75 Years')}
        } else if (d.edad > 76 && d.edad <= 100) {
            if(d.est_socio == 1) { rent[0].push(d.pago_renta); age[0].push('> 75 & <= 100 Years')}
            if(d.est_socio == 2) { rent[1].push(d.pago_renta); age[1].push('> 75 & <= 100 Years')}
            if(d.est_socio == 3) { rent[2].push(d.pago_renta); age[2].push('> 75 & <= 100 Years')}
            if(d.est_socio == 4) { rent[3].push(d.pago_renta); age[3].push('> 75 & <= 100 Years')}
        }
      });
    // Group by status
    var low = { y: rent[0], x: age[0], name: 'Low', marker: {color: Colors[0]}, type: 'box' };
    var medium = { y: rent[1], x: age[1], name: 'Medium low', marker: {color: Colors[1]}, type: 'box' };
    var mediumHigh = { y: rent[2], x: age[2], name: 'Medium high', marker: {color: Colors[2]}, type: 'box' };
    var high = { y: rent[3], x: age[3], name: 'High', marker: {color: Colors[3]}, type: 'box' };
    
    // Add array
    var fields = [low, medium, mediumHigh, high];

    // Create Layout
    var layout = { yaxis: { title: 'Rent ($)', zeroline: false }, boxmode: 'group' };

    // Print in plotly
    Plotly.newPlot('boxPlot', fields, layout);

    // Save image
    var img_jpg = d3.select('#jpg-export');
    Plotly.newPlot('boxPlot', fields, layout).then(
        function(gd)
        {
            Plotly.toImage(gd,{height:600,width:1000})
               .then(
                   function(url)
               {
                   img_jpg.attr("src", url);
                   return Plotly.toImage(gd,{format:'jpeg',height:400,width:400});
               }
        )
    });
});