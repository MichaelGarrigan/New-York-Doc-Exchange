
import axios from 'axios';
import { DOC_KEY } from '../helpers/config.js';
 
module.exports = {
  searchController: (req, res) => {
    const [ lat, long ] = [ ...req.query.location ];
    const symptoms = req.query.symptoms;
    const specialties = req.query.specialties;
    const insurance = req.query.insurance;

    let url = '';

    if (!symptoms && !specialties && !insurance) {
      url = `https://api.betterdoctor.com/2016-03-01/doctors?location=${lat}%2C${long}%2C5&user_location=${lat}%2C${long}&sort=best-match-desc&skip=0&limit=25&user_key=${DOC_KEY}`;
    } else {

      let advanced = '';
      if (symptoms) advanced += `query=${symptoms}`;
      if (specialties) advanced += `specialty_uid=${specialties}`;
      if (insurance) advanced += `insurance_uid=${insurance}`;

      url = `https://api.betterdoctor.com/2016-03-01/doctors?${advanced}location=${lat}%2C${long}%2C5&user_location=${lat}%2C${long}&sort=best-match-desc&skip=0&limit=25&user_key=${DOC_KEY}`;
    }

    axios.get(url)
      .then(response => {
        res.status(200).send(response.data.data);
      })
      .catch(err => res.status(400).send(err));
  }
}