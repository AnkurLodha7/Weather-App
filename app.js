var APPID = "0897f70f85d80582c6f7855807232169" ;
var temp;
var loc;
var icon;
var humidity;
var wind;


//function updateByZip(cityname) {
  //  var url = "http://api.openweathermap.org/data/2.5/weather?q={city name}"}

function updateByZip(zip)
{
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "zip=" + zip +
        "&APPID=" + APPID ;
sendRequest(url);
};

function updateByGeo(lat,lon)
{
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
            "lat=" + lat+
            "&lon=" + lon +
            "&APPID=" + APPID;
    sendRequest(url);
}

function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    // when we receive response(xmlhttp.http.onreadystatechange).we want to execute a function(callback function)
    xmlhttp.onreadystatechange= function () {
        // if xmlhttp.request has a ready state ==4 ,which means it has received an object and
        // xmlhttp.status = 200, which the request was received successfully.(4==received  and 200 == success)
        if(xmlhttp.readyState ==4 && xmlhttp.status == 200)
        {
            // parse response text to JSON
            var data = JSON.parse(xmlhttp.responseText);
            console.log(data);

            /*
             API respond:

             {"coord":{"lon":-122.09,"lat":37.39},
             "sys":{"type":3,"id":168940,"message":0.0297,"country":"US","sunrise":1427723751,"sunset":1427768967},
             "weather":[{"id":800,"main":"Clear","description":"Sky is Clear","icon":"01n"}],
             "base":"stations",
             "main":{"temp":285.68,"humidity":74,"pressure":1016.8,"temp_min":284.82,"temp_max":286.48},
             "wind":{"speed":0.96,"deg":285.001},
             "clouds":{"all":0},
             "dt":1427700245,
             "id":0,
             "name":"Mountain View",
             "cod":200}
             */


            var weather = {};
            // data(response) has a filed called weather which is a array.
            // We get multiple locations but since we are dealing with a single location we want to focus on [0] index
            // we want id so that we can get the number which is going to genereate the correct icon

            weather.icon = data.weather[0].icon;
            weather.humidity = data.main.humidity;
            weather.temp = k2f(data.main.temp);
            weather.wind = data.wind.speed;
            weather.description = data.weather[0].description;
            weather.loc = data.name;

            update(weather)
        }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send()
    };

function k2f(kelvin_value) {
    return Math.round((kelvin_value *(9/5))-459.67)
};


function update (weather) {
    wind.innerHTML = weather.wind;
    temp.innerHTML = weather.temp;
    humidity.innerHTML = weather.humidity;
    loc.innerHTML= weather.loc;
    icon.src ="http://openweathermap.org/img/w/"+ weather.icon + ".png";
    description.innerHTML= weather.description;

}

function showPosition(position) {
    updateByGeo(position.coords.latitude, position.coords.longitude);
}

window.onload = function () {
    temp = document.getElementById('temperature');
    loc = document.getElementById('location');
    icon = document.getElementById('icon');
    humidity = document.getElementById('humidity');
    wind = document.getElementById('wind');
    description=document.getElementById('description')

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else
    {
       var zip = window.prompt("Unable to track your Location, Enter your Zipcode");
        updateByZip(zip);
    }




};
