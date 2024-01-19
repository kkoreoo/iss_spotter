const { nextISSTimesForMyLocation } = require('./iss');
const { timeConverter } = require('./timeConverter');


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didin't work!", error);
  }

  //success, print out the details
  timeConverter(passTimes);
});


