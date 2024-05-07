import { StyleSheet, Image } from "react-native";
import React from "react";

type NetworkImageProps= {
  data: string;
  height: number;
  width: number;
  mode?: any;
  radius: number;
};


export default function NetworkImage({  
  data,
  height,
  width,
  mode,
  radius
}: NetworkImageProps ) {


  return (
     <Image
        style={styles(height, width, mode, radius).imagen}
        source={{uri: data}}
      />
  
  );
}

const styles =( 
  height :number,
  width : number,
  mode : any,
  radius: number ) => StyleSheet.create({
  imagen: {
    width: width,
    height: height,
    borderRadius: radius,
    resizeMode: mode
  },
});