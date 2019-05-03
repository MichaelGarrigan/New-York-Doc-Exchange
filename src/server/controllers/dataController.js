const axios = require('axios');
const { user_key } = require('../helpers/config.js');

const url = `https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${user_key}`;

module.exports = {
  dataController: (req, res) => {
    axios.get(url)
      .then(response => {
        
        res.send(JSON.stringify(response.data))
      })
      .catch(err => res.send(err))
  },

  callDocApi: () => {
    const url = `https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${user_key}`;
  }
}