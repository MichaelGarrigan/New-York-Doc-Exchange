const axios = require('axios');
const { API_KEY_MAP } = require('../helpers/config.js');

/*********** About Google Geocoding API ******************

google geocoding api must have an address formatted like:
address=1600+Amphitheatre+Parkway,+Mountain+View,+CA

It can take any city name, state, or physical address and convert 
it to latitude and longitude.
*/

/*
@name: formatUserStringLocation

@param: {String} searchString : the result of the location input box as the user has entered it 
@return {String}              : the parsed and formated string of elements now ready for the api
*/

const formatUserStringLocation = searchString => {
  let splitString = searchString.split(',');
  let replaceSpaces = [];

  splitString.forEach(str => {
    replaceSpaces.push(str.replace(/\s/g, '+'));
  });
  
  return replaceSpaces.join(',');
};

module.exports = {
  locationController: (req, res) => {
    const formatted = formatUserStringLocation(req.query.location);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY_MAP}&address=`;

    axios.get(`${url}${formatted}`)
    .then( response => {
      if (response.data.status === 'OK') {
        let lat = response.data.results[0].geometry.location.lat;
        let long = response.data.results[0].geometry.location.lng;
        res.status(200).send([lat, long]);
      } else {
        res.status(200).send(null);
      }
    })
    .catch((err) => {res.status(200).send(err)});
  }
}