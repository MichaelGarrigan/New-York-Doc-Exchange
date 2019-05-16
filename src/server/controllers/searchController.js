
import axios from 'axios';
import { user_key } from '../helpers/config.js';
 
module.exports = {
  searchController: (req, res) => {
    console.log('searchController: ', req.query);
    const [ lat, long ] = [ ...req.query.location ];
    // let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${term}&location=${lat}%2C%20${long}%2C100&user_location=${lat}%2C%20${long}&sort=rating-desc&skip=0&limit=25&user_key=${user_key}`;

    const url = `https://api.betterdoctor.com/2016-03-01/doctors?location=${lat}%2C${long}%2C5&user_location=${lat}%2C${long}&sort=best-match-asc&skip=0&limit=25&user_key=${user_key}`;

    axios.get(url)
      .then(response => {
        res.status(200).send(response.data.data);
      })
      .catch(err => res.status(400).send(err));
    
  }
}