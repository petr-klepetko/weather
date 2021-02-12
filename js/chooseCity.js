$(document).ready( () => {
    //http://api.openweathermap.org/data/2.5/weather?q=prague&appid=f3c99f0f47b9db5df7a2e0a2a36bff43&units=metric
    
    /**
     * get DOM elements
     */
    const cityTextAreaDOM = $('#cityTextArea');
    const confirmButtonDOM = $('#confirmButton');
    
    confirmButtonDOM.on('click tap', function sendCity() {
        console.log(cityTextAreaDOM.val());
        window.location.replace('../WeatherDetail/?city=' + cityTextAreaDOM.val());
    });

    $(document).keypress(function (event) {
        //console.log(event.keyCode);
        if (event.keyCode === 13) {
            event.preventDefault();
            confirmButtonDOM.click();
        }
    });
//end document    
});