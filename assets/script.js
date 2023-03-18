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
