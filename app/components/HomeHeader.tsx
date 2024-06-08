import { StyleSheet,Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLORS, SIZES } from '../constants/theme';
import { LoginContext } from '../context/LoginContext';
import { LoginContextType } from '../context/type/LoginContextType';
import NetworkImage from './NetworkImage';
import { WalletContextType } from '../context/type/WalletContextType';
import { WalletContext } from '../context/WalletContext';
import { fetchWallet } from '../hook/useWalletHook';
import { OnlineServiceContext } from '../context/OnlineServiceContext';
import { OnlineServiceContextType } from '../context/type/OnlineServiceContextType';

export default function  HomeHeader(){

    const { profileObj, setProfileObj, login, setLogin} = useContext(LoginContext) as LoginContextType;

    const { wallet, setWallet} = useContext(WalletContext) as WalletContextType;
    const {  onlineService, setOnlineService} = useContext(OnlineServiceContext) as OnlineServiceContextType;


    const [time, setTime] = useState<string>('');

    useEffect(() =>{
        if(time.length ===0){
            const greeting:string = getTimeOfDay();
            setTime(greeting);
        }

        if(login && onlineService.isOnlineApi){
            console.log("profileObj.id: "+profileObj.id)
            fetchWallet(onlineService.baseApi, profileObj.id).then((response) => {
                setWallet(response);
              }).catch((error) =>{
                console.log(error);
              }
            );
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
                
                <View style={styles.header}>
                    <Text style={styles.headerTextOne}>Delivery to</Text>
                    <Text style={styles.headerTextTwo}>{profileObj.address.city} - {profileObj.address.street} </Text>
                    <Text style={styles.headerTextTwo}>{profileObj.address.country} - {profileObj.address.postalCode}</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row' , justifyContent:'space-between'}}>


                <View style={{justifyContent: 'center'}}>
                    <NetworkImage data='https://cdn-icons-png.flaticon.com/512/2108/2108625.png'  width={55} height={55} radius={2} mode={'cover'} />
                </View>

                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.headerTextTwo}>{wallet.accountName}</Text>
                    <Text style={styles.headerTextTwo}>{wallet.currency}</Text>
                    <Text style={styles.headerTextOne}>{wallet.balance} $</Text>
                </View>
            </View>



        </View>

    )

}
const styles = StyleSheet.create({

    header_row:{
        flexDirection: 'row',
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