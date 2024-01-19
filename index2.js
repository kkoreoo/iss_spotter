const { nextISSTimesForMyLocation } = require('./iss_promised');
const { timeConverter } = require('./timeConverter');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    timeConverter(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work ", error.message);
  });

 