import axios from "axios";
import {useNavigation} from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

function Home () {



    const navigation = useNavigation();

    getloginstatus = async () => {

        try {
          const check = await AsyncStorage.getItem('isLoggedIn');
          console.log("storage status" , check);
          if (check === 'false') {
            navigation.navigate('Account');
          }
        } catch (error) {
          console.log(error);
        }
  
      };
  
      useEffect(() => {
        getloginstatus();
      }, []);
    

    const handleLogout = () => {
        // Sign out the user from Firebase
        AsyncStorage.setItem('isLoggedIn', 'false');
        navigation.navigate('Account');
      };
    
    return(

        <ScrollView
            contentContainerStyle={{flexGrow: 1, justifyContent: "center" }}
            showsVerticalScrollIndicator={false}>

        <SafeAreaView style={styles.container}>

        <Image
            source={require('../assets/lclogo.png')} 
            style={styles.logo}/> 

        <TouchableOpacity onPress={handleLogout} style={styles.logoutB}>
            <MaterialCommunityIcons name="logout" size={30} style={styles.logB}/>
        </TouchableOpacity> 

        <Text style={styles.phrase}>Making Every Breath Count with Early Detection ... </Text>

        <Image
            source={require('../assets/bodynew.png')} 
            style={styles.body}/> 


        <View style={styles.selectButton}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Upload')}
            style={styles.selectB}>
            <Text style={styles.selectText}>Select an Image </Text>
            <FontAwesome name="arrow-circle-right" size={28} style={styles.arrow} />
        </TouchableOpacity>
        </View>

        <Text style={styles.topic}>LungCare </Text>

        <View style={styles.info}>
            <Text style={styles.text}><Feather name="check" color="#228b22" marginRight={20} size={16}/>  Cancer detection</Text>
            <Text style={styles.text}><Feather name="check" color="#228b22" marginRight={20} size={16}/>  Accuracy</Text>
            <Text style={styles.text}><Feather name="check" color="#228b22" marginRight={20} size={16}/>  Report</Text>
        </View>

        </SafeAreaView>
        </ScrollView>
    );
}

//styling 

const styles = StyleSheet.create({
    
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#Eae0c8', 
    }, 
    
    logo: { 
        position: 'absolute',
        width: 80, 
        height: 80,
        top: 40, 
        left: 25,
    }, 
    
    logoutB: { 
        position: 'absolute', 
        top: 30, 
        right: 25,
        padding: 20,
    }, 
    
    logB: { 
        color: 'black',
        transform: [{ rotate: '180deg' }], 
    }, 

    phrase:{
        marginTop:-100,
        paddingLeft: 20,
        paddingBottom: 22,
        fontSize: 26,
        fontWeight:"bold",
        fontFamily: "serif",
        color: "#ce5f84",
        textAlign: "center"
    },
    
    body: { 
        width: 250, 
        height: 240, 
        marginLeft: -40,
        resizeMode: 'contain', 
    }, 

    selectButton: {
        alignItems: 'right', 
        justifyContent: 'right'
        
    },

    selectB: { 
        width:"50%",
        position: 'absolute',
        flexDirection: "row",
        paddingHorizontal: 18,
        paddingVertical: 14, 
        borderRadius: 28,   
        backgroundColor: '#3bbf50',
        marginLeft: -20,
    },

    arrow: {
        marginLeft: -50,
        color: "white",
    },

    selectText: {
        flex:1,
        fontSize: 15,
        fontFamily: "serif",
        color: "white",
        fontWeight: "700",
    },

    topic:{
        position: "absolute",
        bottom:130,
        left:60,
        fontSize: 20,
        fontWeight: "700",
        color: "#000080"
    },

    info:{
        position: "absolute",
        bottom:50,
        right:80,
    },

    text:{
        fontSize: 16,
        fontWeight: "500",
        marginTop: 5,
    }
});


export default Home;
