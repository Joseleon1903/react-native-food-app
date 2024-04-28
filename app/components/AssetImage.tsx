import { StyleSheet, Image , Text} from "react-native";
import React from "react";


export default function AssetImage() {
  return (
     <Image
        style={styles.imagen}
        source={require('./ruta_de_la_imagen.jpg')} // Reemplaza 'ruta_de_la_imagen.jpg' por la ruta de tu imagen
      />
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imagen: {
    width: 200,
    height: 200,
  },
});

// const styles = StyleSheet.create({
//   image: (width, height,radius, mode ) => ({
//     width: width,
//     height: height,
//     borderRadius: radius,
//     resizeMode: mode,
//   }),
// });