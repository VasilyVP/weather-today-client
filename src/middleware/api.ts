import { parseRawWeatherData } from '../common/utils'
import { weatherT, responseT } from '../common/types'

/** Get and parse weather data */
export async function fetchParsedWeather(): Promise<weatherT> {

    const res = await fetch('/api/weather');
    const data = await res.json();

    const weather = parseRawWeatherData(data);
    return weather;
}

type userDataT = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export async function postNewUser(userData: userDataT): Promise<responseT> {
    const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (res.status === 500) throw new Error('Internal server error');

    const response = await res.json();
    return response;
}

export async function postSignInInfo(userData: Partial<userDataT>) {
    const res = await fetch('/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (res.status === 500) throw new Error('Internal server error');

    const response = await res.json();
    
   /*
    const response = {
        code: 401,
        msg: 'Incorrect login or password',
        user: {
            firstName: 'Vasily',
            email: 'vasilyvp@list.ru'
        }
    }
*/

    return response;
}