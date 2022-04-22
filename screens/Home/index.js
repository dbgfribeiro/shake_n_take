import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image, ImageBackground} from 'react-native';
import { Camera } from 'expo-camera';

const frame = require("../../assets/frame.png")

const Home = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
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
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
   <View style={styles.homeView}>
      <ImageBackground source={frame} resizeMode="cover" style={styles.frame}>
        <View style={styles.cameraContainer}>
          <Camera 
            ref={ref => setCamera(ref)}
            style={styles.camera} 
            type={type}
            ratio={'3:4'} />
        </View>

        <View style={styles.bottomBar}>
          <Button
            title="Flip Image"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
                );
              }}>
            </Button>
          <Button title="Take Picture" onPress={() => takePicture()} />
        </View>
       </ImageBackground>
      {/* {image && <Image source={{uri: image}} style={{flex:1}}/>} */}
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

  frame: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  camera:{
    width: 340,
    height: 440
  },

  bottomBar: {
    backgroundColor: 'rgba(0,0,0, 0.8)',
    height: 150
  }
})