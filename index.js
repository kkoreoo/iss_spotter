const { nextISSTimesForMyLocation } = require('./iss');

const timeConverter = (passTimes) => {
  for (const time of passTimes) {
    const newTime = new Date(0);
    newTime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${newTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didin't work!", error);
  }

  //success, print out the details
  timeConverter(passTimes);
});


