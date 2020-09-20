import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import {NavBar} from '../components';
import _ from 'lodash';
import {getIcon, degToCompass, hPaToinHg, dayOfWeek} from '../api/serviceCall';
import moment from 'moment';

const WeatherScreen = (props) => {
    const {
        route,
        navigation,
    } = props;
    
    let {weather, name, main, dt, sys, wind, visibility, coord} = route?.params?.data;
    const {temp, feels_like, temp_max, pressure, humidity} = main || {};
    const {description, icon} = _.head(weather) || {};
    const title = _.head(weather)?.main || '';
    const {sunrise, sunset} = sys || {};
    const {speed, deg} = wind || {};
    const {lat, lon} = coord || {};

    return (
        <View style={styles.container}>
            <NavBar navigation={navigation}/>
            <ScrollView style={{marginVertical: 50, flex: 1}}>
                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 10}}>{`${name}`}</Text>
                    <Image style={{width:100, height:100}} source={{uri: getIcon(icon)}}/>
                    <Text style={{fontSize: 18, marginTop: -15, marginBottom: 10}}>{`${_.capitalize(description)}`}</Text>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <Text style={{fontSize: 55}}>{`${Math.round(temp)}`}</Text>
                        <Text style={{fontSize: 25}}>{`o`}</Text>
                    </View>
                </View>
                <View style={{marginTop: 20, margin: 10, flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', marginHorizontal: 10, flex: 1}}>
                        <Text style={styles.headerStyle}>{`Today (${dayOfWeek(dt)}): ${title} currently. It's ${Math.floor(temp)}˚, the high for today was forecasted as ${Math.floor(temp_max)}˚`}</Text>
                    </View>
                </View>
                <Card.Divider style={{backgroundColor: '#000'}}/>
                <View style={{margin: 10, flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', marginHorizontal: 10, flex: 1}}>
                        <Text style={styles.labelStyle}>{`SUNRISE`}</Text>
                        <Text style={styles.textStyle}>{`${moment.unix(sunrise).format("hh:mm A")}`}</Text>
                    </View>
                    <View style={{flexDirection: 'column', flex: 1}}>
                        <Text style={styles.labelStyle}>{`SUNSET`}</Text>
                        <Text style={styles.textStyle}>{`${moment.unix(sunset).format("hh:mm A")}`}</Text>
                    </View>
                </View>
                <Card.Divider style={{backgroundColor: '#000'}}/>
                <View style={{margin: 10, flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', marginHorizontal: 10, flex: 1}}>
                        <Text style={styles.labelStyle}>{`FEELS LIKE`}</Text>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <Text style={styles.textStyle}>{`${Math.round(feels_like)}`}</Text>
                            <Text style={{fontSize: 12}}>{`o`}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column', flex: 1}}>
                        <Text style={styles.labelStyle}>{`HUMIDITY`}</Text>
                        <Text style={styles.textStyle}>{`${humidity}%`}</Text>
                    </View>
                </View>
                <Card.Divider style={{backgroundColor: '#000'}}/>
                <View style={{margin: 10, flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', marginHorizontal: 10, flex: 1}}>
                        <Text style={styles.labelStyle}>{`WIND`}</Text>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <Text style={styles.textStyle}>{`${degToCompass(deg)} ${Math.round(speed)} mph`}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column', flex: 1}}>
                        <Text style={styles.labelStyle}>{`PRESSURE`}</Text>
                        <Text style={styles.textStyle}>{`${hPaToinHg(pressure)} inHg`}</Text>
                    </View>
                </View>
                <Card.Divider style={{backgroundColor: '#000'}}/>
                <View style={{margin: 10, flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', marginHorizontal: 10, flex: 1}}>
                        <Text style={styles.labelStyle}>{`VISIBILITY`}</Text>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <Text style={styles.textStyle}>{`${Math.round(visibility/1609)} mi`}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column', flex: 1}}>
                        <Text style={styles.labelStyle}>{`LAT LONG`}</Text>
                        <Text style={styles.textStyle}>{`(${lat}, ${lon})`}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default WeatherScreen;

const styles = {
    container: {
      flex: 1,
      backgroundColor: '#ADD8E6'
    },
    cardWrapper: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    labelStyle: {
        fontSize: 14
    },
    headerStyle: {
        fontSize: 16
    },
    textStyle: {
        fontSize: 20
    }
  };