const url = `${process.env.WEATHER_URL}`

export default (axios, config) => ({
  getWeather(query) {
    return axios.get(`${config.weatherURL}?appid=${config.weatherKey}${query}`)
  },
})
