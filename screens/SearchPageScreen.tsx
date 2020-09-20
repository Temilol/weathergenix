import React, {useState, useCallback} from 'react';
import {FlatList, Text, View, Platform} from 'react-native';
import { weatherResponse, querySuccessResponse, queryErrorResponse } from '../types';
// import { ForecastCard } from '../components/ForecastCard';
import {Toast} from 'native-base';
import {Header, SearchBar, Button, Image} from 'react-native-elements';
import {icons} from '../assets/icons';
import {query} from '../api/serviceCall';
import { NavBar } from '../components';

export const SearchPageScreen: React.FC = ({navigation}) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    // const [forecast, setForecast] = useState<weatherResponse>();
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const getLocation = () => {
        console.log(`Get Location Function`);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(`Position is ${JSON.stringify(position)}`);
                try {  
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    getWeather();
                } catch(error) {
                    setError(error?.message);
                    console.log(`Error getting location: ${error}`);
                }
            },
            (error) => {
                setError(error?.message);
                console.log(`Error in get location is ${JSON.stringify(error)}`);
            }
        )
    }

    const getWeather = async() => {
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=193d38c665b910cc4912971f32f2a59a`;
        try{
            let response = await fetch(url);
            let data: any = await response?.json();
            console.log(`Getting Weather with url => ${url} and data => ${JSON.stringify(data)}`);
            // setForecast(data);
        } catch (error) {
            throw Error(`Error getting weather: ${error}`);
        }
    }

    const updateSearch = (search: React.SetStateAction<string>) => {
      setSearch(search);
    };

    const getForecast = async() => {
        setLoading(true);
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
        } else {
            Toast.show({
                text: "Please enter a valid zipcode!",
                type: "danger",
                duration: 3000
            });
        }
        setLoading(false);
    }

    // getLocation();

    return (
        <View style={styles.container}>
            <NavBar navigation={navigation}/>
            <View style={{alignItems:"center", marginTop: 60}}>
                <Image
                    source={icons.weather.light}
                    style={{ width: 200, height: 200, margin: 30 }}
                />
                <View style={{margin: 20}}>
                {/*<FlatList data={forecast?.list} style={{marginTop:20}} keyExtractor={item => item?.dt_txt} renderItem={({item}) => <ForecastCard detail={item} location={forecast?.city?.name} />} />*/}
                    <SearchBar
                        inputContainerStyle={{backgroundColor: '#FFF'}}
                        containerStyle={{backgroundColor: '#ADD8E6'}}
                        platform={"ios"}
                        placeholder=" Enter Zipcode..."
                        onChangeText={updateSearch}
                        showLoading={loading}
                        value={search}
                        keyboardType={Platform.OS === 'android' ? 'numeric': 'number-pad'}
                    />
                    <View style={{alignItems: "center"}}>
                        <Button
                            containerStyle={{margin: 20, width: 200}}
                            icon={{name: "search", size: 20, color: "#000"}} iconRight iconContainerStyle={{paddingTop: 3}}
                            title="Search" titleStyle={{color: "#000"}}
                            type="outline"
                            raised
                            onPress={getForecast}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6'
  },
};