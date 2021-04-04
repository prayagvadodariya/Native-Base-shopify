import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, Modal, FlatList, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../component/Button';

const model = () => {

const navigation = useNavigation(); 
const [modalVisible, setModalVisible] = useState(false);

    return (
      <View>
          <View style={styles.logo}>
          <Image resizeMode="contain" style={styles.logopossition} source={require('../images/logo.webp')}/> 
          </View>

          <View>
              <Text style={styles.title}>LOGIN</Text>
              <Image resizeMode="contain" style={styles.img} source={require('../images/2.webp')}/> 
          </View>

          <View style={styles.inputView} >
            <TextInput
            style={styles.inputText}
            placeholder="Enter your email here" 
            //   value={this.state.email} onChange={this.email}
              // onChangeText={text => onChangeText(text)}
              // value={value1}
            />
            </View>
            <View style={styles.inputView} >
            <TextInput
            style={styles.inputText}
            placeholder="Enter your password here" 
            //   value={this.state.email} onChange={this.email}
              // onChangeText={text => onChangeText(text)}
              // value={value1}
            />
            </View>

            <Button>LOGIN</Button>

            <View>
              <TouchableOpacity><Text style={styles.forget} onPress={() => setModalVisible(true)}>FORGET PASSWORD ?</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.signup} onPress={ () => navigation.navigate('ProductDetailScreenStack', { screen: 'Signup' })}>DON'T HAVE AN ACCOUNT ? SIGN UP</Text></TouchableOpacity>
            </View>

            <View style={styles.centeredView}> 
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);}}> 

              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Hello World!</Text>
                  {/* <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable> */}
                </View>
              </View>
            </Modal>
            </View>
      </View>
  
    );
  
}


const styles = StyleSheet.create({
 centeredView: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   marginTop: 22
  },
 logo: {
   flex:1,
   justifyContent:"center"
 },
 logopossition: {
  width:"100%",
  height:130,
  marginTop:50,
 },
 title: {
  fontSize:45,
  fontFamily:"Roboto",
  color:"#1c4252",
  marginTop:18,
  // margin:15,
  textAlign:"center"
 },
 img: {
  width:"100%",
  height:20,
 },
 inputView: {
  flex:1,
  marginTop: 25,
  marginLeft:20,
  marginRight:20,
  backgroundColor:"white",
  borderRadius:30,
  height:50,
  marginBottom:20,
  borderColor:'#5e290e',
  borderWidth:1,
  justifyContent:"center",
  padding:20  
},
inputText:{
  height:50,
  color:"black"
},
forget: {
  textAlign:"center",
  color:'#5e290e',
  marginTop: 10,
  fontWeight: 'bold'
},
signup: {
  textAlign:'center',
  color:'#5e290e',
  marginTop: 20,
  marginBottom:10,
  fontWeight: 'bold',
},
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
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

export default model;