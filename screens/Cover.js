import axios from "axios";

import React, { useState, useEffect } from 'react';

import {
StyleSheet,
Text,
useColorScheme,
View,
TextInput,
TouchableOpacity,
Image,
ActivityIndicator
} from 'react-native';


const Cover =  () => {

return (
<View style={styles.container}>

<Image
      source={require('../assets/load.png')} 
      style={styles.logo}/>   

<Text style={styles.bname}>Lung Care</Text>
<Text style={styles.slogan}>Early Detection, Better Protection</Text>

</View>

);
}


//styling 

const styles = StyleSheet.create({
    
container: {
flex: 1,
backgroundColor: '#235869',
alignItems: 'center',
justifyContent: 'center',
},

logo: {
  width:230,
  height: 230,
  resizeMode: 'contain',
  alignSelf: 'center',
  marginBottom: 20,
  marginTop: -60,
},

bname: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#90d4ea",
    fontFamily: 'Roboto',
    marginBottom: 30,
},

slogan: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#989898",
    marginBottom: 20,
},

main:{
    fontWeight: "bold",
    fontSize: 30,
    color:"black",
    marginBottom: 50,
}

});

export default Cover;