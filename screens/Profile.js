import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, query, where, getDocs, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';



import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Button
} from 'react-native';


function Profile() {

  const navigation = useNavigation();
  const database = getFirestore();
  const [email, setemail] = useState();
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [gender, setGender] = useState('Male');
  const [mobile, setMobile] = useState();
  const [imageUrl, setImageUrl] = useState(null);

  fetchemail = async () => {

    try {
      const getemail = await AsyncStorage.getItem('email');
      if (getemail) {
        setemail(getemail);
      }
    } catch (error) {
      console.log(error);
    }

  };

  getloginstatus = async () => {

    try {
      const check = await AsyncStorage.getItem('isLoggedIn');
      if (check === 'false') {
        navigation.navigate('Account');
      }
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getloginstatus();
    fetchemail();
    getUserDetails();
  }, []);

  getUserDetails = async () => {

    try {
      const getemail = await AsyncStorage.getItem('email');
      const q = query(collection(database, "User"), where("email", "==", getemail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {

        const details = doc.data();
        AsyncStorage.setItem('userId', doc.id);

        console.log(doc.id);
        setUserId(doc.id);
        setUserName(details.userName);
        setMobile(details.mobile);
        setGender(details.gender);

        getImage = async () => {
          try {
            const storage = getStorage();
            const imageRef = ref(storage, `profile_images/${doc.id}`);
              const url = await getDownloadURL(imageRef);
              console.log(url);
        
              setImageUrl(url);
          } catch (error) {
            console.log(error);
          }
        };

        getImage();
      });
    } catch (error) {
      console.log(error);
    }

  };

  

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <TouchableOpacity>
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
        )}
        {!imageUrl && <Text>No Profile Image</Text>}
      </TouchableOpacity>
    

      


      <View style={styles.info}>
        <Text style={styles.infoQuestion}>Username : {userName} </Text>
        <Text style={styles.infoAnswer}> </Text>
      </View>


      <View style={styles.info}>
        <Text style={styles.infoQuestion}>Email : {email} </Text>
        <Text style={styles.infoAnswer}> </Text>
      </View>

  
      <View style={styles.info}>
        <Text style={styles.infoQuestion}>Mobile No : {mobile} </Text>
        <Text style={styles.infoAnswer}> </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoQuestion}>Gender : {gender} </Text>
        <Text style={styles.infoAnswer}> </Text>
      </View>


      <View style={styles.updateButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateProfile')}
          style={styles.upBut}>
          <Text style={styles.updateText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      </View>

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

  avatar: {
    borderRadius: 80,
    backgroundColor: '#808080',
    height: 160,
    width: 160,
    padding: 8,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 40,
  },

  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 70,
    marginBottom: 40,
  },

  info: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },

  infoQuestion: {
    color: '#7d7c7c',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 80,
    textAlign: "left",
  },

  infoAnswer: {
    color: 'black',
    fontStyle: 'normal',
    fontSize: 16,
    paddingRight: 50,
    textAlign: 'right',
    flex: 1,
  },

  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    paddingLeft: 10,
  },

  radioText: {
    color: 'black',
    fontSize: 16,
  },

  updateButton: {
    alignItems: 'center',
    marginTop: 70,
    alignItems: 'center',
    textAlign: 'center',
  },

  updateText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },

  upBut: {
    width: '70%',
    backgroundColor: '#235869',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 28,
  }
});

export default Profile;
