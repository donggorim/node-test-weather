const axios = require('axios')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=84ffa68264af4947c21b4a26711c9e6d&query=${latitude},${longitude}&units=m`

    axios.get(url)
        .then(({ data }) => {
            if (data.error) {
                callback('Unable to find location', undefined)
            } else {
                const descriptions = data.current.weather_descriptions[0]
                const temperature = data.current.temperature
                const feelslike = data.current.feelslike
                const humidity = data.current.humidity

                callback(undefined, {
                    descriptions,
                    temperature,
                    feelslike,
                    forecast: `${descriptions}. It is currently ${temperature} degress out. It feels like ${feelslike} dgress out. The humidity is ${humidity} percent.`
                })
            }
        })
        .catch((error) => {
            callback('Unable to connect to weather services!', undefined)
        })
        .finally(() => {})
}

module.exports = forecast