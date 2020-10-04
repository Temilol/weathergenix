import React from 'react';
import {Header} from 'react-native-elements';
import { APP_NAME } from '../constants/Strings';
import { Image, Icon } from 'native-base';

const NavBar = ({navigation}) => {
    const RightComponent = () => {
        return (
            <Icon name='home' style={styles.iconStyle} onPress={()=>{navigation.navigate('Home')}} />
        )
    }
    return (
        <Header
            containerStyle={{backgroundColor: '#0C090A'}}
            placement="left"
            centerComponent={{ text: APP_NAME, style: { color: '#fff', textTransform: 'uppercase' } }}
            rightComponent={<RightComponent/>}
        />
    )
}

export default NavBar;

const styles = {
    iconStyle: {
        color: 'white'
    }
}