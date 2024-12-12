import axios from "axios";
import {useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import {auth} from "./Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
SafeAreaView,
ScrollView,
StyleSheet,
Text,
View,
TextInput,
TouchableOpacity,
Image,
Button
} from 'react-native';


function Login({}) { 
  const navigation = useNavigation();

  const [email, setemail] = useState('');
  const [password,setpassword] = useState('');
  const [passwordV, setPasswordV] = useState(false);


  const handleLogin = () =>{
    console.log(email)

    signInWithEmailAndPassword(auth, email, password)
    .then(login => {
        console.log('Login Successful!');
        AsyncStorage.setItem('isLoggedIn', 'true');
        AsyncStorage.setItem('email', email);
        Toast.show({
                type: 'success',
                text: 'Login Successful!',
                position: 'bottom',
            });
            navigation.navigate('TabNavigation');
    })    
    .catch((error) => {
      console.log(error)
    Toast.show({
        type: 'error',
        text: "Invalid Login",
        position: 'bottom',
    })
    
    });
}
  



return (
<ScrollView
      contentContainerStyle={{flexGrow: 1, justifyContent: "center" }}
      showsVerticalScrollIndicator={false}>

<View style={styles.container}>

<Image
      source={require('../assets/lclogo.png')} 
      style={styles.logo}/>   


<View style={styles.action}>
            <FontAwesome
                style={styles.icon}
                name="user-o"
                color="#235869"
                marginRight={20}
                size={24}/>
                
<View style={styles.inputView}>
<TextInput
style={styles.inputText}
placeholder="email"
placeholderTextColor="#003f5c"
onChangeText={text => setemail(text)}/>
</View>
</View>


<View style={styles.action}>
            <FontAwesome
                style={styles.icon}
                name="lock" 
                color="#235869"
                marginRight={20}
                size={25}/>

<View style={styles.inputView}>
<TextInput
style={styles.inputText}
secureTextEntry
placeholder="Password"
placeholderTextColor="#003f5c"
onChangeText={text => setpassword(text)}/>

<TouchableOpacity
    style={styles.eye}
    onPress={() => setPasswordV(!passwordV)}>
    <Feather name={passwordV ? "eye" : "eye-off"} size={20} color="gray" />
  </TouchableOpacity>

</View>
</View>


<TouchableOpacity 
            onPress={() => handleLogin()}
            style={styles.loginBtn}>
            <Text style={styles.loginText}>Login</Text> 
</TouchableOpacity>


<TouchableOpacity 
            onPress={() => navigation.navigate('SignUp')}
            style={styles.signText}>
            <Text style={styles.signText}>Don't have an account? Sign up.</Text>
</TouchableOpacity>

</View>
</ScrollView>
);



}


//styling 

const styles = StyleSheet.create({
  
container: {
flex: 1,
backgroundColor: '#Eae0c8',
alignItems: 'center',
justifyContent: 'center',
},

logo: {
  width: 180,
  height: 180,
  resizeMode: 'contain',
  alignSelf: 'center',
  marginBottom: 60,
},

main:{
    fontWeight: "bold",
    fontSize: 30,
    color:"black",
    marginBottom: 50,
},

vector:{
  fontSize: 20,
},

action: {
  flexDirection: 'row',
  backgroundColor: '#Eae0c8',

},

icon: {
  marginLeft: 30, 
  marginTop: 10, 
  marginRight:10       
},

eye: {
  position: 'absolute',
  right: 20,
  top: 14,
},

inputView:{
  //width:"70%",
  flex: 1,
  backgroundColor:"#72bcd4",
  borderRadius:25,
  height:50,
  marginBottom:30,
  justifyContent:"center",
  padding:20,
  marginRight: 25
},

inputText:{
height:50,
color:"white"
},

forgotText:{
color:"black",
fontSize:14,
},

signText:{
  color:"black",
  fontWeight:"bold",
  fontSize:16,
  marginTop:30
},

loginBtn:{
width:"80%",
backgroundColor:"#5e8d9d",
borderRadius:25,
height:50,
alignItems:"center",
justifyContent:"center",
marginTop:50,
marginBottom:20,
},

loginText:{
  fontSize: 22,
  fontWeight: "bold"
}

});


export default Login;



