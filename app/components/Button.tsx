import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";

type ButtonProps = {
  title: number;
  onPress: () => void;
  isValid : boolean;
  loader : any;
};

export default function Button({ title, onPress, isValid, loader }: ButtonProps ){
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle}
    >
      {!loader  ? (
        <Text style={styles.btnTxt}>{title}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btnTxt: {
    fontFamily: "bold",
    color: COLORS.white,
    fontSize: 18,
  },
  btnStyle:{
    height: 50,
    width: "100%",
    marginVertical: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  }
});
