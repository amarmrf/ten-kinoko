export default (axios, config) => ({
  getWeather(query) {
    return axios.get(`${config.weatherURL}?appid=${config.weatherKey}${query}`)
  },
})
