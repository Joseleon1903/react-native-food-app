import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons';
import {COLORS, SIZES} from '../constants/theme'

type BackBtnProps = {
    onPress?: () => void;
};

export default function BackBtn({ onPress }: BackBtnProps){
  return (
    <TouchableOpacity onPress={onPress} style={styles.backbtn}>
        <Ionicons
            name='chevron-back-circle'
            size={30}
            color={COLORS.primary}
        />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    backbtn: {
        position: 'absolute',
        marginLeft: 12,
        alignItems: 'center',
        zIndex: 999,
        top: SIZES.xxLarge
    }
})