import { parseRawWeatherData } from '../common/utils'
import { weatherT, responseT } from '../common/types'

export function fetchParsedWeather(): Promise<weatherT> {
    return new Promise((resolve, reject) => {
        fetch('/api/weather')
            .then(res => res.json())
            .then(data => {
                try {
                    const weather = parseRawWeatherData(data);
                    resolve(weather);
                } catch (err) {
                    console.error(err);
                    reject(err);
                }
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

type userDataT = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export function postNewUser(userData: userDataT): Promise<responseT> {
    return new Promise((resolve, reject) => {
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(response => resolve(response))
            .catch(err => reject({ message: 'Network error' }));
    })
}