import React from 'react';

class FallDetection extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  detect(data) {
    const now = Date.now();
    mySlowFunction(9);

    var THRESHOLD_VAL_PER_ITEM = 0.4;
    var ax = [];
    var ay = [];
    var az = [];
    for (var p in data.accelerometer) {
      ax.push(data.accelerometer[p].x);
      ay.push(data.accelerometer[p].y);
      az.push(data.accelerometer[p].z);
    }
    var xConfidence = this.DetectFall(ax);
    var yConfidence = this.DetectFall(ay);
    var zConfidence = this.DetectFall(az);

    var NEEDED_CONFIDENCE_LEVEL =
      this.getNumberOfAcc(data) * THRESHOLD_VAL_PER_ITEM;

    if (NEEDED_CONFIDENCE_LEVEL <= xConfidence + yConfidence + zConfidence) {
      this.props.fallDetected();
    }
    console.log(`Time slow function: ${Date.now() - now} ms`);
  }

  getNumberOfAcc(data) {
    var sum = 0;
    for (var acc in data.accelerometer) {
      sum += 1;
    }

    return sum;
  }

  DetectFall(data) {
    var confidence = 0;
    var sum = data.reduce((a, b) => a + b, 0);

    var avg = sum / data.length;
    for (var d in data) {
      if (data[d] > avg + 1 || data[d] < avg - 1) {
        confidence += 1;
      }
    }
    return confidence;
  }

  render() {
    return null;
  }
}

function mySlowFunction(baseNumber) {
  let result = 0;
  for (var i = Math.pow(baseNumber, 7); i >= 0; i--) {
    result += Math.atan(i) * Math.tan(i);
  }
}

export default FallDetection;
