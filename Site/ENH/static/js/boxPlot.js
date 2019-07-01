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
            if(d.est_socio == 1) { rent[0].push(d.pago_renta); age[0].push('<= 30 Age') }
            if(d.est_socio == 2) { rent[1].push(d.pago_renta); age[1].push('<= 30 Age')}
            if(d.est_socio == 3) { rent[2].push(d.pago_renta); age[2].push('<= 30 Age')}
            if(d.est_socio == 4) { rent[3].push(d.pago_renta); age[3].push('<= 30 Age')}
        } else if (d.edad > 30 && d.edad <= 45) {
            if(d.est_socio == 1) { rent[0].push(d.pago_renta); age[0].push('> 30 & <= 45 Age')}
            if(d.est_socio == 2) { rent[1].push(d.pago_renta); age[1].push('> 30 & <= 45 Age')}
            if(d.est_socio == 3) { rent[2].push(d.pago_renta); age[2].push('> 30 & <= 45 Age')}
            if(d.est_socio == 4) { rent[3].push(d.pago_renta); age[3].push('> 30 & <= 45 Age')}
        } else if (d.edad > 45 && d.edad <= 60) {
            if(d.est_socio == 1) { rent[0].push(d.pago_renta); age[0].push('> 45 & <= 60 Age')}
            if(d.est_socio == 2) { rent[1].push(d.pago_renta); age[1].push('> 45 & <= 60 Age')}
            if(d.est_socio == 3) { rent[2].push(d.pago_renta); age[2].push('> 45 & <= 60 Age')}
            if(d.est_socio == 4) { rent[3].push(d.pago_renta); age[3].push('> 45 & <= 60 Age')}
        } else if (d.edad > 60 && d.edad <= 75) {
            if(d.est_socio == 1) { rent[0].push(d.pago_renta); age[0].push('> 60 & <= 75 Age')}
            if(d.est_socio == 2) { rent[1].push(d.pago_renta); age[1].push('> 60 & <= 75 Age')}
            if(d.est_socio == 3) { rent[2].push(d.pago_renta); age[2].push('> 60 & <= 75 Age')}
            if(d.est_socio == 4) { rent[3].push(d.pago_renta); age[3].push('> 60 & <= 75 Age')}
        } else if (d.edad > 76 && d.edad <= 100) {
            if(d.est_socio == 1) { rent[0].push(d.pago_renta); age[0].push('> 75 & <= 100 Age')}
            if(d.est_socio == 2) { rent[1].push(d.pago_renta); age[1].push('> 75 & <= 100 Age')}
            if(d.est_socio == 3) { rent[2].push(d.pago_renta); age[2].push('> 75 & <= 100 Age')}
            if(d.est_socio == 4) { rent[3].push(d.pago_renta); age[3].push('> 75 & <= 100 Age')}
        }
      });
    // Group by status
    var low = { y: rent[0], x: age[0], name: 'Low', marker: {color: Colors[0]}, type: 'box' };
    var medium = { y: rent[1], x: age[1], name: 'Medium', marker: {color: Colors[1]}, type: 'box' };
    var mediumHigh = { y: rent[2], x: age[2], name: 'Medium high', marker: {color: Colors[2]}, type: 'box' };
    var high = { y: rent[3], x: age[3], name: 'High', marker: {color: Colors[3]}, type: 'box' };
    
    // Add array
    var fields = [low, medium, mediumHigh, high];

    // Create Layout
    var layout = { yaxis: { title: 'Rent ($)', zeroline: false }, boxmode: 'group' };

    // Print in plotly
    Plotly.newPlot('boxPlot', fields, layout);

});