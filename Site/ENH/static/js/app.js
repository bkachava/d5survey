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


// Invoca el metodo Actualiza hora cada segundo
setInterval(ActualizarHora,1000);

