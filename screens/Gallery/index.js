import React,  {useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import GridImageView from 'react-native-grid-image-viewer';

const Gallery = ({ navigation }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
      async function fetchAssets() {
        const album = await MediaLibrary.getAlbumAsync("Shake&Take")
        const albumData = await MediaLibrary.getAssetsAsync({album: album});
        setFiles(albumData.assets);
      }
      fetchAssets();
  }, []);

  return (
    <View style={styles.galleryView}>
      <GridImageView
        data={
          Object.values(files.map(file => file.uri))
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  galleryView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#101010'
  },
})

export default Gallery