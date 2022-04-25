const url = `${process.env.WEATHER_URL}`

export default (axios, config) => ({
  getWeather(query) {
    return axios.get(`${config.baseURL}?appid=${process.env.WEATHER_KEY}${query}`)
  },
})
