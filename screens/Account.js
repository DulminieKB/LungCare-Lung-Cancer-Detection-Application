import axios from "axios";
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';


import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Button
    } from 'react-native';

    function Account() {


        const navigation = useNavigation();

        const handleLoginNavigation = () => {
            navigation.navigate('Login');
          };

          const handleSignUpNavigation = () => {
            navigation.navigate('SignUp');
          };
        

        return(

            <SafeAreaView style={styles.container}>

            <ScrollView
                contentContainerStyle={{flexGrow: 1, justifyContent: "center" }}
                showsVerticalScrollIndicator={false}>
    
            <Image
                source={require('../assets/care.jpg')} 
                style={styles.care}/> 

            <TouchableOpacity 
                onPress={handleLoginNavigation}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Get Started  </Text> 
                <FontAwesome name="arrow-right" size={28} style={styles.arrow} />
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={handleSignUpNavigation}>
                <View style={styles.accountContainer}>
                <Text style={styles.account}>Create account.</Text> 
                </View>
            </TouchableOpacity>

            </ScrollView>
            </SafeAreaView>

    );
}

// stlying

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    care: { 
        width: 350, 
        height: 350, 
        resizeMode: 'contain', 
    }, 

    arrow: {
        marginLeft: 5,
        color: "black",
    },

    loginBtn:{
        width:"70%",
        flexDirection: "row",
        backgroundColor:"#5e8d9d",
        borderRadius:28,
        height:60,
        alignItems:"center",
        justifyContent:"center",
        marginTop:60,
        marginLeft: 50,
    },
                
    loginText:{
        fontSize: 22,
        fontWeight: "bold",
    },

    accountContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },

    account:{
    color:"#1e90ff",
    fontWeight:"bold",
    fontSize:18,
    },

});


export default Account;
