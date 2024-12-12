// import axios from "axios";
// import React, { useState, useEffect } from 'react';
// import { Avatar } from 'react-native-paper';
// import { RadioButton } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-toast-message';
// import Back from 'react-native-vector-icons/Ionicons';
// import * as ImagePicker from 'expo-image-picker';
// import { useNavigation } from '@react-navigation/native';
// import { doc, setDoc, getFirestore } from "firebase/firestore";

// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   Image,
//   Button
// } from 'react-native';

// const UpdateProfile = () => {

//   const navigation = useNavigation();
//   const [image, setImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [email, setemail] = useState();
//   const [userName, setUserName] = useState();
//   const [gender, setGender] = useState('Male');
//   const [mobile, setMobile] = useState();
//   const database = getFirestore();

//   fetchemail = async () => {

//     try {
//       const getemail = await AsyncStorage.getItem('email');
//       if (getemail) {
//         setemail(getemail);
//       }
//     } catch (error) {
//       console.log(error);
//     }

//   };


//   updateUser = async () => {

//     try {
//       const getId = await AsyncStorage.getItem('userId');
//       await setDoc(doc(database, "User", getId), {
//         email: email,
//         userName: userName,
//         gender: gender,
//         mobileNo: mobile
//       });

//       navigation.navigate('Profile');

//     } catch (error) {
//       console.log(error);
//     }

//   };

//   useEffect(() => {
//     fetchemail();
//   }, []);

//   const progallery = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri)
//     }
//   };

//   const procam = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri)
//     }
//   };


//   return (

//     <ScrollView
//       contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
//       showsVerticalScrollIndicator={false}>

//       <View style={styles.container}>

//         <View style={styles.camera}>

//           <TouchableOpacity onPress={procam}>
//             <View style={styles.camIcon}>
//               <Back name="camera" size={25} style={styles.cam} />
//             </View>


//             <TouchableOpacity onPress={progallery}>
//               <Avatar.Image
//                 size={140}
//                 style={styles.avatar}
//                 source={require('../assets/profile.png')} />
//             </TouchableOpacity>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.info}>
//           <Text style={styles.infoQuestion}>Username : </Text>
//           <TextInput placeholder="Your Name" placeholderTextColor={'#999797'} style={styles.infoAnswer}
//             onChangeText={text => setUserName(text)}
//           />
//         </View>

//         <View style={styles.info}>
//           <Text style={styles.infoQuestion} flex={1}>Gender:</Text>

//           {/* Male Radio Button */}
//           <View style={styles.radio}>
//             <Text style={styles.radioText}>Male</Text>
//             <RadioButton
//               value="Male"
//               status={gender === 'Male' ? 'checked' : 'unchecked'}
//               onPress={() => setGender('Male')} // Update gender state to 'Male' when pressed
//             />
//           </View>

//           {/* Female Radio Button */}
//           <View style={styles.radio} paddingRight={40}>
//             <Text style={styles.radioText}>Female</Text>
//             <RadioButton
//               value="Female"
//               status={gender === 'Female' ? 'checked' : 'unchecked'}
//               onPress={() => setGender('Female')} // Update gender state to 'Female' when pressed
//             />
//           </View>
//         </View>



//         <View style={styles.info}>
//           <Text style={styles.infoQuestion}>Mobile No : </Text>
//           <TextInput placeholder="Your Mobile No" placeholderTextColor={'#999797'} keyboardType="numeric" maxLength={10} style={styles.infoAnswer} 
//           onChangeText={text => setMobile(text)}/>
//         </View>

//         <View style={styles.updateButton}>
//           <TouchableOpacity onPress={() => updateUser()} style={styles.upBut}>
//             <View>
//               <Text style={styles.updateText}>Update Profile</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//       </View>
//     </ScrollView>
//   );
// }
import React, { useState, useEffect } from 'react';
import { RadioButton, Avatar, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadFile, getDownloadURL, uploadBytes } from 'firebase/storage';

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
  Image
} from 'react-native';


const UpdateProfile = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('Male');
  const [mobile, setMobile] = useState('');
  const database = getFirestore();
  const storage = getStorage();



  useEffect(() => {
    fetchEmail();
  }, []);

  const fetchEmail = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    } catch (error) {
      console.error('Error fetching email:', error);
    }
  };

  const updateUser = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      await setDoc(doc(database, 'User', userId), {
        email,
        userName,
        gender,
        mobile
      });
  
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const imageRef = ref(storage, `profile_images/${userId}`);
        await uploadBytes(imageRef, blob);
      }
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
     showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Avatar.Image
            size={140}
            style={styles.avatar}
            source={require('../assets/profile.png')}
          />
        )}
      </TouchableOpacity>

      <View style={styles.info}>
          <Text style={styles.infoQuestion}>Username : </Text>
          <TextInput placeholder="Your Name" placeholderTextColor={'#999797'} style={styles.infoAnswer}
            onChangeText={text => setUserName(text)}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.infoQuestion} flex={1}>Gender:</Text>

          <View style={styles.radio}>
            <Text style={styles.radioText}>Male</Text>
            <RadioButton
              value="Male"
              status={gender === 'Male' ? 'checked' : 'unchecked'}
              onPress={() => setGender('Male')} 
            />
          </View>

          <View style={styles.radio} paddingRight={40}>
            <Text style={styles.radioText}>Female</Text>
            <RadioButton
              value="Female"
              status={gender === 'Female' ? 'checked' : 'unchecked'}
              onPress={() => setGender('Female')} 
            />
          </View>
        </View>



        <View style={styles.info}>
          <Text style={styles.infoQuestion}>Mobile No : </Text>
          <TextInput placeholder="Your Mobile No" placeholderTextColor={'#999797'} keyboardType="numeric" maxLength={10} style={styles.infoAnswer} 
          onChangeText={text => setMobile(text)}/>
        </View>

        <View style={styles.updateButton}>
          <TouchableOpacity onPress={() => updateUser()} style={styles.upBut}>
            <View>
              <Text style={styles.updateText}>Update Profile</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

export default UpdateProfile;

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
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
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
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 50,
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
