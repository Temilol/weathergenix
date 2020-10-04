import _ from 'lodash';
import moment from 'moment';
import {Toast} from 'native-base';
import {API_KEY} from '../constants/Strings'
import {querySuccessResponse, queryErrorResponse} from '../types';

export const getForecast = async(search: string, navigation: any) => {
    if(search !== ''){
        const result = await query(search);
        if(result?.cod === 200) {
            navigation.navigate('Weather', {data: result});
        } else {
            Toast.show({
                text: `Error occurred: ${result?.message}`,
                type: "danger",
                duration: 3000
            });
        }
    }
}

const query = async(search: string): Promise<querySuccessResponse|queryErrorResponse> => {
    search= _.replace(search, 'USA', 'us');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=imperial`;
    try {
        const response = await fetch(url);
        let responseJson: querySuccessResponse = await response?.json();
        console.log(`url is => ${url}`);
        console.log(`response is => ${JSON.stringify(responseJson)}`);
        return responseJson;
    } catch(error) {
        console.log(`Error is => ${JSON.stringify(error)}`);
        return error as queryErrorResponse;
    }
}

export const getIcon = (icon: string): string => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

export const degToCompass = (num: number): string => {
    var val = (Math.floor((num / 22.5) + 0.5) % 16);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[val];
}

export const hPaToinHg = (hpa: number): string => {
    var val = (hpa *100)/3386
    return val.toFixed(2);
}

export const dayOfWeek = (timestamp: number): string => {
    var arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var val = moment.unix(timestamp).day();
    return arr[val];
}