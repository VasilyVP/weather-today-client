import { systems } from './consts'
import { weatherRawChunk, weatherRawT, weatherProps, weatherT } from './types'

function round10(value: number) {
    return Math.round(value * 10) / 10
}

/** Unit system convertion (including kPa -> mmHg) and rounding */
export function alignWeatherNow(weather: Partial<weatherProps>, system: systems): Partial<weatherProps> {
    const { temp, feels, pressure } = weather;

    return {
        ...weather,
        temp: round10( (system === systems.metric ? temp as number : (temp as number  * 9 / 5 + 32)) ),
        feels: Math.round(system === systems.metric ? feels as number : (feels as number * 9 / 5 + 32)),
        pressure: Math.round(system === systems.metric ? pressure as number * 0.750062 : pressure as number * 0.750062 / 25.4)
    }
}

/** Unit system convertion and rounding */
export function alignWeatherForecast(forecast: Partial<weatherProps>[], system: systems): Partial<weatherProps>[] {
    return forecast.map(day => {
        const { tempMax, tempMin } = day;
        return {
            ...day,
            tempMax: Math.round(system === systems.metric ? tempMax as number : (tempMax as number * 9 / 5 + 32)),
            tempMin: Math.round(system === systems.metric ? tempMin as number : (tempMin as number * 9 / 5 + 32)),
        }
    })
}

/** List of the raw data are 3 hours time series for the next 5 days
 * [0] - it's now
 * also we need data for the rest of the day
 * and split others by the 8 series on day
 * days5Data output is array of [[today tail series], [8 series], [8 series], ...]
  */
function splitRawData(dataList: weatherRawChunk[]) {
    const nowData = dataList.shift();

    // taking rest of the day
    let dayTailChunks = Math.floor((23 - new Date().getHours()) / 3);

    const todayData = dayTailChunks === 0 ? [nowData] : dataList.splice(0, dayTailChunks);

    const days5Data = [todayData];
    for (let i = 0; i < 5; i++) {
        days5Data.push(dataList.splice(0, 8));
    }

    return [nowData, days5Data];
}

function prepareForecast(days5Data: weatherRawChunk[][]) {
    function calcMaxTemp(dayData: weatherRawChunk[]) {
        return dayData.map(chunk => chunk.main.temp_max).reduce(
            (max, temp) => { return max < temp ? temp : max }
            , 0);
    }

    function calcMinTemp(dayData: weatherRawChunk[]) {
        return dayData.map(chunk => chunk.main.temp_min).reduce(
            (max, temp) => { return max > temp ? temp : max }
            , 1000);
    }

    /** Looking for the worst weather in the forecast for this day */
    function calcForecastIcon(dayData: weatherRawChunk[]) {
        const icon = dayData.reduce(
            (accum, current) => {
                const currentIcon = current.weather[0].icon;
                return Number(currentIcon.slice(0, 2)) > Number(accum.slice(0, 2)) ? currentIcon : accum;
            }, '01d');

        // changing night to day icon
        return icon.replace(/n/, 'd');
    }

    const forecast = days5Data.map(dayData => (
        {
            tempMax: calcMaxTemp(dayData),
            tempMin: calcMinTemp(dayData),
            icon: calcForecastIcon(dayData)
        }
    ));

    return forecast;
}

function prepareData(data: weatherRawChunk) {
    return {
        temp: data.main.temp,
        feels: data.main.feels_like,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon
    }
}

export function parseRawWeatherData(data: weatherRawT): weatherT {
    if (!(data.list && data.list.length > 39)) throw new Error('Empty data list');

    const [nowData, days5Data] = splitRawData(data.list);
    
    const city = data.city.name;
    const forecast = prepareForecast(days5Data as weatherRawChunk[][]);
    const now = prepareData(nowData as weatherRawChunk);
    const updated = Date.now();

    return { updated, city, now, forecast };
}