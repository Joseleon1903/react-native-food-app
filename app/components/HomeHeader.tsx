import { StyleSheet,Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AssetImage from './AssetImage';
import Address from '../types/Address';
import { COLORS, SIZES } from '../constants/theme';

export default function  HomeHeader(){

    const [address, setAddress] = useState<Address>( {city: "Mardrid", street: "Carrera Camino Real N. 3", postalCode: 45200, country: 'Spain' });

    const [time, setTime] = useState<string>('');


    useEffect(() =>{
        console.log("address: "+ JSON.stringify(address));
        if(time.length ===0){
            const greeting:string = getTimeOfDay();
            setTime(greeting);
        }

    }, [])

    const getTimeOfDay = () =>{
        console.log("entering getTimeOfDay");
        const now = new Date();
        const hours = now.getHours();
        if(hours > 0  && hours <12){
            return "☀️";
        }else if (hours >= 12 && hours < 17){
            return "🌄";
        }else if(hours >= 17 && hours < 24){
            return "🌙";
        }
        return "😴";
    }

    return (
        <View style={styles.header_row}>

            <View style={styles.outerStyle}>
                <AssetImage 
                    data={require('../../assets/images/profile.jpg')}
                    width={55}
                    height={55}
                    radius={99}
                    mode={'cover'}
                />
            </View>

            <View style={styles.header}>
                <Text style={styles.headerTextOne}>Delivery to</Text>
                <Text style={styles.headerTextTwo}>{address.city} - {address.street} </Text>
                <Text style={styles.headerTextTwo}>{address.country} - {address.postalCode}</Text>
            </View>

            <Text style={styles.timeEmoji}>{time}</Text>

        </View>

    )

}
const styles = StyleSheet.create({

    header_row:{
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    outerStyle:{
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row'
    },
    header:{
        marginLeft: 5,
        justifyContent:'center'
    },
    headerTextOne: {
        fontFamily: 'medium',
        fontSize: SIZES.medium,
        color: COLORS.secondary
    },
    headerTextTwo:{
        fontFamily: 'regular',
        fontSize: SIZES.small,
        color: COLORS.gray
    },
    timeEmoji:{
        fontSize: 36,
        marginHorizontal: 10
    }
   
});