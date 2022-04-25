import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

const Preview = ({ photo, handlePreview, handleSave }) => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your Shaking Photo!</Text>
            <Image source={{uri: photo}} style={{width: 300, height: 400, zIndex: 2}}/>

            <View style={styles.btnContainer}>
              <TouchableOpacity onPress={handlePreview} style={styles.btn}>
                <Text style={{color: '#666666'}}>Discard</Text>
              </TouchableOpacity>
                <View style={styles.separator}/>
              <TouchableOpacity onPress={handleSave} style={styles.btn}>
                <Text style={{color: '#2770FE'}}>Keep</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

Preview.propTypes = {
  photo: PropTypes.string,
  handlePreview: PropTypes.func,
  handleSave: PropTypes.func
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0, 0.75)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    paddingTop: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 20
  },
  btnContainer:{
    width: '100%',
    flexDirection: 'row',
    marginTop: 24
  },
  separator: {
    backgroundColor: '#C4C4C4',
    width: 1,
    height: '100%',
  },
  btn: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderColor: '#C4C4C4',
    backgroundColor: 'transparent',
  }
});

export default Preview;