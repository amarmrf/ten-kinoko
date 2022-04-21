const url = `${process.env.WEATHER_URL}`

export default (axios) => ({
  getWeather(query) {
    return axios.get(`${url}${query}`)
  },
})
