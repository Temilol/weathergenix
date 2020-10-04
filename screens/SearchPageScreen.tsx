import React from 'react';
import {Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import {icons} from '../assets/icons';
import {getForecast} from '../api/serviceCall';
import {NavBar, SearchInput} from '../components';

const SearchPageScreen: React.FC = ({navigation}) => {
    return (
        <View style={styles.container}>
            <NavBar navigation={navigation}/>
            <SearchInput onForecast={getForecast} navigation={navigation}/>
            <View style={{flex: 2, justifyContent: 'center', alignItems: "center"}}>
                <Image
                    source={icons.weather.dark}
                    style={{width: 200, height: 200}}
                />
                <Text style={styles.textStyle}>WeatherGenix</Text>
            </View>
        </View>
    )
}

export default SearchPageScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6'
  },
  textStyle: {
      marginTop: 10,
      fontSize: 20,
      fontWeight:'bold',
      fontStyle: 'italic'
  }
};