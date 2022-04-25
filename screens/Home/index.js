import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';

import BottomBar from '../../components/BottomBar';
import Preview from '../../components/Preview';

const logo = require("../../assets/logo.png")
const noConnection = require("../../assets/icons/bi_phone_failed.png")

const Home = ({ navigation }) => {
  const [lastImg, setLastImg] = useState("");

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    });
    handleLastImg();
  }, []);
  
  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null)
        setImage(data.uri);
        setImagePreview(!imagePreview);
    }
  }

  const savePicture = async(photo) => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      const cachedAsset = await MediaLibrary.createAssetAsync(photo);
      
      const albumName = 'Shake&Take';
      const album = await MediaLibrary.getAlbumAsync(albumName)
      
      if(album){
        await MediaLibrary.addAssetsToAlbumAsync([cachedAsset], album, false);
      }else{
        const asset = await MediaLibrary.createAssetAsync(photo);
        await MediaLibrary.createAlbumAsync(albumName, asset);
      }
    }
    handleLastImg();
    setImagePreview(!imagePreview);
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleLastImg = async() => {
    const album = await MediaLibrary.getAlbumAsync("Shake&Take")
    const albumData = await MediaLibrary.getAssetsAsync({album: album});
    setLastImg(albumData.assets[0].uri);
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

      <BottomBar
        navigation={navigation}
        gallery={() =>
          navigation.navigate('Gallery')
        }
        galleryPreview={lastImg}
        shoot={() => takePicture()}
        flipCamera={() => {
          setType(
            type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
            );
          }
        }
      />

      {image && imagePreview &&
        <Preview
          photo={image}
          handlePreview={() => {setImagePreview(!imagePreview)}}
          handleSave={() => savePicture(image)}
        />
      }
     </View>
  );
}

export default Home;

const styles = StyleSheet.create({

  homeView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#101010'
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
    paddingTop: 20,
    alignItems: 'center',
  },

  camera:{
    width: 380,
    height: 480
  },
})