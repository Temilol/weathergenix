import {API_KEY} from '../constants/Strings'
import { querySuccessResponse, queryErrorResponse } from '../types';

export const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            
        }
    )
}

export const query = async(search: string): Promise<querySuccessResponse|queryErrorResponse> => {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${search},us&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        let responseJson: querySuccessResponse = await response?.json();
        console.log(`response is => ${JSON.stringify(responseJson)}`);
        return responseJson;
    } catch(error) {
        console.log(`Error is => ${JSON.stringify(error)}`);
        return error as queryErrorResponse;
    }
}