console.log('Script file loaded on Client-side !');

const weather_form = document.querySelector('form');
const search_location = document.querySelector('#search-value');
const weather_result = document.querySelector('.weather-info');
const img_loading = 'https://loading.io/spinners/rolling/lg.curve-bars-loading-indicator.gif';

weather_form.addEventListener('submit',(e) => {
    e.preventDefault(); // prevents page reload
    
    weather_result.style.display = 'block';
    weather_result.innerHTML = '<img src="'+img_loading+'">'

    const server_url = '/weather?address='+search_location.value;
    fetch(server_url).then(response => {
        response.json().then(data => {
            if(data.error) {
                weather_result.innerHTML = data.error;
            }else {
                weather_result.innerHTML = 'It is currently '+data.temperature+' degrees out there in '+data.location+'. There is a '+data.rainProbability+'% chance of rain.';
                //console.log('It is currently '+data.temperature+' degrees out there in '+data.location+'. There is a '+data.rainProbability+'% chance of rain.');
            }
        });
    });
});


// fetch('http://localhost:3000/weather?address=Thane').then(response => {
//     response.json().then(data => {
//         //console.log(data);
//         if(data.error) {
//             console.log(data.error);
//         }else {
//             console.log('It is currently '+data.temperature+' degrees out there in '+data.location+'. There is a '+data.rainProbability+'% chance of rain.');
//         }
//     });
// });