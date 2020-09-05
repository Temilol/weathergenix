import React from 'react';
import {Header} from 'react-native-elements';
import { APP_NAME } from '../constants/Strings';
import { Image, Icon } from 'native-base';

export const NavBar = () => {
    const RightComponent = () => {
        return (
            <Icon name='home' style={styles.iconStyle} onPress={()=>{console.log(`clicked`)}} />
        )
    }
    return (
        <Header
            placement="left"
            centerComponent={{ text: APP_NAME, style: { color: '#fff', textTransform: 'uppercase' } }}
            rightComponent={<RightComponent/>}
        />
    )
}

const styles = {
    iconStyle: {
        color: 'white'
    }
}