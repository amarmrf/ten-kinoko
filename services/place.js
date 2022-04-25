export default (axios, config) => ({
  getPlaces(query) {
    return axios.get(`${config.placeURL}${query}`, {
      headers: {
        "Authorization": `${config.placeKey}`,
        "Accept": 'application/json',
      },  
    })
  },
})
