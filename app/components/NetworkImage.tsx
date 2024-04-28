import { StyleSheet,Image } from 'react-native'
import React from 'react'

export default function NetworkImage (){
  return (
    <Image
        source={require('https://d326fntlu7tb1e.cloudfront.net/uploads/93c4b3df-9e55-4308-a834-9fe4ad67c0b3-bar.png')} // Reemplaza 'ruta_de_la_imagen.jpg' por la ruta de tu imagen
      />
  )
}


// const styles = StyleSheet.create({
//     image:{
//         width: width,
//         height: height,
//         borderRadius: radius,
//         resizeMode: "cover"
//     }
// });