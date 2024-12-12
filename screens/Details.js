import axios from "axios";
import {useNavigation} from '@react-navigation/native';
import React, { useState,useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    FlatList,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Button
    } from 'react-native';

    function Details() {
      const navigation = useNavigation();
      
      const carcinomaTypes = [
        { id: 1, name: 'Adenocarcinoma' },
        { id: 2, name: 'Squamous Cell Carcinoma (SCC)' },
        { id: 3, name: 'Large Cell Carcinoma' },
      ];


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

      return(

          <SafeAreaView style={styles.container}>

          <ScrollView
              contentContainerStyle={{flexGrow: 1, justifyContent: "center" }}
              showsVerticalScrollIndicator={false}>
  
          <Text style={styles.main}>Types of Lung Cancer </Text>
          <Text style={styles.topicn}>Non-Small Cell Lung Cancer (NSCLC) </Text>
          <Text style={styles.para}>This is the most common type of lung cancer, accounting for approximately 85% of all lung cancer cases. </Text>
          <Text style={styles.para}>There are three main subtypes of NSCLC, </Text>

          <View>
            <FlatList
              data={carcinomaTypes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
              <Text style={styles.list}><FontAwesome name="dot-circle-o" color="#10003f" marginRight={18} size={14}/>  {item.name}</Text>
              )}/>
          </View>

          <Text style={styles.topics}>Small Cell Lung Cancer (SCLC) </Text>
          <Text style={styles.para}>It is a type of lung cancer that is characterized by the rapid growth and spread more quickly than (NSCLC) and is often diagnosed at an advanced stage which has a high link with smoking. </Text>

          
          </ScrollView>
          </SafeAreaView>

  );
}

// stlying

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#Eae0c8',
        alignItems: 'center',
        justifyContent: 'center',
    },

    main:{
        marginTop:-80,
        paddingBottom: 30,
        fontSize: 22,
        fontWeight:"bold",
        fontFamily: "serif",
        color: "#005d94",
        textAlign: "center"
    },

    topicn:{
      paddingBottom: 16,
      marginLeft: 30,
      fontSize: 17,
      fontWeight: "600",
      color: "#797979"
    },

    topics:{
      marginTop: 25,
      paddingBottom: 16,
      marginLeft: 30,
      fontSize: 17,
      fontWeight: "600",
      color: "#797979"
    },

    list:{
      fontSize: 14,
      fontWeight: "500",
      marginLeft: 60,
      paddingRight: 25,
      paddingBottom: 14,
    },

    para:{
      fontSize: 14,
      fontWeight: "500",
      marginLeft: 30,
      paddingRight: 30,
      paddingBottom: 14,
    },
});

export default Details;
