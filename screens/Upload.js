import axios from "axios";
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import Back from 'react-native-vector-icons/Ionicons';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';


const Upload = () => {

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const gallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    try {
      if (image) {
        setUploading(true);
        // upload image to server or cloud storage
        // after successful upload, setUploading(false)
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const deleteImage = () => {
    setImage(null);
  };

  return (
        <SafeAreaView style={styles.container}>

        <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}>
        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}

        <View style={styles.options}>

          <TouchableOpacity onPress={gallery}>
          <View style={styles.imgContainer}>
          <View style={styles.img}>
          <Feather name="image" size={28} style={styles.gallery}/>
          
          <Text style={styles.optionText}>Gallery</Text>
          </View>
          </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={takePhoto}>
          <View style={styles.cameraContainer}>
          <View style={styles.camera}>
            <Back name="camera" size={28} style={styles.cam} />
            <Text style={styles.optionText}>Camera</Text>
            </View>
            </View>
          </TouchableOpacity>


          {image && (
            <TouchableOpacity onPress={deleteImage}>
              <View style={styles.removeContainer}>
              <View style={styles.remove}>
              <Feather name="trash-2" size={28} style={styles.trash}/>
              
              <Text style={styles.optionText}>Remove</Text>
              </View>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.uploadButton}>
         <TouchableOpacity onPress={uploadImage} style={styles.uploadBut}>

            <View>
            <Text style={styles.uploadText}>
                {uploading ? 'Uploading...' : 'SUBMIT !'}
            </Text>
            </View>

        </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  
  container: {
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    backgroundColor: '#Eae0c8',
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },

  image: {
    borderRadius: 10,
    width: 300,
    height: 300,
    borderColor: 'white',
    borderWidth: 5,
  },

  imgContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
  }, 
  
  img: { 
    backgroundColor: 'white', 
    padding: 13, 
    borderRadius: 20, 
    borderWidth: 2,
    borderColor: "#808080",
    marginBottom: 5, 
    marginRight: 30,
  }, 

  gallery:{
    marginLeft: 10,
    marginBottom: 5,
  },
  
  cameraContainer: {
     alignItems: 'center', 
     justifyContent: 'center', 
    }, 
    
  camera: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'white', 
    padding: 14, 
    borderRadius: 60, 
    borderWidth: 2,
    borderColor: "#72bcd4",
  },
  
  removeContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
  }, 
  
  remove: { 
    backgroundColor: 'white', 
    padding: 12, 
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#808080",
    marginBottom: 5, 
    marginLeft: 30,
  },

  trash:{
    marginLeft: 15,
    marginBottom: 5,
  },
  
   options: {
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    
  },
  
   optionText: {
    fontSize: 16,
    textAlign: "center",
  
   
    
    fontWeight:"bold",
  },

  uploadButton: {
    alignItems: 'center',
    marginTop: 40,
    alignItems: 'center',
    textAlign: 'center',
  },

  uploadText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },

  uploadBut: {
    width: '80%',
    backgroundColor: '#235869',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 28,
  }
});

export default Upload;