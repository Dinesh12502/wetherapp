const https = require('https');
const apiKey = "3459cdaecaa1a0c27af29933872fa3dd";

module.exports.home = function(req, res){
    res.clearCookie('city');
    res.render("home");
}

module.exports.weather = function(req, res){
    console.log(req.cookies);
    res.cookie('city', req.body.city);
    console.log(req.cookie);
    var temp_city = req.body.city.trim();
    var city = "";
    var prevLetter = temp_city[0];
    if(prevLetter != ' '){
        city+=prevLetter;
    }
    for(let i = 1; i<temp_city.length; i++){
        if(temp_city[i] == " " && prevLetter == " "){
            continue;
        }
        else{
            city+=temp_city[i];
            prevLetter = temp_city[i];
        }
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    var data;
    https.get(url, (resp) => {
        if(resp.statusCode>=400 && resp.statusCode<=499){
            return res.render("error", {
                resp: `${resp.statusCode}`,
                matter: `The search for the city ' ${city} ' has not found!`
            });
        }
        else if(resp.statusCode>=500 && resp.statusCode<=599){
            return res.render("error",{
                resp: `${resp.statusCode}`,
                matter: `Internal error has occured!! Please try again after sometime!`
            })
        }
        console.log('statusCode:', res.statusCode);
        resp.on('data', (d) => {
            data = JSON.parse(d);
            // console.log(data);
            function tempCel(temp){
                temp = temp-273.15;
                return temp;
            }
            var kelvin = 273.15;
            var weatherData = {
                temp: Math.round(data.main.temp-kelvin),
                feels_like : Math.round(data.main.feels_like-kelvin),
                max_temp : Math.round(data.main.temp_max-kelvin),
                min_temp : Math.round(data.main.temp_min-kelvin),
                pressure : data.main.pressure,
                humidity : data.main.humidity,
                wind_speed: data.wind.speed, 
                city : data.name,
                icon : data.weather[0].icon,
                matter: data.weather[0].main,
                description :data.weather[0].description,
                countryCode: data.sys.country,
            }
            console.log(weatherData);
            return res.render("weather", {
                resp : weatherData
            });
                
        });
    }).on('error', (e) => {
        console.error(e);
    });




}

module.exports.weatherget = function(req, res){
    console.log(req.cookies);
    var city = req.cookies.city;
    if(!req.cookies || !req.cookies.city){
        return res.render('home');
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    console.log(url);
    var data;
    https.get(url, (resp) => {
        if(resp.statusCode>=400 && resp.statusCode<=499){
            return res.render("error", {
                resp: `${resp.statusCode}`,
                matter: `The search for the ${city} has not found!`
            });
        }
        else if(resp.statusCode>=500 && resp.statusCode<=599){
            return res.render("error",{
                resp: `${resp.statusCode}`,
                matter: `Internal error has occured!! Please try again after sometime!`
            })
        }
        console.log('statusCode:', res.statusCode);
        resp.on('data', (d) => {
            data = JSON.parse(d);
            function tempCel(temp){
                temp = temp-273.15;
                return temp;
            }
            var kelvin = 273.15;
            var weatherData = {
                temp: Math.round(data.main.temp-kelvin),
                feels_like : Math.round(data.main.feels_like-kelvin),
                max_temp : Math.round(data.main.temp_max-kelvin),
                min_temp : Math.round(data.main.temp_min-kelvin),
                pressure : data.main.pressure,
                humidity : data.main.humidity,
                wind_speed: data.wind.speed, 
                city : data.name,
                icon : data.weather[0].icon,
                matter: data.weather[0].main,
                description :data.weather[0].description,
                countryCode: data.sys.country,
            }
            console.log(weatherData);
            return res.render("weather", {
                resp : weatherData
            });
                
        });
    }).on('error', (e) => {
        console.error(e);
    });
}