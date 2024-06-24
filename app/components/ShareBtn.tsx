import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {COLORS, SIZES} from '../constants/theme'

type ShareBtnProps = {
    onPress?: () => void;
};

export default function ShareBtn({ onPress }: ShareBtnProps){
  return (
    <TouchableOpacity onPress={onPress} style={styles.sharebtn}>
        <MaterialCommunityIcons
            name='share-circle'
            size={30}
            color={COLORS.primary}
        />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    sharebtn: {
        position: 'absolute',
        marginRight: 12,
        right: 0,
        alignItems: 'center',
        zIndex: 999,
        top: SIZES.xxLarge
    }
})