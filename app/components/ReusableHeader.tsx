import { StyleSheet, Text, View, TouchableOpacity, Image, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants/theme";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AssetImage from "./AssetImage";

type ReusableHeaderProps = {
  title: string;
  backbtn?:StyleProp<ViewStyle>;
};


export default function ReusableHeader ({ title, backbtn }: ReusableHeaderProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.outerStyle}>
      {backbtn === false? (
        <View></View>
       
      ) : (
        <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={backbtn}
      >
         <Ionicons
            name='chevron-back-circle'
            size={30}
            color={COLORS.primary}
        />
      </TouchableOpacity>
      )}
     

      <Text style={styles.heading}>{title}</Text>

      <AssetImage
        data={require("../../assets/images/profile.jpg")}
         mode={"cover"}
         width={30}
         height={30}
         radius={99}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerText: {
    marginLeft: 15,
    justifyContent: "center",
  },

  heading: {
    fontFamily: "medium",
    fontSize: SIZES.medium,
    color: COLORS.black,
  },

  location: {
    fontFamily: "regular",
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
  },
});
