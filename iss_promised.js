const request = require('request-promise-native');

const fetchMyIp = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIp = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const longitude = JSON.parse(body).longitude;
  const latitude = JSON.parse(body).latitude;
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIp()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const times = JSON.parse(data).response;
      return times;
    });
};

module.exports = { nextISSTimesForMyLocation };