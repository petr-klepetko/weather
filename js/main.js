$(document).ready( () => {
    //http://api.openweathermap.org/data/2.5/weather?q=prague&appid=f3c99f0f47b9db5df7a2e0a2a36bff43&units=metric
    
    /**
     * get DOM elements
     */
    const countryDOM = $('#country');
    const cityDOM = $('#city');
    const latitudeDOM = $('#latitude');
    const longitudeDOM = $('#longitude');

    const cloudsDOM = $('#clouds');
    const tempDOM = $('#temp');
    const feels_likeDOM = $('#feels_like');
    const temp_minDOM = $('#temp_min');
    const temp_maxDOM = $('#temp_max');

    const sunriseDOM = $('#sunrise');
    const sunsetDOM = $('#sunset');
    const currentSunDOM = $('#currentSun');

    const currentTime = $('#currentTime');

    const goBackButton = $('#goBackButton');

    const regex = /(.+?\?city=)(.+)/;
    let cityFromUrl;

    if(window.location.href && regex.test(window.location.href)) {
        cityFromUrl = window.location.href.match(/(.+?\?city=)(.+)/)[2];
    }
    
    //console.log(cityFromUrl);
    if (cityFromUrl) {
        getWeatherByCity(cityFromUrl);
    }
    else {
        getWeatherDefault();
    }
    

    function getWeatherDefault() {
        const apiKey = 'f3c99f0f47b9db5df7a2e0a2a36bff43';
        const units = 'metric';
        const city = 'Prague'; 

        getWeather(city, apiKey, units);
    }

    function getWeatherByCity(cityFromUrl) {
        const apiKey = 'f3c99f0f47b9db5df7a2e0a2a36bff43';
        const units = 'metric';
        const city = cityFromUrl; 

        getWeather(city, apiKey, units);
    }

    function getWeather(city, apiKey, units){
        let url = createUrl(city, apiKey, units);
        
        $.get(url, function getWeatherCallback(data, status) {
            console.log(data);
            console.log(status);

            countryDOM.text(data.sys.country);
            cityDOM.text(data.name);
            latitudeDOM.text(data.coord.lat + '°');
            longitudeDOM.text(data.coord.lon + '°');

            cloudsDOM.text(data.clouds.all);
            tempDOM.text(data.main.temp + '°C');
            feels_likeDOM.text(data.main.feels_like + '°C');
            temp_minDOM.text(data.main.temp_min + '°C');
            temp_maxDOM.text(data.main.temp_max + '°C');

            sunriseDOM.text(getHumanTime(data.sys.sunrise));
            sunsetDOM.text(getHumanTime(data.sys.sunset));
            currentSunDOM.text(isDay(data.sys.sunrise, data.sys.sunset));

            currentTime.text(getHumanTime(new Date() / 1000));
        });

    }

    function createUrl(city, apiKey, units) {
        return url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    }

    goBackButton.on('click tap', function goBack() {
        window.location.replace('../ChooseCity');
    })
    
    function getHumanTime(unixTime) {
        let time = new Date(unixTime * 1000);
        let hours = '0' + time.getHours();
        hours = hours.substr(-2);
        let minutes = '0' + time.getMinutes();
        minutes = minutes.substr(-2);

        return hours + ':' + minutes;
    }

    function isDay(rise, set) {
        let now = Math.round(new Date().getTime() / 1000);
        rise = new Date(rise).getTime();
        set = new Date(set).getTime();
        console.log(set);
        console.log(rise);
        console.log(now);
        if (now > rise && now < set) {
            return 'Sun is up';
        }
        else {
            return 'Sun is set';
        }
    }

    

//end document    
});