$(".forecast").hide();
$(".current-weather").hide();
getSearchLists();

var apiKey = "7df541090361c190f5ec65dbaea6bf16";

function fetchWeatherForCity(city) {
    $(".current-weather").show();
    $(".forecast").show();

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + 
                    city + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function (data) {

        currentForeCast(city);
        fiveDayForecast(data);
        $("#search-input").val("");
    })
}

// Function for 5 day forecast
function fiveDayForecast(data) {
    $("#five-day-forecast").empty();
    for (var day=0; day<data.list.length; day++) {
        var date = data.list[day].dt_txt.split(' ')[0];
        var time = data.list[day].dt_txt.split(' ')[1];
        if (time === "15:00:00") {

            var icon = data.list[day].weather[0].icon;
            var temperature = data.list[day].main.temp;
            var fahrenheit = ((temperature - 273.15) * 1.80 + 32).toFixed(2);
            var wind = data.list[day].wind.speed;
            var humidity = data.list[day].main.humidity;

            var appendBlock = 
                `<div class="card col-md-2 ml-4 bg-primary text-white">
                    <div class="card-body p-3 forecast-body">
                        <h4 class="card-title">${date}</h4>
                        <img src="https://openweathermap.org/img/w/${icon}.png"></img>
                        <p class="card-text forecast-temp">Temperature: ${fahrenheit}°F</p>
                        <p class="card-text forecast-wind">Wind Speed: ${wind}MPH</p>
                        <p class="card-text forecast-humidity">Humidity: ${humidity}%</p>
                    </div>
                </div>`;

            $("#five-day-forecast").append(appendBlock);
        }
    }
}

// Current forecast function