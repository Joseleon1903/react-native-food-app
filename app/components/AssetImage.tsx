import { StyleSheet, Image , ImageProps} from "react-native";
import React from "react";

type AssetImageProps= {
  data: ImageProps;
  height: number;
  width: number;
  mode: any;
  radius: number;
};


export default function AssetImage({  
  data,
  height,
  width,
  mode,
  radius
}: AssetImageProps ) {


  return (
     <Image
        style={styles(height, width, mode, radius).imagen}
        source={data}
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