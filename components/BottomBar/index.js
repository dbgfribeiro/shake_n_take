import React,  {useEffect, useState } from 'react';
import { StyleSheet ,Text, View, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const flash = require("../../assets/icons/flash.png")
const flip = require("../../assets/icons/flip.png")

const BottomBar = ({ shoot, flipCamera, gallery, galleryPreview, navigation }) => {

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.btnGallery} onPress={gallery}>
        <Image source={[galleryPreview]} style={styles.galleryPreview}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnCapture} onPress={shoot}>
        <View style={styles.btnCaptureOutline}/>
      </TouchableOpacity>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlsIcon}>
          <Image source={flash} style={{width: 32, height: 32}}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlsIcon}
          onPress={flipCamera}
        >
          <Image source={flip} style={{width: 32, height: 32}}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

BottomBar.propTypes = {
  shoot: PropTypes.func,
  flipCamera: PropTypes.func,
  gallery: PropTypes.func,
  galleryPreview: PropTypes.string,
};

const styles = StyleSheet.create({

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
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 8
  },

  galleryPreview: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
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

export default BottomBar