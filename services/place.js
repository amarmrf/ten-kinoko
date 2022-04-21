const url = `${process.env.FSQ_URL}`

export default (axios) => ({
  getPlaces(query) {
    return axios.get(`${url}${query}`, {
      headers: {
        "Authorization": `${process.env.FSQ_KEY}`,
        "Accept": 'application/json',
      },  
    })
  },
})
