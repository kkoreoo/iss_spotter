/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const nextISSTimesForMyLocation = (callback) => {
  
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);

    // get's coordinates of user based of ip
    } else if (ip !== null) {
      fetchCoordsByIP(ip, (error, coords) => {
        if (error) {
          return callback(error, null);

          // get's flyover times based off of user's coords
        } else if (coords !== null) {
          fetchISSFlyOverTimes(coords, (error, times) => {
            if (error) {
              return callback(error, null);

            } else if (times !== null) {
              callback(null, times);
            }
          });
        }
      });
    }
  });
  
};


const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // if an error occurs due to invalid domain, user is offline, etc.
    if (error) {
      return callback(error, null);
    }

    // if non-200 status
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Reponse: ${body}`;
      return callback(Error(msg), null);
    }

    // will read if 200
    let ipAddress = JSON.parse(body).ip;
    callback(null, ipAddress);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  // requests Coords using Ip from fetchMyIp
  const api = `http://ipwho.is/${ip}`;
  request(api, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    //JSON.parse the data
    const data = JSON.parse(body);

    //If no error, but non-valid IP
    if (data.success === false) {
      const msg = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP: ${ip}`;
      return callback(msg, null);
    }
    //Valid IP
    const { latitude, longitude } = data;
    callback(null, { latitude, longitude});
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const latitude = String(coords.latitude);
  const longitude = String(coords.longitude);

  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  request(url, (error, response, body) => {

    // If an error occurs while fetching the request from the URL
    if (error) {
      return callback(error, null);
    }

    // If status code non-200
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when attempting to fetch from ${url}.`;
      return callback(Error(msg), null);
    }
    
    // If all goes well
    const flyOverTimes = JSON.parse(body).response;
    callback(null, flyOverTimes);
  });
};

module.exports = {nextISSTimesForMyLocation };