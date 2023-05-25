const readingsOutsideRange = (station, min, max, range) =>
  station.readings.filter((r) => r.temp < min || r.temp > max);

const main = () => {
  const station = {
    name: 'blah',
    readings: [
      { temp: 47, time: '2016-11-10 09:10' },
      { temp: 53, time: '2016-11-10 09:20' },
      { temp: 37, time: '2016-11-10 09:30' },
      { temp: 50, time: '2016-11-10 09:40' },
      { temp: 40, time: '2016-11-10 09:50' },
    ],
  };
  const operatingPlan = {
    temperatureFloor: 10,
    temperatureCeiling: 20,
  };

  const alerts = readingsOutsideRange(
    station,
    operatingPlan.temperatureFloor,
    operatingPlan.temperatureCeiling,
    range
  );
};

export { main };

class NumberRange {
  _data: {
    min: number;
    max: number;
  };
  constructor(min, max) {
    this._data = { min, max };
  }
  get min() {
    return this._data.min;
  }
  get max() {
    return this._data.max;
  }
}
