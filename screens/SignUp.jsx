import axios from "axios";
import {useNavigation} from '@react-navigation/native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Error from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import {auth} from './Firebase/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import {
SafeAreaView,
ScrollView,
StyleSheet,
Text,
View,
TextInput,
TouchableOpacity,
Image,
} from 'react-native';

function SignUp() {

    const navigation = useNavigation();
    const database = getFirestore();
    const ref = collection(database, "User");

    const [username, setusername] = useState('');
    const [usernameV, setusernameV] = useState(false);
    const [email, setemail] = useState('');
    const [emailV, setemailV] = useState(false);
    const [password, setpassword] = useState('');
    const [passwordV, setpasswordV] = useState(false);
    const [conpassword, setconpassword] = useState('');
    const [conpasswordV, setconpasswordV] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  
    const handleSignUp = () =>{

        if (usernameV && emailV && passwordV && conpasswordV) {


        createUserWithEmailAndPassword(auth, email, password)
        .then(signup => {

            try {
                const user = { email: email , username: username };
                addDoc(ref, user);
            }catch (e){
                alert(e);
                console.log(e);
            }
            
            console.log('Signup Successful!');
            Toast.show({
                    type: 'success',
                    text1: 'Creation of account Successful!',
                    position: 'bottom',
                });
                navigation.navigate('Login');
        })    
        .catch((error) => {
            console.log(error)
            ToastAndroid.show({
                type: 'error',
                text1: j,
                position: 'bottom',
            });
          });
        
    }
}

    function handleSubmit() {
      const userData = {
        username,
        email,
        password,
        conpassword,
    };

    if (usernameV && emailV && passwordV && conpasswordV) {

        axios.post('', userData)

        .then(response => {
            console.log('Signup Successful!');
            console.log(response.data);
            if (response.data.status == 'OK') {
                Toast.show({
                    type: 'success',
                    text1: 'Creation of account Successful!',
                    position: 'bottom',
                });
                navigation.navigate('Login');

            } else {
                Toast.show({
                    type: 'error',
                    text1: 'email already exists',
                    position: 'bottom',
                });
            }

          })
          .catch(error => console.log(error)); 
                Toast.show({
                    type: 'error',
                    text1: 'Creation of account Failed!',
                    position: 'bottom',
                });
    }
}
  

    function handleusername(text) {
        setusername(text);
        setusernameV(text.length > 3);
    }
    

    function handleemail(text) {
        setemail(text);
        setemailV(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(text));
    }
    

    function handlepassword(text) {
        setpassword(text);
        setpasswordV(text.length >= 8);
    }

    function handleconpassword(text) {
        setconpassword(text);
        setconpasswordV(text === password);
    }


    return (

        <ScrollView
            contentContainerStyle={{flexGrow: 1, justifyContent: "center" }}
            showsVerticalScrollIndicator={false}>

        <View style={styles.container}>
        <View style={{backgroundColor: '#Eae0c8'}}>

        <Image
            source={require('../assets/lclogo.png')} 
            style={styles.logo}/>
        </View>

          
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
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={text => handleusername(text)}/>

            <View>
            {username.length < 3 ? null : usernameV ? (
                <Feather name="check-circle" color="green" style={styles.warning}/>
              ) : (
                <Error name="error" color="red" size={20}/>
              )}
            </View>

            </View>
            </View>

            <View>
            {username.length < 1 ? null : usernameV ? null : (
              <Text style={styles.message}>Name should be more then 3 characters.</Text>
            )}
            </View>



        <View style={styles.action}>
            <Fontisto
                style={{marginLeft: 20, paddingRight: 15, marginTop: 10 }}
                name="email"
                color="#235869"
                size={24}/>

        <View style={styles.inputView}>
        <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={text => handleemail(text)}/>

        <View>
            {email.length < 1 ? null : emailV ? (
                <Feather name="check-circle" color="green" style={styles.warning}/>
              ) : (
                <Error name="error" color="red" size={20} />
              )}
            </View>

            </View>
            </View>
            
            <View>
            {email.length < 1 ? null : emailV ? null : (
                <Text style={styles.message}>Please enter a valid email address.</Text>
            )}
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
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={showPassword}
            onChangeText={text => handlepassword(text)}/>

        <TouchableOpacity style={styles.eye} onPress={() => setShowPassword(!showPassword)}>
            {password.length < 1 ? null : !showPassword ? (
                <Feather name="eye" color={passwordV ? 'green' : 'red'} style={styles.warning}/>
                    ) : (
                <Feather name="eye-off" color={passwordV ? 'green' : 'red'} size={20}/>
                )}
        </TouchableOpacity>

        </View>
        </View>

        <View>
            {password.length < 1 ? null : passwordV ? null : (
                <Text style={styles.message}>Password should have atleast 8 characters.</Text>
            )}
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
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={showPassword}
            onChangeText={text => handleconpassword(text)}/>

        <TouchableOpacity style={styles.eye} onPress={() => setShowPassword(!showPassword)}>
            {conpassword.length < 1 ? null : !showPassword ? (
                <Feather name="eye" color={conpasswordV ? 'green' : 'red'} style={styles.warning}/>
                    ) : (
                <Feather name="eye-off" color={conpasswordV ? 'green' : 'red'} size={20}/>
                )}
        </TouchableOpacity>

        </View>
        </View>
        
        <View>
            {conpassword.length < 1 ? null : conpasswordV ? null : (
                <Text style={styles.message}>Confirm Password not same as Password.</Text>
            )}
        </View>

      

        <TouchableOpacity 
            onPress={() => handleSignUp()}
            style={styles.signupBtn}>
            <Text style={styles.signupText}>SignUp</Text> 
        </TouchableOpacity>
        
        <TouchableOpacity 
            onPress={() => navigation.navigate('Login')}
            style={styles.logText}>
            <Text style={styles.logText}>Already have an account? Login.</Text>
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
            width: 160,
            height: 160,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginBottom: 40,
    },
    
    main:{
        fontWeight: "bold",
        fontSize: 30,
        color:"black",
        marginBottom: 50,
    },

    action: {
        flexDirection: 'row',
        backgroundColor: '#Eae0c8',
      
        
      },
    
    icon: {
        marginLeft: 25, 
        marginTop: 10        
    },

    eye: {
        position: 'absolute',
        right: 15,
        top: 15,
      },

    inputView:{
            //width:"70%",
            flex: 1,
            flexDirection: "row",
            backgroundColor:"#72bcd4",
            borderRadius:25,
            height:60,
            marginBottom:20,
            justifyContent: "space-between",
            padding:20,
            marginRight: 30,
    },
    
    inputText:{
            color:"white",
    },

    message:{
        color: 'red', 
        fontSize: 12, 
        marginLeft: 10,
        marginTop: -20, 
        marginBottom: 20
    },

    warning:{
        flexDirection: "row",
        position: 'absolute',
        top: 0,
        right:0,
        fontSize: 20
    },

    logText:{
        color:"black",
        fontWeight:"bold",
        fontSize:16,
    },
    

    button: {
        alignItems: 'center',
        marginTop: -20,
        alignItems: 'center',
        textAlign: 'center',
        margin: 20,
    },
    
    signupBtn:{
             width:"80%",
             backgroundColor:"#5e8d9d",
             borderRadius:25,
             height:50,
             alignItems:"center",
             justifyContent:"center",
             marginTop:40,
             marginBottom:-10,
    },
                    
    signupText:{
            fontSize: 22,
            fontWeight: "bold"
    },

    logText:{
        color:"black",
        fontWeight:"bold",
        fontSize:16,
        marginTop:30
    },
    
    });
 

export default SignUp;