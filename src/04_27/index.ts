const thermostat = {
    selectedTemperature: 20}
class HeatingPlan {
    constructor(parameters) {
    }

    _max: 30
    _min:10
    

    get targetTemperature() {
        if(thermostat.selectedTemperature > this._max) return this._max // 설정 온도가 최대치 보다 크다?
        else if(thermostat.selectedTemperature < this._min) return this._min // 설정 온도가 최대치 보다 작다?
        else return thermostat.selectedTemperature;
    }
}

