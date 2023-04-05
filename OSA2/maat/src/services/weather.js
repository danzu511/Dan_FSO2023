import axios from 'axios';

const getWeather = (api_key, country) => {
    let lat;
    let lon;
 //check if coordinates for capital exists. United states minor outlying islands caused a crash without this as the JSON didnt have latlng like the others
    if(country.capitalInfo.latlng){
        lat = country.capitalInfo.latlng[0]
        lon = country.capitalInfo.latlng[1]
    }
    else{
        lat = country.latlng[0]
        lon = country.latlng[1]
    }

    const apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    const request = axios.get(apiCall)
    console.log(`getting weather for latitude: ${lat}, longitude: ${lon}`)
    return request.then(response => response.data)
                    .catch(error => {
                    console.log(error)
                    return null;
                    });
}

export default { getWeather }
