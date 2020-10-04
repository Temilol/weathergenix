import React, {FC} from "react";
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "../constants/Strings";

interface SearchInputProps {
    onForecast: (search: string, navigation: any) => void;
    navigation: any;
}

const SearchInput: FC<SearchInputProps> = (props) => {
    const {onForecast, navigation} = props;
    var GooglePlacesRef: GooglePlacesAutocomplete | null;
    
    const _onForecast = () => {
        if(!onForecast)
            return;
        onForecast(GooglePlacesRef?.getAddressText()||'', navigation);
        GooglePlacesRef?.setAddressText('');
    }

    const rightButton = () => {
        return (
            <Button
                buttonStyle={{backgroundColor: '#FFF'}}
                containerStyle={{width: 50, height: 39, marginTop: 7, marginLeft: -5, borderTopRightRadius: 10, borderBottomRightRadius: 10}}
                icon={{name: 'search', size: 25, color: '#000'}} iconRight iconContainerStyle={{alignItems: 'center', justifyContent:'center'}}
                onPress={_onForecast}
            />
        )
    }

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                ref={(instance) => {GooglePlacesRef = instance}}
                placeholder={'Enter City...'}
                returnKeyType={'search'}
                debounce={500}
                renderDescription={row => row.description}
                styles={styles.customStyles}
                minLength={2}
                onSubmitEditing={_onForecast}
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: 'en',
                    types: '(cities)',
                }}
                enablePoweredByContainer={false}
                renderRightButton={rightButton}
            />
        </View>
    )
}
export default SearchInput;

const styles = {
    container: {
        flex: 1,
        margin: 20
    },
    customStyles: {
        textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0,
        },
        textInput: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
        },
        description: {
            fontSize: 16,
            fontWeight: 'bold',
        }
    }
}