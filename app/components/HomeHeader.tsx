import { StyleSheet,Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Address from '../types/Address';
import { COLORS, SIZES } from '../constants/theme';
import { LoginContext } from '../context/LoginContext';
import { LoginContextType } from '../context/type/LoginContextType';
import NetworkImage from './NetworkImage';

export default function  HomeHeader(){


    const { profileObj, setProfileObj, login, setLogin} = useContext(LoginContext) as LoginContextType;


    const [time, setTime] = useState<string>('');

    useEffect(() =>{
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
                <NetworkImage 
                    data={profileObj.profileUrl}
                    width={55}
                    height={55}
                    radius={99}
                    mode={'cover'}
                />
            </View>

            <View style={styles.header}>
                <Text style={styles.headerTextOne}>Delivery to</Text>
                <Text style={styles.headerTextTwo}>{profileObj.address[0].city} - {profileObj.address[0].street} </Text>
                <Text style={styles.headerTextTwo}>{profileObj.address[0].country} - {profileObj.address[0].postalCode}</Text>
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