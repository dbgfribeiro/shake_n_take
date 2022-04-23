import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image, TouchableOpacity, Platform} from 'react-native';
import { Camera } from 'expo-camera';

import Preview from '../../components/Preview';

const logo = require("../../assets/logo.png")
const noConnection = require("../../assets/icons/bi_phone_failed.png")
const flash = require("../../assets/icons/flash.png")
const flip = require("../../assets/icons/flip.png")

const Home = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);
  
  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null)
        setImage(data.uri);
        setImagePreview(!imagePreview);
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
  <View style={styles.homeView}>
    <View style={styles.topBar}>
      <Image source={noConnection} style={{width: 20, height: 20}}/>
      <Image source={logo} style={styles.logo}/>
    </View>

    <View style={styles.cameraContainer}>
      <Camera 
        ref={ref => setCamera(ref)}
        style={styles.camera} 
        type={type}
        ratio={'3:4'} />
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.btnGallery}/>
        <TouchableOpacity style={styles.btnCapture} onPress={() => takePicture()}>
          <View style={styles.btnCaptureOutline}/>
        </TouchableOpacity>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlsIcon}>
              <Image source={flash} style={{width: 32, height: 32}}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlsIcon}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
                  );
                }}>
              <Image source={flip} style={{width: 32, height: 32}}/>
            </TouchableOpacity>
          </View>
      </View>
      {image && imagePreview && <Preview photo={image} handlePreview={() => {setImagePreview(!imagePreview)}}/>}
     </View>
  );
}

export default Home;

const styles = StyleSheet.create({

  homeView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  },

  topBar: {
    paddingTop: 70,
    paddingBottom: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#101010',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.75,
    shadowRadius: 10,
    elevation: 20,
  },

  logo: {
    width: 68.55,
    height: 48,
    position: 'absolute',
    left: '46%',
    top: 56,
  },

  cameraContainer: {
    flex: 1,
    //justifyContent: 'center',
    paddingTop: 20,
    alignItems: 'center',
  },

  camera:{
    width: 380,
    height: 480
  },

  bottomBar: {
    paddingTop: 20,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    backgroundColor: '#101010',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.75,
    shadowRadius: 10,
    elevation: 20,
  },

  btnGallery: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 8
  },

  btnCapture: {
    alignItems: "center",
    backgroundColor: "#ebebeb",
    width: 69,
    height: 69,
    borderRadius: 99999,
    marginLeft: 24,
    padding: 2
  },

  btnCaptureOutline:{
    backgroundColor: '#ebebeb',
    width: '100%',
    height: '100%',
    flex: 1,
    borderWidth: 2,
    borderColor: '#101010',
    borderRadius: 99999,
  },

  controls: {
    flexDirection: 'row',
  },

  controlsIcon: {
    marginHorizontal: 4
  }
})