import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

const Preview = ({ photo, handlePreview }) => {
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
            <TouchableOpacity onPress={handlePreview}>
              <Text>Repeat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

Preview.propTypes = {
  photo: PropTypes.string,
  handlePreview: PropTypes.func
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
    borderRadius: 20,
    padding: 35,
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
    textAlign: "center"
  }
});

export default Preview;